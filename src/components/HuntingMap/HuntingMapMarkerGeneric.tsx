import classnames from 'classnames';
import { ForwardedRef, forwardRef, useCallback, useMemo, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Marker } from 'components/Marker';
import { useRefCallback } from 'hooks';
import { getMarkerSize, isMarkerVisibleAtScale } from 'lib/markers';
import { HuntingMapMarkerGenericProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarkerGeneric = forwardRef(
  (
    props: HuntingMapMarkerGenericProps,
    ref: ForwardedRef<HTMLImageElement>,
  ) => {
    const {
      className,
      highlighted,
      mapScale,
      marker,
      markerFilter = [],
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

    // Determine if marker is visible
    const markerVisible = useMemo(
      () =>
        visible &&
        (!markerFilter.length || markerFilter.includes(marker.type)) &&
        isMarkerVisibleAtScale(mapScale, marker.type, markerVisibilityMap),
      [mapScale, marker.type, markerFilter, markerVisibilityMap, visible],
    );

    // Container reference wrapping around outer an inner refs
    const [, setInnerRef] = useRefCallback<HTMLImageElement>(markerRef, ref);

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
        in={markerVisible}
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
            highlighted={highlighted}
            ref={setInnerRef}
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
  },
);

HuntingMapMarkerGeneric.displayName = 'HuntingMapMarkerGeneric';
