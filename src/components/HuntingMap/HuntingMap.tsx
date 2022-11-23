import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from 'react';
import { RiArrowGoBackFill, RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { baseUrl } from 'config/app';
import { HuntingMapOffsets, HuntingMapOptions, HuntingMapProps } from './types';
import styles from './HuntingMap.module.css';

export const HuntingMap = (props: HuntingMapProps) => {
  const {
    defaultScale = 1,
    imageHeight,
    imageSrc,
    imageWidth,
    maxScale = 2.5,
    minOverflow = 200,
    minScale = 1,
    scaleIncrement = 0.1,
    showButtons = true,
    onClick,
  } = props;

  // References to internal elements
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Variable holding mouse offset on mousedown on the image
  const imageMouseDownOffset = useRef<[number, number]>([0, 0]);

  // Flag indicating whether the map is currently being dragged
  const isDragging = useRef(false);

  // Information containing pointer offsets at the start of the drag operation
  const [dragStart, setDragStart] = useState<HuntingMapOffsets>({
    pageX: 0,
    pageY: 0,
    translateX: 0,
    translateY: 0,
  });

  // Current map offsets and options
  const [options, setOptions] = useState<HuntingMapOptions>({
    mapHeight: imageHeight * defaultScale,
    mapLeft: 0,
    mapScale: defaultScale,
    mapTop: 0,
    mapWidth: imageWidth * defaultScale,
  });

  /**
   * Ensure specified coordinates remain within the allowed boundaries
   *
   * @param x Horizontal offset
   * @param y Vertical offset
   */
  const getBoundMapCoords = useCallback(
    (
      x: number,
      y: number,
      targetWidth?: number,
      targetHeight?: number,
    ): [number, number] => {
      // Ensure container element has been initialized
      const containerElement = containerRef.current;
      if (!containerElement) {
        return [x, y];
      }

      // Determine height and width of the container element
      const { height: containerHeight, width: containerWidth } =
        containerElement.getBoundingClientRect();

      // Use custom or current map sizes
      const mapWidth = targetWidth ?? options.mapWidth;
      const mapHeight = targetHeight ?? options.mapHeight;

      // Ensure map can not be dragged outside the visible horizontal area
      if (x > containerWidth - minOverflow) {
        x = containerWidth - minOverflow;
      } else if (x < -mapWidth + minOverflow) {
        x = -mapWidth + minOverflow;
      }

      // Ensure map can not be dragged outside the visible vertical area
      if (y > containerHeight - minOverflow) {
        y = containerHeight - minOverflow;
      } else if (y < -mapHeight + minOverflow) {
        y = -mapHeight + minOverflow;
      }

      return [x, y];
    },
    [minOverflow, options],
  );

  /**
   * Get map offset coordinates for a centered position
   *
   * @param targetWidth Custom width to use when calculating offsets
   * @param targetHeight Custom height to use when calculating offsets
   */
  const getCenteredMapCoords = useCallback(
    (targetWidth?: number, targetHeight?: number): [number, number] => {
      const containerElement = containerRef.current;

      // Ensure container element is initialised before proceeding
      if (!containerElement) {
        return [0, 0];
      }

      // Determine height and width of the container element
      const { height: containerHeight, width: containerWidth } =
        containerElement.getBoundingClientRect();

      // Use custom or current map sizes
      const imageWidth = targetWidth ?? options.mapWidth;
      const imageHeight = targetHeight ?? options.mapHeight;

      return [
        containerWidth / 2 - imageWidth / 2,
        containerHeight / 2 - imageHeight / 2,
      ];
    },
    [options],
  );

  /**
   * Handle the start of map being dragged
   *
   * @param pageX Current horizontal pointer position in relation to the page
   * @param pageY Current vertical pointer position in relation to the page
   * @param event Target mouse or touch event that was triggered
   */
  const handleDragStart = useCallback(
    (
      pageX: number,
      pageY: number,
      event: MouseEvent<EventTarget> | TouchEvent<EventTarget>,
    ) => {
      // Extract current map position offsets
      const { mapLeft, mapTop } = options;

      // Store the starting pointer position as well as current
      // map position offsets for use during the drag process
      setDragStart({
        pageX,
        pageY,
        translateX: mapLeft,
        translateY: mapTop,
      });

      // Enable drag functionality
      isDragging.current = true;

      // Cancel events to prevent further logic from being executed
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopPropagation();
    },
    [options],
  );

  /**
   * Handle the progress of map being dragged
   *
   * @param pageX Current horizontal pointer position in relation to the page
   * @param pageY Current vertical pointer position in relation to the page
   */
  const handleDragProgress = useCallback(
    (pageX: number, pageY: number) => {
      // Ensure map is being dragged
      if (!isDragging.current) {
        return;
      }

      // Ensure container element has been initialized
      const containerElement = containerRef.current;
      if (!containerElement) {
        return;
      }

      // Calculate differences between initial pointer position and current
      const deltaX = dragStart.pageX - pageX;
      const deltaY = dragStart.pageY - pageY;

      // Offset map position by the deltas
      let translateX = dragStart.translateX - deltaX;
      let translateY = dragStart.translateY - deltaY;

      // Ensure map remains within the boundaries
      const [mapLeft, mapTop] = getBoundMapCoords(translateX, translateY);

      // Update options to trigger map's position change
      setOptions(current => ({
        ...current,
        mapLeft,
        mapTop,
      }));
    },
    [dragStart, getBoundMapCoords],
  );

  /**
   * Handle the end of map being dragged
   */
  const handleDragEnd = useCallback(() => {
    // Disable drag functionality
    isDragging.current = false;
  }, []);

  /**
   * Handle map being zoomed in
   */
  const handleZoomIn = useCallback(
    () =>
      setOptions(current => {
        const { mapHeight, mapLeft, mapScale, mapTop, mapWidth } = current;

        // Calculate next scale after scaling it up
        const nextScale = Math.min(maxScale, mapScale + scaleIncrement);

        // Calculate map's size at the next scale
        const nextWidth = imageWidth * nextScale;
        const nextHeight = imageHeight * nextScale;

        // Calculate difference between the current and next sizes
        const diffWidth = nextWidth - mapWidth;
        const diffHeight = nextHeight - mapHeight;

        // Ensure map remains within the boundaries when zooming in
        const [translateX, translateY] = getBoundMapCoords(
          mapLeft - diffWidth / 2,
          mapTop - diffHeight / 2,
          nextWidth,
          nextHeight,
        );

        return {
          mapHeight: nextHeight,
          mapLeft: translateX,
          mapScale: nextScale,
          mapTop: translateY,
          mapWidth: nextWidth,
        };
      }),
    [getBoundMapCoords, imageHeight, imageWidth, maxScale, scaleIncrement],
  );

  /**
   * Handle map being zoomed out
   */
  const handleZoomOut = useCallback(
    () =>
      setOptions(current => {
        const { mapHeight, mapLeft, mapScale, mapTop, mapWidth } = current;

        // Calculate next scale after scaling it down
        const nextScale = Math.max(minScale, mapScale - scaleIncrement);

        // Calculate map's size at the next scale
        const nextWidth = imageWidth * nextScale;
        const nextHeight = imageHeight * nextScale;

        // Calculate difference between the current and next sizes
        const diffWidth = mapWidth - nextWidth;
        const diffHeight = mapHeight - nextHeight;

        // Ensure map remains within the boundaries when zooming out
        const [translateX, translateY] = getBoundMapCoords(
          mapLeft + diffWidth / 2,
          mapTop + diffHeight / 2,
          nextWidth,
          nextHeight,
        );

        return {
          mapLeft: translateX,
          mapScale: nextScale,
          mapTop: translateY,
          mapWidth: nextWidth,
          mapHeight: nextHeight,
        };
      }),
    [getBoundMapCoords, imageHeight, imageWidth, minScale, scaleIncrement],
  );

  /**
   * Handle initiating map being dragged using a mouse
   *
   * @param event Mouse event
   */
  const handleContainerMouseDown = useCallback(
    (event: MouseEvent<EventTarget>) => {
      const { pageX, pageY } = event;
      handleDragStart(pageX, pageY, event);
    },
    [handleDragStart],
  );

  /**
   * Handle mouse being moved while dragging the map
   *
   * @param event Mouse event
   */
  const handleContainerMouseMove = useCallback(
    (event: MouseEvent<EventTarget>) => {
      const { pageX, pageY } = event;
      handleDragProgress(pageX, pageY);
    },
    [handleDragProgress],
  );

  /**
   * Handle initiating map being dragged using touch
   *
   * @param event Touch event
   */
  const handleContainerTouchStart = useCallback(
    (event: TouchEvent<EventTarget>) => {
      const { pageX, pageY } = event.touches[0];
      handleDragStart(pageX, pageY, event);
    },
    [handleDragStart],
  );

  /**
   * Handle touch being moved while dragging the map
   *
   * @param event Touch event
   */
  const handleContainerTouchMove = useCallback(
    (event: TouchEvent<EventTarget>) => {
      const { pageX, pageY } = event.touches[0];
      handleDragProgress(pageX, pageY);
    },
    [handleDragProgress],
  );

  /**
   * Handle mouse wheel being scrolled
   *
   * @param event Wheel event
   */
  const handleContainerWheel = useCallback(
    (event: WheelEvent<EventTarget>) =>
      // Scroll down = positive delta, scroll up = negative delta
      Math.sign(event.deltaY) < 0 ? handleZoomIn() : handleZoomOut(),
    [handleZoomIn, handleZoomOut],
  );

  /**
   * Handle clicking on the map
   */
  const handleMapMouseDown = useCallback((event: MouseEvent<EventTarget>) => {
    imageMouseDownOffset.current = [event.pageX, event.pageY];
  }, []);

  /**
   * Handle clicking on the map
   */
  const handleMapMouseUp = useCallback(
    (event: MouseEvent<EventTarget>) => {
      event.preventDefault();

      if (!onClick) {
        return;
      }

      // Retrieve previous and current cursor offset in relation to the page
      const { pageX, pageY } = event;
      const [previousX, previousY] = imageMouseDownOffset.current;

      // Only trigger the event if mouse was released at the same offset
      // as it was pressed down (is a click without the map being dragged)
      if (pageX === previousX && pageY === previousY) {
        const { offsetX, offsetY } = event.nativeEvent;
        const { mapScale } = options;

        onClick(Math.round(offsetX / mapScale), Math.round(offsetY / mapScale));
      }
    },
    [onClick, options],
  );

  /**
   * Center map and reset its size
   */
  const handleReset = useCallback(() => {
    const targetWidth = imageWidth * defaultScale;
    const targetHeight = imageHeight * defaultScale;

    // Get center position of the map at target size
    const [mapLeft, mapTop] = getCenteredMapCoords(targetWidth, targetHeight);

    setOptions({
      mapLeft,
      mapScale: defaultScale,
      mapTop,
      mapWidth: imageWidth * defaultScale,
      mapHeight: imageHeight * defaultScale,
    });
  }, [defaultScale, getCenteredMapCoords, imageHeight, imageWidth]);

  /**
   * Handle browser window being resized
   */
  const handleWindowResize = useCallback(() => {
    // Get current map coordinates
    const { mapLeft, mapTop } = options;

    // Get corrected map coordinates if the map is outside boundaries
    const [translateX, translateY] = getBoundMapCoords(mapLeft, mapTop);

    // Update map options if any of the offsets need adjusting
    if (translateX != mapLeft || translateY != mapTop) {
      setOptions(current => ({
        ...current,
        mapLeft: translateX,
        mapTop: translateY,
      }));
    }
  }, [getBoundMapCoords, options]);

  /**
   * Render zoom in, out and reset buttons if enabled
   */
  const renderButtons = () => {
    if (!showButtons) {
      return null;
    }

    return (
      <>
        <button className={styles.HuntingMapButton} onClick={handleZoomIn}>
          <RiZoomInLine />
        </button>
        <button className={styles.HuntingMapButton} onClick={handleZoomOut}>
          <RiZoomOutLine />
        </button>
        <button className={styles.HuntingMapButton} onClick={handleReset}>
          <RiArrowGoBackFill />
        </button>
      </>
    );
  };

  /**
   * Center map on component being mounted the first time
   */
  useEffect(() => {
    const [mapLeft, mapTop] = getCenteredMapCoords();

    setOptions(current => ({
      ...current,
      mapLeft,
      mapTop,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Ensure map remains within boundaries during window resize
   */
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [getBoundMapCoords, handleWindowResize, options]);

  return (
    <div
      className={styles.HuntingMap}
      ref={containerRef}
      style={{
        cursor: `url("${baseUrl}/img/mouse.png"), auto`,
      }}
      onMouseDown={handleContainerMouseDown}
      onMouseLeave={handleDragEnd}
      onMouseMove={handleContainerMouseMove}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onTouchMove={handleContainerTouchMove}
      onTouchStart={handleContainerTouchStart}
      onWheel={handleContainerWheel}
    >
      {renderButtons()}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Nez Perez map"
        className={styles.HuntingMapImage}
        height={options.mapHeight}
        ref={imageRef}
        src={imageSrc}
        style={{
          height: `${options.mapHeight}px`,
          left: `${options.mapLeft}px`,
          top: `${options.mapTop}px`,
          width: `${options.mapWidth}px`,
        }}
        width={options.mapWidth}
        onMouseDownCapture={handleMapMouseDown}
        onMouseUpCapture={handleMapMouseUp}
      />
    </div>
  );
};
