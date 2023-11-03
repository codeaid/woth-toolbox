import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslator } from 'hooks';
import { floorNearestFloor10, formatNumber, getMapScaleStep } from 'lib/utils';
import type { HuntingMapScaleProps } from './types';
import styles from './HuntingMapScale.module.css';

export const HuntingMapScale = (props: HuntingMapScaleProps) => {
  const {
    defaultWidth = 250,
    imageScale,
    imageWidth,
    mapStep10m = 10,
    mapStep100m = 100,
    mapStep1000m = 500,
    mapStep10000m = 1000,
    mapWidth,
  } = props;

  // Retrieve application locale and translator
  const locale = useLocale();
  const translate = useTranslator();

  // Current scale bar width
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(defaultWidth);

  // Determine if bar should be split into three sections
  const threeSections = useMemo(
    () => ((value / floorNearestFloor10(value)) * 10) % 3 === 0,
    [value],
  );

  useEffect(() => {
    // Calculate pixel ratio (how many map pixels each map pixel represents
    // at the current zoom)
    const pixelRatio = imageWidth / mapWidth;

    // Calculate size of each screen pixel in meters at current zoom
    const pixelMeters = imageScale * pixelRatio;

    // Calculate how many meters the scale bar at its default width represents.
    // If map scale is 1:1, the world is 10000m wide and map image width is
    // 1000 pixels then each pixel will represent 10 meters. If bar is 150
    // pixels wide then it will represent 1500 meters.
    const defaultWidthMeters = defaultWidth * pixelMeters;

    // Calculate maximum distance that the scale bar can be increased or
    // decreased by in either direction.
    const mapStep = getMapScaleStep(
      defaultWidthMeters,
      mapStep10000m,
      mapStep1000m,
      mapStep100m,
      mapStep10m,
    );

    // Calculate by how much the distance that the scale bar at its default
    // width represents is over or under the value that it will be displaying.
    // E.g. at mapStep of 500 and defaultWidthMeters of 1356 the amount is 356.
    // At defaultWidthMeters of 1640 the overflown amount is 140.
    const overflow = defaultWidthMeters % mapStep;

    // Determine if the scale bar should be increased in size or decreased
    const maxOverflow = mapStep / 2;
    const barIncrease = overflow > 0 && overflow > maxOverflow;
    const barDecrease = overflow > 0 && overflow < maxOverflow;

    if (barIncrease) {
      // Calculate what percentage the bar should be increased by
      const barIncreaseBy = mapStep - overflow;
      const barIncreaseByRatio = 1 + barIncreaseBy / defaultWidthMeters;

      // Calculate value to show in the bar and its next width
      const nextValue = Math.ceil(defaultWidthMeters / mapStep) * mapStep;
      const nextWidth = defaultWidth * barIncreaseByRatio;

      setValue(nextValue);
      setWidth(nextWidth);
    } else if (barDecrease) {
      // Calculate what percentage the bar should be reduced by
      const barDecreaseByRatio = 1 - overflow / defaultWidthMeters;

      // Calculate value to show in the bar and its next width
      const nextValue = Math.floor(defaultWidthMeters / mapStep) * mapStep;
      const nextWidth = defaultWidth * barDecreaseByRatio;

      setValue(nextValue);
      setWidth(nextWidth);
    } else {
      // Only update the value as, width of the bar does not need to be changed
      setValue(defaultWidthMeters);
    }
  }, [
    defaultWidth,
    imageWidth,
    mapStep10000m,
    mapStep1000m,
    mapStep100m,
    mapStep10m,
    mapWidth,
    imageScale,
  ]);

  return (
    <div
      className={styles.HuntingMapScale}
      style={{
        width: `${width}px`,
      }}
    >
      <div
        className={clsx(styles.HuntingMapScaleBars, {
          [styles.HuntingMapScaleBarsTriple]: threeSections,
          [styles.HuntingMapScaleBarsQuad]: !threeSections,
        })}
      ></div>
      <div className={styles.HuntingMapScaleText}>
        {formatNumber(value, locale)}
        {translate('UNITS:METRIC_METERS')}
      </div>
    </div>
  );
};
