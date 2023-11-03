import clsx from 'clsx';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ForwardedRef, MouseEvent, ReactElement, Ref } from 'react';
import { Transition } from 'react-transition-group';
import { useRefCallback } from 'hooks';
import { getTransitionClassName } from 'lib/dom';
import { getIconComponent } from 'lib/icons';
import type { MarkerOptions, MarkerRef } from 'types/markers';
import type { HuntingMapMarkerProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarker = forwardRef(
  <TMarkerOptions extends MarkerOptions>(
    props: HuntingMapMarkerProps<TMarkerOptions>,
    ref: ForwardedRef<MarkerRef>,
  ) => {
    const {
      children,
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

    // Flag indicating whether the mouse cursor is currently over the marker
    const mouseOver = useRef(false);

    // Visibility flag states
    const [hidden, setHidden] = useState(false);
    const [visible, setVisible] = useState(false);

    // Create a shared reference to the marker icon component
    const nodeRef = useRef<HTMLDivElement>(null);
    const [markerRef, setMarkerRef] = useRefCallback(nodeRef);

    // Icon component to use for the current filter entry
    const IconComponent = useMemo(
      () => getIconComponent(marker.type),
      [marker.type],
    );

    // Generate marker's coordinate title in development mode
    const tooltip = useMemo(() => {
      // Enable debug marker titles in development mode
      if (process.env.NODE_ENV === 'development') {
        const entries = Object.entries(marker).filter(([key]) =>
          (
            ['coords', 'id', 'meta', 'type'] as Array<keyof MarkerOptions>
          ).includes(key as keyof MarkerOptions),
        );
        const json = JSON.stringify(Object.fromEntries(entries), undefined, 2);
        return title ? title + '\n' + json : json;
      }

      return title;
    }, [marker, title]);

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
     * Handle double-clicking on the marker
     *
     * @param event Mouse event object
     */
    const handleDoubleClick = useCallback(
      (event: MouseEvent<EventTarget>) => event.stopPropagation(),
      [],
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
        event.stopPropagation();
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
     * Handle long pressing on the marker icon
     */
    const handleLongPress = useCallback(
      () => onLongPress && onLongPress(marker),
      [marker, onLongPress],
    );

    /**
     * Handle updating markers position in relation to its container
     *
     * @param mapOptions Source map options
     */
    const handleUpdatePosition = useCallback(() => {
      // Ensure reference to the icon is available
      if (!markerRef) {
        return;
      }

      // Extract marker's position offsets
      const [ratioX, ratioY] = marker.coords;

      // Update marker's position
      markerRef.style.left = `${ratioX * 100}%`;
      markerRef.style.top = `${ratioY * 100}%`;
    }, [markerRef, marker]);

    // Expose internal controller functions allowing to change marker's
    // visibility and position
    useImperativeHandle<MarkerRef, MarkerRef>(
      ref,
      () => ({
        element: markerRef,
        setHidden,
        setVisible,
      }),
      [markerRef],
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

      document.addEventListener('keydown', handleDocumentKeyDown, {
        capture: true,
      });
      return () =>
        document.removeEventListener('keydown', handleDocumentKeyDown, {
          capture: true,
        });
    }, [handleDocumentKeyDown, marker, onKeyDown]);

    return (
      <Transition
        in={(forceVisible || visible) && markerSize > 0}
        mountOnEnter={mountOnEnter}
        nodeRef={nodeRef}
        timeout={75}
        unmountOnExit={unmountOnExit}
        onEntering={handleUpdatePosition}
      >
        {state => (
          <div
            className={clsx(
              styles.HuntingMapMarker,
              getTransitionClassName(
                state,
                styles.HuntingMapMarkerStateEntering,
                styles.HuntingMapMarkerStateEntered,
                styles.HuntingMapMarkerStateExiting,
                styles.HuntingMapMarkerStateExited,
              ),
              { [styles.HuntingMapMarkerHidden]: hidden },
              className,
            )}
            ref={setMarkerRef}
            style={style}
            onDoubleClick={handleDoubleClick}
          >
            <IconComponent
              highlighted={highlighted}
              size={markerSize}
              title={tooltip}
              onClick={handleClick}
              onLongPress={handleLongPress}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {children}
          </div>
        )}
      </Transition>
    );
  },
) as <TMarkerOptions extends MarkerOptions>(
  props: HuntingMapMarkerProps<TMarkerOptions> & { ref?: Ref<MarkerRef> },
) => ReactElement;

// @ts-ignore
HuntingMapMarker.displayName = 'HuntingMapMarker';
