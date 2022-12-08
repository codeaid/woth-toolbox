import {
  createRef,
  memo,
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
} from 'react';
import useResizeObserver, { ObservedSize } from 'use-resize-observer';
import { AnimalEditor } from 'components/AnimalEditor';
import {
  HuntingMapAnimal,
  HuntingMapAnimalRef,
} from 'components/HuntingMapAnimal';
import {
  HuntingMapFilter,
  HuntingMapFilterOptions,
} from 'components/HuntingMapFilter';
import { HuntingMapLabel } from 'components/HuntingMapLabel';
import { HuntingMapMarker } from 'components/HuntingMapMarker';
import { HuntingMapToolbar } from 'components/HuntingMapToolbar';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { useForceUpdate } from 'hooks';
import {
  getCenteredMapOptions,
  getMapDimensions,
  getMapSize,
  getNextMapOptions,
  getNextZoomOptions,
  getScreenCenterOffset,
  updateMapPosition,
} from 'lib/cartography';
import {
  getGenericMarkerColorClass,
  getMarkerKey,
  isHighlightedMarker,
  updateMarkerPositions,
  updateMarkerVisibility,
} from 'lib/markers';
import { roundNumber } from 'lib/utils';
import {
  MapMarkerOptions,
  MapMarkerRef,
  MapOptions,
  MapZoomOptions,
} from 'types/cartography';
import { AnimalMarkerOptions } from 'types/markers';
import { HuntingMapDragOptions, HuntingMapProps } from './types';
import styles from './HuntingMap.module.css';

const HuntingMapAnimalMemo = memo(HuntingMapAnimal);
const HuntingMapMarkerMemo = memo(HuntingMapMarker);

