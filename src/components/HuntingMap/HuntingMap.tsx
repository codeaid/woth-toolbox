import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
} from 'react';
import { AnimalEditor } from 'components/AnimalEditor';
import { HuntingMapAnimal } from 'components/HuntingMapAnimal';
import { HuntingMapFilter } from 'components/HuntingMapFilter';
import { HuntingMapLabel } from 'components/HuntingMapLabel';
import { HuntingMapMarker } from 'components/HuntingMapMarker';
import { HuntingMapToolbar } from 'components/HuntingMapToolbar';
import { LoadingOverlay } from 'components/LoadingOverlay';
import {
  getMarkerKey,
  isHighlightedMarker,
  isMarkerEqual,
  isMarkerFiltered,
} from 'lib/markers';
import { AnimalMarkerOptions } from 'types/markers';
import { HuntingMapOffsets, HuntingMapOptions, HuntingMapProps } from './types';
import styles from './HuntingMap.module.css';

export const HuntingMap = (props: HuntingMapProps) => {
  const {
    animalMarkerDataMap,
    animalMarkers,
    defaultScale = 0.25,
    filterOptions,
    genericMarkers,
    imageHeight,
    imageSrc,
    imageWidth,
    labels = [],
    markerRangeMap = new Map(),
    maxMarkerSize = 38,
    maxScale = 2.5,
    minOverflow = 200,
    minScale = 0.2,
    scaleIncrement = 0.1,
    onClick,
    onFilterChange,
    onMarkerDataChange,
  } = props;

  // References to internal elements
  const imageRef = useRef<HTMLImageElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Variable holding mouse offset on mousedown on the image
  const imageMouseDownOffset = useRef<[number, number]>([0, 0]);

  // Flag indicating whether the map is currently being dragged
  const isDragging = useRef(false);

  // Information containing pointer offsets at the start of the drag operation
  const dragStart = useRef<HuntingMapOffsets>({
    pageX: 0,
    pageY: 0,
    translateX: 0,
    translateY: 0,
  });

  // Currently active and expanded animal markers (one being edited)
  const [activeAnimal, setActiveAnimal] = useState<AnimalMarkerOptions>();
  const [expandedAnimal, setExpandedAnimal] = useState<AnimalMarkerOptions>();

  // Flag indicating that the map image has loaded
  const [imageLoaded, setImageLoaded] = useState(false);

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
   * @param targetWidth Custom map width override
   * @param targetHeight Custom map height override
   */
  const getBoundMapCoords = useCallback(
    (
      x: number,
      y: number,
      targetWidth?: number,
      targetHeight?: number,
    ): [number, number] => {
      // Ensure container element has been initialized
      const containerElement = ref.current;
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
   * @param targetWidth Custom map width to use when calculating offsets
   * @param targetHeight Custom map height to use when calculating offsets
   */
  const getCenteredMapCoords = useCallback(
    (targetWidth?: number, targetHeight?: number): [number, number] => {
      const containerElement = ref.current;

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
   * Clear currently active animal
   */
  const handleAnimalEditorClose = useCallback(
    () => setActiveAnimal(undefined),
    [],
  );

  /**
   * Toggle specified animal's need zones
   *
   * @param marker Animal marker to toggle
   * @param expanded TRUE if the need zones are visible, FALSE otherwise
   */
  const handleAnimalToggle = useCallback(
    (marker: AnimalMarkerOptions, expanded: boolean) =>
      expanded ? setExpandedAnimal(marker) : setExpandedAnimal(undefined),
    [],
  );

  /**
   * Handle map image having been fully loaded
   */
  const handleImageLoaded = useCallback(() => setImageLoaded(true), []);

  /**
   * Handle the start of map being dragged
   *
   * @param pageX Current horizontal pointer position in relation to the page
   * @param pageY Current vertical pointer position in relation to the page
   */
  const handleMapDragStart = useCallback(
    (pageX: number, pageY: number) => {
      // Extract current map position offsets
      const { mapLeft, mapTop } = options;

      // Store the starting pointer position as well as current
      // map position offsets for use during the drag process
      dragStart.current = {
        pageX,
        pageY,
        translateX: mapLeft,
        translateY: mapTop,
      };

      // Enable drag functionality
      isDragging.current = true;
    },
    [options],
  );

  /**
   * Handle the progress of map being dragged
   *
   * @param pageX Current horizontal pointer position in relation to the page
   * @param pageY Current vertical pointer position in relation to the page
   */
  const handleMapDrag = useCallback(
    (pageX: number, pageY: number) => {
      // Ensure map is being dragged
      if (!isDragging.current || (pageX === 0 && pageY === 0)) {
        return;
      }

      // Calculate differences between initial pointer position and current
      const deltaX = dragStart.current.pageX - pageX;
      const deltaY = dragStart.current.pageY - pageY;

      // Offset map position by the deltas
      let translateX = dragStart.current.translateX - deltaX;
      let translateY = dragStart.current.translateY - deltaY;

      // Ensure map remains within the boundaries
      const [mapLeft, mapTop] = getBoundMapCoords(translateX, translateY);

      // Update options to trigger map's position change
      setOptions(current => ({
        ...current,
        mapLeft,
        mapTop,
      }));
    },
    [getBoundMapCoords],
  );

  /**
   * Handle the end of map being dragged
   */
  const handleMapDragCancel = useCallback(() => {
    // Disable drag functionality
    isDragging.current = false;
  }, []);

  /**
   * Handle map being zoomed in
   *
   * @param offsetX Custom vertical cursor offset to zoom the map into
   * @param offsetY Custom horizontal cursor offset to zoom the map into
   */
  const handleMapZoomIn = useCallback(
    (offsetX?: number, offsetY?: number) =>
      setOptions(current => {
        const { mapHeight, mapLeft, mapScale, mapTop, mapWidth } = current;

        // Calculate next scale after scaling it up
        const nextScale =
          Math.round(
            (Math.min(maxScale, mapScale + scaleIncrement) + Number.EPSILON) *
              100,
          ) / 100;

        // Calculate map's size at the next scale
        const nextWidth = imageWidth * nextScale;
        const nextHeight = imageHeight * nextScale;

        // Calculate difference between the current and next sizes
        const diffWidth = nextWidth - mapWidth;
        const diffHeight = nextHeight - mapHeight;

        // Calculate position of the mouse within the map as percentages
        const percentX = offsetX ? offsetX / mapWidth : 0.5;
        const percentY = offsetY ? offsetY / mapWidth : 0.5;

        // Ensure map remains within the boundaries when zooming in
        const [translateX, translateY] = getBoundMapCoords(
          mapLeft - diffWidth * percentX,
          mapTop - diffHeight * percentY,
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
   *
   * @param offsetX Custom vertical cursor offset to zoom the map out of
   * @param offsetY Custom horizontal cursor offset to zoom the map out of
   */
  const handleMapZoomOut = useCallback(
    (offsetX?: number, offsetY?: number) =>
      setOptions(current => {
        const { mapHeight, mapLeft, mapScale, mapTop, mapWidth } = current;

        // Calculate next scale after scaling it down
        const nextScale =
          Math.round(
            (Math.max(minScale, mapScale - scaleIncrement) + Number.EPSILON) *
              100,
          ) / 100;

        // Calculate map's size at the next scale
        const nextWidth = imageWidth * nextScale;
        const nextHeight = imageHeight * nextScale;

        // Calculate difference between the current and next sizes
        const diffWidth = mapWidth - nextWidth;
        const diffHeight = mapHeight - nextHeight;

        // Calculate position of the mouse within the map as percentages
        const percentX = offsetX ? offsetX / mapWidth : 0.5;
        const percentY = offsetY ? offsetY / mapWidth : 0.5;

        // Ensure map remains within the boundaries when zooming out
        const [translateX, translateY] = getBoundMapCoords(
          mapLeft + diffWidth * percentX,
          mapTop + diffHeight * percentY,
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
  const handleMouseDown = useCallback(
    (event: MouseEvent<EventTarget>) => {
      event.preventDefault();

      const { pageX, pageY } = event;

      imageMouseDownOffset.current = [pageX, pageY];
      handleMapDragStart(pageX, pageY);
    },
    [handleMapDragStart],
  );

  /**
   * Handle mouse being moved while dragging the map
   *
   * @param event Mouse event
   */
  const handleMouseMove = useCallback(
    (event: MouseEvent<EventTarget>) => {
      const { pageX, pageY } = event;
      handleMapDrag(pageX, pageY);
    },
    [handleMapDrag],
  );

  /**
   * Handle clicking on the map
   */
  const handleMouseUp = useCallback(
    (event: MouseEvent<EventTarget>) => {
      event.preventDefault();

      handleMapDragCancel();

      // Ignore clicks on markers
      if (!onClick || event.target !== imageRef.current) {
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
    [handleMapDragCancel, onClick, options],
  );

  /**
   * Handle initiating map being dragged using touch
   *
   * @param event Touch event
   */
  const handleTouchStart = useCallback(
    (event: TouchEvent<EventTarget>) => {
      // Fix for touch enabled devices that fixes lag on drag start
      event.stopPropagation();

      // Determine if taps occurred on map elements
      const tapOnWrapper = ref.current
        ? ref.current.contains(event.nativeEvent.target as Node)
        : false;
      const tapOnMap = imageRef.current
        ? imageRef.current.contains(event.nativeEvent.target as Node)
        : false;

      // Determine if scroll wheel was used on the map image itself
      if (!tapOnWrapper && !tapOnMap) {
        return;
      }

      const { pageX, pageY } = event.touches[0];
      handleMapDragStart(pageX, pageY);
    },
    [handleMapDragStart],
  );

  /**
   * Handle touch being moved while dragging the map
   *
   * @param event Touch event
   */
  const handleTouchMove = useCallback(
    (event: TouchEvent<EventTarget>) => {
      const { pageX, pageY } = event.touches[0];
      handleMapDrag(pageX, pageY);
    },
    [handleMapDrag],
  );

  /**
   * Handle mouse wheel being scrolled
   *
   * @param event Wheel event
   */
  const handleWheel = useCallback(
    (event: WheelEvent<EventTarget>) => {
      // Ensure image element is available
      if (!imageRef.current) {
        return;
      }

      // Use map's mouse offset by default
      let { offsetX, offsetY } = event.nativeEvent;

      // Calculate offsets using page and image position if scroll did not occur
      // over the image
      if (event.target !== imageRef.current) {
        // Determine current mouse position in relation to the page
        const { pageX, pageY } = event.nativeEvent;

        // Get position of the image in relation to the page
        const { x, y } = imageRef.current.getBoundingClientRect();

        // Calculate map offset at which the mouse is being scrolled
        offsetX = Math.round(pageX - x);
        offsetY = Math.round(pageY - y);
      }

      // Scroll down = positive delta, scroll up = negative delta
      Math.sign(event.deltaY) < 0
        ? handleMapZoomIn(offsetX, offsetY)
        : handleMapZoomOut(offsetX, offsetY);
    },
    [handleMapZoomIn, handleMapZoomOut],
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

  // List of animal map marker elements
  const renderedAnimals = useMemo(
    () =>
      animalMarkers.map(marker => (
        <HuntingMapAnimal
          activated={activeAnimal && isMarkerEqual(marker, activeAnimal)}
          expanded={expandedAnimal && isMarkerEqual(marker, expandedAnimal)}
          key={getMarkerKey(marker)}
          mapScale={options.mapScale}
          marker={marker}
          markerRangeMap={markerRangeMap}
          maxMarkerSize={maxMarkerSize}
          style={{
            color: animalMarkerDataMap[marker.id]?.color,
          }}
          visible={
            isMarkerFiltered(marker, filterOptions) &&
            (!activeAnimal || isMarkerEqual(activeAnimal, marker))
          }
          onActivate={setActiveAnimal}
          onToggle={handleAnimalToggle}
        />
      )),
    [
      activeAnimal,
      animalMarkerDataMap,
      animalMarkers,
      expandedAnimal,
      filterOptions,
      handleAnimalToggle,
      markerRangeMap,
      maxMarkerSize,
      options.mapScale,
    ],
  );

  // List of generic map marker elements
  const renderedGenericMarkers = useMemo(
    () =>
      genericMarkers.map(marker => (
        <HuntingMapMarker
          highlighted={isHighlightedMarker(marker)}
          key={getMarkerKey(marker)}
          mapScale={options.mapScale}
          marker={marker}
          markerRangeMap={markerRangeMap}
          maxMarkerSize={maxMarkerSize}
          visible={isMarkerFiltered(marker, filterOptions)}
        />
      )),
    [
      filterOptions,
      genericMarkers,
      markerRangeMap,
      maxMarkerSize,
      options.mapScale,
    ],
  );

  // List of map habitat labels
  const renderedLabels = useMemo(
    () =>
      labels.map((label, index) => (
        <HuntingMapLabel
          {...label}
          key={index}
          mapScale={options.mapScale}
          maxMapScale={0.6}
          minMapScale={0.22}
        />
      )),
    [labels, options.mapScale],
  );

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
    <>
      {!imageLoaded && (
        <LoadingOverlay>Please wait. Loading map...</LoadingOverlay>
      )}
      <HuntingMapFilter
        animalMarkers={animalMarkers}
        genericMarkers={genericMarkers}
        options={filterOptions}
        onChange={onFilterChange}
      />
      <HuntingMapToolbar
        onReset={handleReset}
        onZoomIn={() => handleMapZoomIn()}
        onZoomOut={() => handleMapZoomOut()}
      />
      <AnimalEditor
        animal={activeAnimal}
        onChange={onMarkerDataChange}
        onClose={handleAnimalEditorClose}
      />

      <div
        className={styles.HuntingMap}
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMapDragCancel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMapDragCancel}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      >
        <div
          className={styles.HuntingMapContainer}
          style={{
            height: `${options.mapHeight}px`,
            left: `${options.mapLeft}px`,
            top: `${options.mapTop}px`,
            width: `${options.mapWidth}px`,
          }}
        >
          {imageLoaded && renderedAnimals}
          {imageLoaded && renderedGenericMarkers}
          {imageLoaded && renderedLabels}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Nez Perez map"
            className={styles.HuntingMapImage}
            height={options.mapHeight}
            ref={imageRef}
            src={imageSrc}
            width={options.mapWidth}
            onLoad={handleImageLoaded}
          />
        </div>
      </div>
    </>
  );
};
