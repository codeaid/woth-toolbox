import classnames from 'classnames';
import { useMemo } from 'react';
import { Marker } from 'components/Marker';
import { getMarkerSize, isMarkerVisibleAtScale } from 'lib/markers';
import { HuntingMapMarkerGenericProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarkerGeneric = (
  props: HuntingMapMarkerGenericProps,
) => {
  const {
    mapScale,
    marker,
    markerVisibilityMap = new Map(),
    maxMarkerSize,
  } = props;

  // Extract marker details
  const { coords, type } = marker;
  const [left, top] = coords;

  // Generate marker's class name
  const className = useMemo(() => {
    // Determine if marker is visible
    const visible = isMarkerVisibleAtScale(
      mapScale,
      marker.type,
      markerVisibilityMap,
    );

    return classnames(styles.HuntingMapMarker, {
      [styles.HuntingMapMarkerInvisible]: !visible,
    });
  }, [mapScale, marker, markerVisibilityMap]);

  // Calculate marker size at the current map scale
  const size = useMemo(
    () => getMarkerSize(mapScale, maxMarkerSize),
    [maxMarkerSize, mapScale],
  );

  return (
    <Marker
      className={className}
      size={size}
      style={{
        left: `calc(${left * 100}% - ${size / 2}px)`,
        top: `calc(${top * 100}% - ${size / 2}px)`,
      }}
      title={`${left} ... ${top}`}
      type={type}
    />
  );
};
