import classnames from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';
import { getIconComponent } from 'lib/icons';
import { getMarkerOffset } from 'lib/markers';
import { MapMarkerRef, MapOptions } from 'types/cartography';
import { HuntingMapMarkerProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarker = forwardRef(
  (props: HuntingMapMarkerProps, ref: ForwardedRef<MapMarkerRef>) => {
    const {
      className,
      forceVisible = false,
      highlighted,
      marker,
      mountOnEnter = false,
      size = 35,
      style,
      title,
      unmountOnExit = false,
      onClick,
      onLongPress,
    } = props;

    // Reference to marker's icon
    const iconRef = useRef<HTMLDivElement>(null);

    // Visibility flag states
    const [hidden, setHidden] = useState(false);
    const [visible, setVisible] = useState(false);

    // Icon component to use for the current filter entry
    const IconComponent = useMemo(
      () => getIconComponent(marker.type),
      [marker.type],
    );

    // Generate marker's coordinate title in development mode
    const tooltip = useMemo(() => {
      // Disable marker titles in production mode
      if (process.env.NODE_ENV !== 'development') {
        return title;
      }

      const [x, y] = marker.coords;
      return title ? `${title} (${x} ... ${y})` : `${x} ... ${y}`;
    }, [marker.coords, title]);

    /**
     * Handle clicking on the marker
     *
     * @param event Mouse event object
     */
    const handleClick = useCallback(
      (event: MouseEvent<EventTarget>) => onClick && onClick(marker, event),
      [marker, onClick],
    );

    /**
     * Handle updating markers position in relation to its container
     *
     * @param mapOptions Source map options
     */
    const handleUpdatePosition = useCallback(
      (mapOptions: MapOptions) => {
        // Ensure reference to the icon is available
        if (!iconRef.current) {
          return;
        }

        // Calculate marker position offsets
        const [offsetX, offsetY] = getMarkerOffset(marker, mapOptions, size);

        // Update marker's position
        iconRef.current.style.left = `${offsetX}px`;
        iconRef.current.style.top = `${offsetY}px`;
      },
      [marker, size],
    );

    // Expose internal controller functions allowing to change marker's
    // visibility and position
    useImperativeHandle<MapMarkerRef, MapMarkerRef>(
      ref,
      () => ({
        markerElement: iconRef.current,
        setHidden,
        setVisible,
        updatePosition: handleUpdatePosition,
      }),
      [handleUpdatePosition],
    );

    return (
      <Transition
        in={forceVisible || visible}
        mountOnEnter={mountOnEnter}
        nodeRef={iconRef}
        timeout={75}
        unmountOnExit={unmountOnExit}
      >
        {state => (
          <IconComponent
            className={classnames(
              styles.HuntingMapMarker,
              {
                [styles.HuntingMapMarkerStateEntering]: state === 'entering',
                [styles.HuntingMapMarkerStateEntered]: state === 'entered',
                [styles.HuntingMapMarkerStateExiting]: state === 'exiting',
                [styles.HuntingMapMarkerStateExited]: state === 'exited',
                [styles.HuntingMapMarkerHidden]: hidden,
              },
              className,
            )}
            highlighted={highlighted}
            ref={iconRef}
            size={size}
            style={style}
            title={tooltip}
            onClick={handleClick}
            onLongPress={onLongPress}
          />
        )}
      </Transition>
    );
  },
);

HuntingMapMarker.displayName = 'HuntingMapMarker';
