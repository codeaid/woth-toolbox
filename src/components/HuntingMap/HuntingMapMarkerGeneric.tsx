import classnames from 'classnames';
import { useCallback, useMemo, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Marker } from 'components/Marker';
import { getMarkerSize, isMarkerVisibleAtScale } from 'lib/markers';
import { HuntingMapMarkerGenericProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarkerGeneric = (
  props: HuntingMapMarkerGenericProps,
) => {
  const {
    className,
    mapScale,
    marker,
    markerVisibilityMap,
    maxMarkerSize,
    visible = true,
    onClick,
  } = props;

  // Extract marker details
  const { coords, type } = marker;
  const [left, top] = coords;

  // Reference to marker's image element
  const markerRef = useRef<HTMLImageElement>(null);

  // Check if the marker is visible at the current scale
  const visibleAtScale = useMemo(
    () => isMarkerVisibleAtScale(mapScale, marker.type, markerVisibilityMap),
    [mapScale, marker, markerVisibilityMap],
  );

  // Calculate marker size at the current map scale
  const size = useMemo(
    () => getMarkerSize(mapScale, maxMarkerSize),
    [maxMarkerSize, mapScale],
  );

  /**
   * Handle clicking on the marker
   */
  const handleClick = useCallback(
    () => onClick && onClick(marker),
    [marker, onClick],
  );

  return (
    <Transition
      in={visible && visibleAtScale}
      mountOnEnter={true}
      nodeRef={markerRef}
      timeout={150}
      unmountOnExit={true}
    >
      {state => (
        <Marker
          className={classnames(
            styles.HuntingMapMarker,
            {
              [styles.HuntingMapMarkerStateEntering]: state === 'entering',
              [styles.HuntingMapMarkerStateEntered]: state === 'entered',
              [styles.HuntingMapMarkerStateExiting]: state === 'exiting',
              [styles.HuntingMapMarkerStateExited]: state === 'exited',
            },
            className,
          )}
          ref={markerRef}
          size={size}
          style={{
            left: `calc(${left * 100}% - ${size / 2}px)`,
            top: `calc(${top * 100}% - ${size / 2}px)`,
          }}
          type={type}
          onClick={handleClick}
        />
      )}
    </Transition>
  );
};
