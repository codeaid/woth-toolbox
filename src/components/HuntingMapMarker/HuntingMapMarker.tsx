import classnames from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import { Icon } from 'components/Icon';
import { useRefCallback } from 'hooks';
import { getMarkerSize, isMarkerVisibleAtScale } from 'lib/markers';
import { HuntingMapMarkerProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarker = forwardRef(
  (props: HuntingMapMarkerProps, ref: ForwardedRef<HTMLImageElement>) => {
    const {
      className,
      highlighted,
      mapScale,
      marker,
      markerRangeMap,
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
    const markerVisibleAtScale = useMemo(
      () => isMarkerVisibleAtScale(mapScale, marker.type, markerRangeMap),
      [mapScale, marker.type, markerRangeMap],
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
      (event: MouseEvent<EventTarget>) => onClick && onClick(marker, event),
      [marker, onClick],
    );

    return (
      <Transition
        in={visible && markerVisibleAtScale}
        mountOnEnter={true}
        nodeRef={markerRef}
        timeout={100}
        unmountOnExit={true}
      >
        {state => (
          <Icon
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

HuntingMapMarker.displayName = 'HuntingMapMarkerGeneric';
