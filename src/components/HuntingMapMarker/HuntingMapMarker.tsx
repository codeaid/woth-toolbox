import classnames from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';
import { getIconComponent } from 'lib/icons';
import { MarkerOptions, MarkerRef } from 'types/markers';
import { HuntingMapMarkerProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarker = forwardRef(
  <TMarkerOptions extends MarkerOptions>(
    props: HuntingMapMarkerProps<TMarkerOptions>,
    ref: ForwardedRef<MarkerRef>,
  ) => {
    const {
      className,
      forceVisible = false,
      highlighted,
      marker,
      markerSize = 35,
      mountOnEnter = true,
      style,
      title,
      unmountOnExit = true,
      onClick,
      onKeyDown,
      onLongPress,
    } = props;

    // Reference to marker's icon
    const iconRef = useRef<HTMLDivElement>(null);

    // Flag indicating whether the mouse cursor is currently over the marker
    const mouseOver = useRef(false);

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
     * Handle global key presses
     */
    const handleDocumentKeyDown = useCallback(
      (event: KeyboardEvent) => {
        // Ignore event if
        if (!mouseOver.current) {
          return;
        }

        onKeyDown && onKeyDown(marker, event);
      },
      [marker, onKeyDown],
    );

    /**
     * Handle mouse cursor entering the marker
     *
     * @param event Mouse event object
     */
    const handleMouseEnter = useCallback(() => (mouseOver.current = true), []);

    /**
     * Handle mouse cursor entering the marker
     *
     * @param event Mouse event object
     */
    const handleMouseLeave = useCallback(() => (mouseOver.current = false), []);

    /**
     * Handle updating markers position in relation to its container
     *
     * @param mapOptions Source map options
     */
    const handleUpdatePosition = useCallback(() => {
      // Ensure reference to the icon is available
      if (!iconRef.current) {
        return;
      }

      // Extract marker's position offsets
      const [ratioX, ratioY] = marker.coords;

      // Update marker's position
      iconRef.current.style.left = `${ratioX * 100}%`;
      iconRef.current.style.top = `${ratioY * 100}%`;
    }, [marker]);

    // Expose internal controller functions allowing to change marker's
    // visibility and position
    useImperativeHandle<MarkerRef, MarkerRef>(
      ref,
      () => ({
        markerElement: iconRef.current,
        setHidden,
        setVisible,
      }),
      [],
    );

    // Reposition marker on changes to the options (fixes debug zones having invalid positions)
    useEffect(() => {
      handleUpdatePosition();
    }, [handleUpdatePosition, marker]);

    // Listen to document key presses
    useEffect(() => {
      // Ensure a listener is specified before proceeding
      if (!onKeyDown) {
        return;
      }

      document.addEventListener('keydown', handleDocumentKeyDown);
      return () =>
        document.removeEventListener('keydown', handleDocumentKeyDown);
    }, [handleDocumentKeyDown, marker, onKeyDown]);

    return (
      <Transition
        in={forceVisible || visible}
        mountOnEnter={mountOnEnter}
        nodeRef={iconRef}
        timeout={75}
        unmountOnExit={unmountOnExit}
        onEntering={handleUpdatePosition}
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
            size={markerSize}
            style={style}
            title={tooltip}
            onClick={handleClick}
            onLongPress={onLongPress}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </Transition>
    );
  },
) as <TMarkerOptions extends MarkerOptions>(
  props: HuntingMapMarkerProps<TMarkerOptions> & { ref?: Ref<MarkerRef> },
) => ReactElement;

// @ts-ignore
HuntingMapMarker.displayName = 'HuntingMapMarker';
