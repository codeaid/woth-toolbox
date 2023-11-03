import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import type { ForwardedRef } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { getCoordinateRatio } from 'lib/markers';
import type { Point } from 'types/generic';
import type { HuntingMapCoordsProps, HuntingMapCoordsRef } from './types';
import styles from './HuntingMapCoords.module.css';

export const HuntingMapCoords = forwardRef(
  (props: HuntingMapCoordsProps, ref: ForwardedRef<HuntingMapCoordsRef>) => {
    const { multiplier = 1000, placeholder = '-' } = props;

    // Current mouse ration in relation to the map element
    const [coords, setCoords] = useState<Point>([-1, -1]);

    // Format values to display
    const [valueX, valueY] = useMemo<[number | string, number | string]>(() => {
      const [x, y] = coords;

      // Ensure coordinates are within map's boundaries
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        return [placeholder, placeholder];
      }

      return getCoordinateRatio(coords, multiplier);
    }, [coords, multiplier, placeholder]);

    // Expose coordinate setter
    useImperativeHandle(ref, () => ({
      setCoords,
    }));

    // Only render coordinates on devices that have mouse support
    if (!matchMedia('(pointer:fine)').matches) {
      return null;
    }

    return (
      <div className={styles.HuntingMapCoords}>
        <MdOutlineMyLocation className={styles.HuntingMapCoordsIcon} />
        {`${valueX}, ${valueY}`}
      </div>
    );
  },
);

HuntingMapCoords.displayName = 'HuntingMapCoords';