export const HuntingMap = (props: HuntingMapProps) => {
  const {
    animalMarkerDataMap,
    animalMarkerSize = 50,
    animalMarkers,
    defaultZoom = 0.25,
    genericMarkerSize = 40,
    genericMarkers,
    imageHeight,
    imageSrc,
    imageWidth,
    labels = [],
    mapBoundary = 100,
    markerRangeMap = new Map(),
    zoomMax = 5,
    zoomMin = 0.1,
    zoomSpeed = 1,
    zoomStep = 0.05,
    zoneMarkerSize = 35,
    onClick,
    onEditorClear,
    onEditorRead,
    onEditorWrite,
  } = props;

  // References to component elements
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Drag start mouse coordinates and current map position offsets
  const dragCoords = useRef<HuntingMapDragOptions>({
    mapLeft: 0,
    mapTop: 0,
    pageX: 0,
    pageY: 0,
  });

  // Map offset values that are used to position the map
  const mapOptions = useRef<MapOptions>({
    containerHeight: -1,
    containerWidth: -1,
    imageHeight,
    imageWidth,
    mapBoundary,
    mapHeight: getMapSize(imageWidth, defaultZoom),
    mapLeft: 0,
    mapTop: 0,
    mapWidth: getMapSize(imageWidth, defaultZoom),
  });

  // Zoom values used to scale the map
  const zoomOptions = useRef<MapZoomOptions>({
    zoomMax,
    zoomMin,
    zoomSpeed,
    zoomStep,
    zoomValue: defaultZoom,
  });

  // Flag indicating whether left mouse button is being held down
  const isMouseDown = useRef(false);

  // Lists of marker options to be rendered on the page
  const animalMarkerOptions = useRef<
    Array<MapMarkerOptions<HuntingMapAnimalRef, AnimalMarkerOptions>>
  >([]);
  const genericMarkerOptions = useRef<Array<MapMarkerOptions>>([]);
  const needZoneMarkerOptions = useRef<Array<MapMarkerOptions>>([]);

  // Currently selected filters
  const filterOptions = useRef<HuntingMapFilterOptions>({
    selectedTypes: [],
  });

  // Variable tracking whether mouse was moved between mousedown and mouseup
  const mouseMoved = useRef(false);

  // Animal marker that is currently being edited
  const [editedAnimal, setEditedAnimal] = useState<AnimalMarkerOptions>();

  // Flag indicating that the map image has loaded
  const [imageLoaded, setImageLoaded] = useState(false);

  // Update trigger function
  const [forcedUpdate, setForcedUpdate] = useForceUpdate();

  /**
   * Clear currently active animal
   */
  const handleAnimalEditorClose = useCallback(
    () => setEditedAnimal(undefined),
    [],
  );

  /**
   * Update all animal markers with custom data entries when they change
   */
  const handleUpdateAnimalData = useCallback(() => {
    animalMarkerOptions.current.forEach(options => {
      const { marker, ref } = options;

      // Set data associated with the current animal marker
      const data = animalMarkerDataMap[(marker as AnimalMarkerOptions).id];
      ref.current?.setData(data);
    });
  }, [animalMarkerDataMap]);

  /**
   * Handle updating positions of all markers
   *
   * @param customMapOptions Custom map option overrides
   */
  const handleUpdateMarkerPositions = useCallback(
    (customMapOptions?: MapOptions) =>
      updateMarkerPositions(
        customMapOptions ?? mapOptions.current,
        genericMarkerSize,
        animalMarkerOptions.current,
        genericMarkerOptions.current,
        needZoneMarkerOptions.current,
      ),
    [genericMarkerSize],
  );

  /**
   * Handle updating marker visibility based on current filters and zoom
   */
  const handleUpdateMarkerVisibility = useCallback(
    (customZoomOptions?: MapZoomOptions) =>
      updateMarkerVisibility(
        filterOptions.current,
        customZoomOptions ?? zoomOptions.current,
        markerRangeMap,
        animalMarkerOptions.current,
        genericMarkerOptions.current,
        needZoneMarkerOptions.current,
      ),
    [markerRangeMap],
  );

  /**
   * Update map position in relation to the container
   *
   * @param callbacks List of callbacks to execute after updating map position
   */
  const handleMapUpdate = useCallback(
    (...callbacks: Array<() => void>) =>
      updateMapPosition(
        imageWrapperRef.current,
        imageRef.current,
        mapOptions.current,
        () => callbacks.forEach(callback => callback()),
      ),
    [],
  );

  /**
   * Handle the start of map being dragged
   *
   * @param pageX Current horizontal pointer position in relation to the page
   * @param pageY Current vertical pointer position in relation to the page
   */
  const handleMapDragStart = useCallback((pageX: number, pageY: number) => {
    // Persist starting mouse and map offsets
    const { mapLeft, mapTop } = mapOptions.current;
    dragCoords.current = { mapLeft, mapTop, pageX, pageY };

    // Update container's class names and enable dragging
    containerRef.current?.classList.add(styles.HuntingMapDragging);
    isMouseDown.current = true;
  }, []);

  /**
   * Handle the progress of map being dragged
   *
   * @param pageX Current horizontal pointer position in relation to the page
   * @param pageY Current vertical pointer position in relation to the page
   */
  const handleMapDrag = useCallback(
    (pageX: number, pageY: number) => {
      // Ensure left mouse button is being held down
      if (!isMouseDown.current || (pageX === 0 && pageY === 0)) {
        return;
      }

      // Calculate differences between initial pointer position and current
      const deltaX = dragCoords.current.pageX - pageX;
      const deltaY = dragCoords.current.pageY - pageY;

      // Offset map position by the deltas
      let mapLeft = dragCoords.current.mapLeft - deltaX;
      let mapTop = dragCoords.current.mapTop - deltaY;

      // Update map options
      mapOptions.current = {
        ...mapOptions.current,
        mapLeft,
        mapTop,
      };

      // Update map's position in relation to the container
      handleMapUpdate();
    },
    [handleMapUpdate],
  );

  /**
   * Cancel dragging the map
   */
  const handleMapDragCancel = useCallback(() => {
    // Update container's class names and disable dragging
    containerRef.current?.classList.remove(styles.HuntingMapDragging);
    isMouseDown.current = false;
  }, []);

  /**
   * Center map and reset its size
   */
  const handleMapReset = useCallback(() => {
    // Calculate target image width and height at the default zoom
    const [mapWidth, mapHeight] = getMapDimensions(
      imageWidth,
      imageHeight,
      defaultZoom,
    );

    // Update map options to center the map
    mapOptions.current = getCenteredMapOptions({
      ...mapOptions.current,
      mapHeight,
      mapWidth,
    });

    // Reset zoom value to the default one
    zoomOptions.current = {
      ...zoomOptions.current,
      zoomValue: defaultZoom,
    };

    // Update map position in relation to the container
    handleMapUpdate(
      handleUpdateAnimalData,
      handleUpdateMarkerPositions,
      handleUpdateMarkerVisibility,
    );
  }, [
    defaultZoom,
    handleMapUpdate,
    handleUpdateAnimalData,
    handleUpdateMarkerPositions,
    handleUpdateMarkerVisibility,
    imageHeight,
    imageWidth,
  ]);

  /**
   * Handle map being zoomed in
   *
   * @param delta Scroll delta value
   * @param pageX Horizontal cursor position relative to the page
   * @param pageY Vertical cursor position relative to the page
   */
  const handleMapZoom = useCallback(
    (delta: number, pageX?: number, pageY?: number) => {
      const container = containerRef.current;
      const image = imageRef.current;

      // Ensure all required elements are present
      if (!container || !image) {
        return;
      }

      // Use center of the current page as the zoom target
      if (!pageX || !pageY) {
        const [centerX, centerY] = getScreenCenterOffset(document);
        pageX ??= centerX;
        pageY ??= centerY;
      }

      zoomOptions.current = getNextZoomOptions(zoomOptions.current, delta);
      mapOptions.current = getNextMapOptions(
        pageX,
        pageY,
        container,
        image,
        mapOptions.current,
        zoomOptions.current,
      );

      handleMapUpdate(
        handleUpdateMarkerPositions,
        handleUpdateMarkerVisibility,
        setForcedUpdate,
      );
    },
    [
      setForcedUpdate,
      handleMapUpdate,
      handleUpdateMarkerPositions,
      handleUpdateMarkerVisibility,
    ],
  );

  /**
   * Handle pressing left mouse button down
   *
   * @param event Mouse event object
   */
  const handleContainerMouseDown = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      const { pageX, pageY } = event;

      mouseMoved.current = false;
      handleMapDragStart(pageX, pageY);
    },
    [handleMapDragStart],
  );

  /**
   * Handle moving mouse around
   *
   * @param event Mouse event object
   */
  const handleContainerMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      mouseMoved.current = true;
      handleMapDrag(event.pageX, event.pageY);
    },
    [handleMapDrag],
  );

  /**
   * Handle clicking on the map
   *
   * @param event Mouse event object
   */
  const handleContainerMouseUp = useCallback(
    (event: MouseEvent<EventTarget>) => {
      event.preventDefault();

      handleMapDragCancel();

      // Ignore clicks on markers
      if (!onClick || event.target !== imageRef.current) {
        return;
      }

      // Only trigger the event if mouse was released at the same offset
      // as it was pressed down (is a click without the map being dragged)
      if (!mouseMoved.current) {
        const { offsetX, offsetY } = event.nativeEvent;
        const { zoomValue } = zoomOptions.current;

        onClick(
          roundNumber(offsetX / zoomValue / imageWidth, 10),
          roundNumber(offsetY / zoomValue / imageHeight, 10),
        );
      }
    },
    [handleMapDragCancel, imageHeight, imageWidth, onClick],
  );

  /**
   * Handle changes to the container element and update map size
   */
  const handleContainerResize = useCallback(
    ({ height, width }: ObservedSize) => {
      // Ensure width and height are present
      if (!height || !width) {
        return;
      }

      // Update map options
      mapOptions.current = {
        ...mapOptions.current,
        containerHeight: height,
        containerWidth: width,
      };

      // Update map position in relation to the container
      handleMapUpdate();
    },
    [handleMapUpdate],
  );

  /**
   * Handle initiating map being dragged using touch
   *
   * @param event Touch event object
   */
  const handleContainerTouchStart = useCallback(
    (event: TouchEvent<EventTarget>) => {
      // Fix for touch enabled devices that fixes lag on drag start
      event.stopPropagation();

      // Determine if taps occurred on map elements
      const tapOnWrapper = containerRef.current
        ? containerRef.current.contains(event.nativeEvent.target as Node)
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
   * @param event Touch event object
   */
  const handleContainerTouchMove = useCallback(
    (event: TouchEvent<EventTarget>) => {
      const { pageX, pageY } = event.touches[0];
      handleMapDrag(pageX, pageY);
    },
    [handleMapDrag],
  );

  /**
   * Handle mouse wheel scrolls on the map wrapper
   *
   * @param event Wheel event object
   */
  const handleContainerWheel = useCallback(
    (event: WheelEvent<HTMLElement>) =>
      handleMapZoom(event.deltaY, event.pageX, event.pageY),
    [handleMapZoom],
  );

  /**
   * Handle map image having been fully loaded
   */
  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
    handleMapReset();
  }, [handleMapReset]);

  /**
   * Handle changes to selected filters
   *
   * @param options Selected filter options
   */
  const handleFilterChange = useCallback(
    (options: HuntingMapFilterOptions) => {
      // Update visibility of map markers depending on the filter values
      filterOptions.current = options;
      handleUpdateMarkerVisibility();

      // Trigger filter component update with new values
      setForcedUpdate();
    },
    [setForcedUpdate, handleUpdateMarkerVisibility],
  );

  /**
   * Handle opening or closing an animal marker editor
   */
  const handleToggleAnimalEditor = useCallback(
    (marker: AnimalMarkerOptions, visible: boolean) =>
      setEditedAnimal(visible ? marker : undefined),
    [],
  );

  /**
   * Toggle specified animal icon's need zones
   *
   * @param marker Animal marker to toggle
   * @param expanded TRUE if the need zones are visible, FALSE otherwise
   */
  const handleToggleAnimalZones = useCallback(
    (marker: AnimalMarkerOptions) =>
      animalMarkerOptions.current.forEach(options => {
        // Detect if the current animal marker is the one being toggled
        const isCurrentAnimal = options.marker.id === marker.id;

        // Hide zones of all other markers
        if (!isCurrentAnimal) {
          options.ref.current?.setZonesVisible(false);
        }
      }),
    [],
  );

  // List of map habitat labels
  const renderedLabels = useMemo(
    () =>
      labels.map((label, index) => (
        <HuntingMapLabel
          {...label}
          key={index}
          mapScale={zoomOptions.current.zoomValue}
          maxMapScale={0.6}
          minMapScale={0.22}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labels, forcedUpdate],
  );

  // Monitor changes to wrapper size and update canvas size accordingly
  useResizeObserver<HTMLDivElement>({
    ref: containerRef,
    onResize: handleContainerResize,
  });

  // Initialize container dimensions in map options
  useEffect(() => {
    // Ensure canvas has been initialized
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Update map options with container dimensions
    const { height, width } = container.getBoundingClientRect();
    mapOptions.current.containerHeight = height;
    mapOptions.current.containerWidth = width;
  }, []);

  // Build list of options for all generic markers
  useEffect(() => {
    // Build a list of new marker identifiers
    const newIds = animalMarkers.map(marker => marker.id);
    let markersRemoved = false;

    // Hide all existing markers who no longer exist in the new list of markers
    // as all references to them will be deleted in the loop below
    animalMarkerOptions.current.forEach(options => {
      if (!newIds.includes(options.marker.id)) {
        options.ref.current?.setVisible(false);
        markersRemoved = true;
      }
    });

    // Trigger a re-render if any markers were removed
    if (markersRemoved) {
      setForcedUpdate();
    }

    // Build list of options for all generic markers
    animalMarkerOptions.current = animalMarkers.map(marker => {
      // Create component key and reference
      const key = marker.id ?? getMarkerKey(marker);
      const ref = createRef<HuntingMapAnimalRef>();

      // Build marker options object
      return {
        element: (
          <HuntingMapAnimalMemo
            activated={false}
            key={key}
            marker={marker}
            ref={ref}
            size={animalMarkerSize}
            zoneSize={zoneMarkerSize}
            onToggleEditor={handleToggleAnimalEditor}
            onToggleZones={handleToggleAnimalZones}
          />
        ),
        marker,
        ref,
        visible: false,
      };
    });
  }, [
    animalMarkerSize,
    animalMarkers,
    handleToggleAnimalEditor,
    handleToggleAnimalZones,
    setForcedUpdate,
    zoneMarkerSize,
  ]);

  // Build a list of generic marker options
  useEffect(() => {
    // Build list of options for all generic markers
    genericMarkerOptions.current = genericMarkers.map(marker => {
      // Create component key and reference
      const key = marker.id ?? getMarkerKey(marker);
      const ref = createRef<MapMarkerRef>();

      // Build marker options object
      return {
        element: (
          <HuntingMapMarkerMemo
            className={getGenericMarkerColorClass(
              marker,
              styles.HuntingMapMarkerGeneric,
              styles.HuntingMapMarkerLandmark,
              styles.HuntingMapMarkerLodge,
            )}
            highlighted={isHighlightedMarker(marker)}
            key={key}
            marker={marker}
            ref={ref}
            size={genericMarkerSize}
          />
        ),
        marker,
        ref,
      };
    });
  }, [
    genericMarkerSize,
    genericMarkers,
    handleUpdateMarkerPositions,
    handleUpdateMarkerVisibility,
  ]);

  // Update editor and need zone states when edited animal changes
  useEffect(() => {
    // Determine if editor is visible
    const editorVisible = !!editedAnimal;

    animalMarkerOptions.current.forEach(options => {
      // Detect if the current animal marker is the one being toggled
      const isCurrentAnimal = options.marker.id === editedAnimal?.id;

      // Disable editor and hide need zones for all other markers
      options.ref.current?.setEditorActive(editorVisible && isCurrentAnimal);
      options.ref.current?.setZonesVisible(editorVisible && isCurrentAnimal);

      if (editorVisible && !isCurrentAnimal) {
        // Hide all other animals when editor is open
        options.ref.current?.setHidden(true);
      } else if (!editorVisible) {
        // Unhide all animals when editor closes
        options.ref.current?.setHidden(false);
      }
    });
  }, [editedAnimal]);

  // Trigger updates to icon appearance when custom animal data changes
  useEffect(
    () => handleUpdateAnimalData(),
    [animalMarkerDataMap, handleUpdateAnimalData],
  );

  // Ensure debug markers are always visible if there are any present
  useEffect(() => {
    animalMarkerOptions.current
      .filter(options => options.marker.debug)
      .forEach((options, index, list) => {
        // Update marker visibility once references are available
        setTimeout(() => {
          // Update marker's position and visibility
          options.ref.current?.updatePosition(mapOptions.current);
          options.ref.current?.setVisible(true);

          // Expand zones of the latest marker
          options.ref.current?.setZonesVisible(index === list.length - 1);
        }, 0);
      });

    // Force markers to be re-rendered
    setForcedUpdate();
  }, [animalMarkers, setForcedUpdate]);

  return (
    <>
      {!imageLoaded && (
        <LoadingOverlay>Please wait. Loading map...</LoadingOverlay>
      )}

      <HuntingMapToolbar
        onReset={handleMapReset}
        onZoomIn={() => handleMapZoom(-50)}
        onZoomOut={() => handleMapZoom(50)}
      />

      <HuntingMapFilter
        animalMarkers={animalMarkers}
        genericMarkers={genericMarkers}
        options={filterOptions.current}
        onChange={handleFilterChange}
      />

      <AnimalEditor
        marker={editedAnimal}
        onClose={handleAnimalEditorClose}
        onDataClear={onEditorClear}
        onDataRead={onEditorRead}
        onDataWrite={onEditorWrite}
      />

      <div
        className={styles.HuntingMap}
        ref={containerRef}
        onMouseDown={handleContainerMouseDown}
        onMouseLeave={handleMapDragCancel}
        onMouseMove={handleContainerMouseMove}
        onMouseUp={handleContainerMouseUp}
        onTouchEnd={handleMapDragCancel}
        onTouchMove={handleContainerTouchMove}
        onTouchStart={handleContainerTouchStart}
        onWheel={handleContainerWheel}
      >
        <div className={styles.HuntingMapImageWrapper} ref={imageWrapperRef}>
          {genericMarkerOptions.current.map(option => option.element)}
          {animalMarkerOptions.current.map(option => option.element)}
          {needZoneMarkerOptions.current.map(option => option.element)}
          {renderedLabels}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className={styles.HuntingMapImage}
            draggable={false}
            height={mapOptions.current.mapHeight}
            ref={imageRef}
            src={imageSrc}
            width={mapOptions.current.mapWidth}
            onLoad={handleImageLoaded}
          />
        </div>
      </div>
    </>
  );
};
