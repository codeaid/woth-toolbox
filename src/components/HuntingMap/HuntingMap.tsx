import {
  createRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  MouseEvent,
  ReactElement,
  TouchEvent as ReactTouchEvent,
  WheelEvent,
} from 'react';
import useResizeObserver from 'use-resize-observer';
import type { ObservedSize } from 'use-resize-observer';
import { AnimalEditor } from 'components/AnimalEditor';
import { HuntingMapAnimal } from 'components/HuntingMapAnimal';
import type { HuntingMapAnimalProps } from 'components/HuntingMapAnimal';
import { HuntingMapCoords } from 'components/HuntingMapCoords';
import type { HuntingMapCoordsRef } from 'components/HuntingMapCoords';
import { HuntingMapFilter } from 'components/HuntingMapFilter';
import { HuntingMapLabel } from 'components/HuntingMapLabel';
import { HuntingMapMarker } from 'components/HuntingMapMarker';
import type { HuntingMapMarkerProps } from 'components/HuntingMapMarker';
import { HuntingMapScale } from 'components/HuntingMapScale';
import { HuntingMapToolbar } from 'components/HuntingMapToolbar';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { useAnimalMarkers, useCustomMarkers, useForceUpdate } from 'hooks';
import {
  getCenteredMapOptions,
  getMapDimensions,
  getMapMouseOffsetRatio,
  getMapSize,
  getNextMapOptions,
  getNextZoomOptions,
  getScreenCenterOffset,
  updateMapPosition,
} from 'lib/cartography';
import {
  getGenericMarkerColorClass,
  updateMarkerVisibility,
} from 'lib/markers';
import { sendGoogleEvent } from 'lib/tracking';
import { roundNumber } from 'lib/utils';
import type {
  MapFilterOptions,
  MapOptions,
  MapZoomOptions,
} from 'types/cartography';
import type { Point } from 'types/generic';
import type {
  MarkerOptionsAnimal,
  MarkerOptionsCustom,
  MarkerOptionsGeneric,
  MarkerRef,
  MarkerRefAnimal,
  MarkerReferenceAnimal,
  MarkerReferenceGeneric,
} from 'types/markers';
import type { HuntingMapDragOptions, HuntingMapProps } from './types';
import styles from './HuntingMap.module.css';

const HuntingMapAnimalMemo = memo(HuntingMapAnimal);
const HuntingMapMarkerMemo = memo(HuntingMapMarker);

export const HuntingMap = (props: HuntingMapProps) => {
  const {
    animalMarkers,
    defaultZoomValue = 0.25,
    genericMarkers,
    imageHeight = 4096,
    imageScale = 3,
    imageSrc,
    imageWidth = 4096,
    labels = [],
    mapBoundary = 100,
    markerSizeAnimal = 50,
    markerSizeGeneric = 40,
    markerSizeZone = 35,
    markerTrophyRating,
    zoomLabelMax = 0.549,
    zoomLabelMin = 0.2,
    zoomMarkerMap = new Map(),
    zoomMax = 5,
    zoomMin = 0.1,
    zoomSpeed = 1,
    zoomStep = 0.05,
    onClick,
  } = props;

  // References to component elements
  const containerRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HuntingMapCoordsRef>(null);
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
    mapHeight: getMapSize(imageWidth, defaultZoomValue),
    mapLeft: 0,
    mapTop: 0,
    mapWidth: getMapSize(imageWidth, defaultZoomValue),
  });

  // Zoom values used to scale the map
  const zoomOptions = useRef<MapZoomOptions>({
    zoomMax,
    zoomMin,
    zoomSpeed,
    zoomStep,
    zoomValue: defaultZoomValue,
  });

  // Lists of marker options to be rendered on the page
  const animalMarkerRefs = useRef<Array<MarkerReferenceAnimal>>([]);
  const genericMarkerRefs = useRef<Array<MarkerReferenceGeneric>>([]);

  // Flag indicating whether left mouse button is being held down
  const isMouseDown = useRef(false);

  // Store current mouse cursor coordinates and offset ratio
  const mouseCoords = useRef<Point>([-1, -1]);
  const mouseRatio = useRef<Point>([-1, -1]);

  // Variable tracking whether mouse was moved between mousedown and mouseup
  const mouseMoved = useRef(false);

  // Lists of animal and generic marker elements to render
  const [animalMarkerElements, setAnimalMarkerElements] =
    useState<Array<ReactElement<HuntingMapAnimalProps>>>();
  const [genericMarkerElements, setGenericMarkerElements] =
    useState<
      Array<ReactElement<HuntingMapMarkerProps<MarkerOptionsGeneric>>>
    >();

  // Animal marker that is currently being edited
  const [editedAnimal, setEditedAnimal] = useState<MarkerOptionsAnimal>();

  // The currently selected filters
  const [filterOptions, setFilterOptions] = useState<MapFilterOptions>({
    hideUnedited: false,
    showExplorationMarkers: true,
    showLabels: true,
    showTrackingMarkers: true,
    types: [],
  });

  // Flag indicating that the map image has loaded
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extract animal marker functionality
  const {
    markers: animalMarkerRecords,
    onCreateData: onUpdateAnimalMarker,
    onDeleteData: onClearAnimalMarker,
    onReadData: onLoadAnimalMarker,
  } = useAnimalMarkers();

  // Extract custom marker functionality
  const {
    markers: customMarkers,
    onClear: onClearCustomMarkers,
    onCreate: onCreateCustomMarker,
    onDelete: onDeleteCustomMarker,
  } = useCustomMarkers();

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
   * Handle removing tracking or exploration markers
   *
   * @param marker Target marker to remove
   * @param event Source keyboard event
   */
  const handleCustomMarkerKeyDown = useCallback(
    (marker: MarkerOptionsCustom, event: KeyboardEvent) => {
      // Standardize keyboard key value and retrieve marker type
      const key = event.key.toLowerCase();

      // Handle key presses on exploration markers
      if (marker.type === 'marker:exploration') {
        switch (key) {
          case ' ':
          case 'f':
            return onDeleteCustomMarker(marker);
        }
      }

      // Handle key presses on tracking markers
      if (marker.type === 'marker:tracking') {
        switch (key) {
          case ' ':
            return onDeleteCustomMarker(marker);
          case 't':
            return onClearCustomMarkers('marker:tracking');
        }
      }
    },
    [onClearCustomMarkers, onDeleteCustomMarker],
  );

  /**
   * Handle global key presses
   */
  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore marker creation if an animal is currently being edited
      if (typeof editedAnimal !== 'undefined') {
        return;
      }

      // Ensure mouse is over the map
      const [offsetX, offsetY] = mouseRatio.current;
      if (offsetX < 0 || offsetY < 0 || offsetX > 1 || offsetY > 1) {
        return;
      }

      // Standardize the key value
      const key = event.key.toLowerCase();

      if (key === 'f') {
        // Create a new exploration marker
        onCreateCustomMarker('marker:exploration', mouseRatio.current);
      } else if (key === 'c') {
        // Create a new tracking marker
        onCreateCustomMarker('marker:tracking', mouseRatio.current);
      }
    },
    [editedAnimal, onCreateCustomMarker],
  );

  /**
   * Update all animal markers with custom data entries when they change
   */
  const handleUpdateAnimalData = useCallback(
    () =>
      animalMarkerRefs.current.forEach(options => {
        const { marker, ref } = options;

        // Set data associated with the current animal marker
        const data = animalMarkerRecords[marker.id];
        ref.current?.setData(data);
      }),
    [animalMarkerRecords],
  );

  /**
   * Handle updating marker visibility based on current filters and zoom
   */
  const handleUpdateMarkerVisibility = useCallback(
    (customZoomOptions?: MapZoomOptions) =>
      updateMarkerVisibility(
        filterOptions,
        customZoomOptions ?? zoomOptions.current,
        zoomMarkerMap,
        animalMarkerRecords,
        animalMarkerRefs.current,
        genericMarkerRefs.current,
      ),
    [animalMarkerRecords, filterOptions, zoomMarkerMap],
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
    // Ignore resetting the map if an animal is currently being edited
    if (typeof editedAnimal !== 'undefined') {
      return;
    }

    // Calculate target image width and height at the default zoom
    const [mapWidth, mapHeight] = getMapDimensions(
      imageWidth,
      imageHeight,
      defaultZoomValue,
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
      zoomValue: defaultZoomValue,
    };

    // Update map position in relation to the container
    handleMapUpdate(handleUpdateMarkerVisibility, setForcedUpdate);
  }, [
    defaultZoomValue,
    editedAnimal,
    handleMapUpdate,
    handleUpdateMarkerVisibility,
    imageHeight,
    imageWidth,
    setForcedUpdate,
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

      handleMapUpdate(handleUpdateMarkerVisibility, setForcedUpdate);
    },
    [handleMapUpdate, handleUpdateMarkerVisibility, setForcedUpdate],
  );

  /**
   * Handle zooming the current map in
   */
  const handleMapZoomIn = useCallback(() => {
    // Ignore zooming the map if an animal is currently being edited
    if (typeof editedAnimal !== 'undefined') {
      return;
    }

    handleMapZoom(-100);
  }, [editedAnimal, handleMapZoom]);

  /**
   * Handle zooming the current map out
   */
  const handleMapZoomOut = useCallback(() => {
    // Ignore zooming the map if an animal is currently being edited
    if (typeof editedAnimal !== 'undefined') {
      return;
    }

    handleMapZoom(100);
  }, [editedAnimal, handleMapZoom]);

  /**
   * Handle pressing left mouse button down
   *
   * @param event Mouse event object
   */
  const handleContainerDoubleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      // Zoom map in when double clicking/tapping on it
      handleMapZoom(-500, event.clientX, event.clientY);
    },
    [handleMapZoom],
  );

  /**
   * Handle pressing left mouse button down
   *
   * @param event Mouse event object
   */
  const handleContainerMouseDown = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      // Ignore right mouse or mouse wheel clicks
      if (event.button !== 0) {
        return;
      }

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
      const container = containerRef.current;
      const image = imageRef.current;

      // Update mouse coordinates as the mouse moves
      if (container && image) {
        // Get mouse position relative to the map image as a percentage
        const [mouseRatioX, mouseRatioY] = getMapMouseOffsetRatio(
          event.pageX,
          event.pageY,
          containerRef.current,
          imageRef.current,
          mapOptions.current,
        );

        // Update current mouse coordinates and offset ratios
        mouseCoords.current = [event.pageX, event.pageY];
        mouseRatio.current = [mouseRatioX, mouseRatioY];

        // Update map coordinate component values
        coordsRef.current?.setCoords(mouseRatio.current);
      }

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
    (event: ReactTouchEvent<EventTarget>) => {
      // Fix for touch enabled devices reducing lag on drag start
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
    (event: TouchEvent) => {
      // Prevent application zooming in on mobile devices
      event.preventDefault();

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
   * Handle opening or closing an animal marker editor
   */
  const handleToggleAnimalEditor = useCallback(
    (marker: MarkerOptionsAnimal, visible: boolean, source: string) => {
      setEditedAnimal(visible ? marker : undefined);

      if (visible) {
        // Send custom Google Analytics event
        sendGoogleEvent('marker_edit', { id: marker.id, source });
      }
    },
    [],
  );

  /**
   * Toggle specified animal icon's need zones
   *
   * @param marker Animal marker to toggle
   * @param expanded TRUE if the need zones are visible, FALSE otherwise
   */
  const handleToggleAnimalZones = useCallback(
    (marker: MarkerOptionsAnimal) =>
      animalMarkerRefs.current.forEach(options => {
        // Detect if the current animal marker is the one being toggled
        const isCurrentAnimal = options.marker.id === marker.id;

        // Hide zones of all the other markers
        if (!isCurrentAnimal) {
          options.ref.current?.setZonesVisible(false);
        }
      }),
    [],
  );

  // List of custom markers to display on the map
  const renderedCustomMarkers = useMemo(
    () =>
      customMarkers.map(marker => (
        <HuntingMapMarker<MarkerOptionsCustom>
          className={styles.HuntingMapMarkerCustom}
          forceVisible={
            marker.type === 'marker:exploration'
              ? filterOptions.showExplorationMarkers
              : filterOptions.showTrackingMarkers
          }
          key={marker.id}
          marker={marker}
          markerSize={marker.type === 'marker:exploration' ? 35 : 20}
          onKeyDown={handleCustomMarkerKeyDown}
          onLongPress={onDeleteCustomMarker}
        />
      )),
    [
      customMarkers,
      filterOptions,
      handleCustomMarkerKeyDown,
      onDeleteCustomMarker,
    ],
  );

  // List of map habitat labels
  const renderedLabels = useMemo(
    () =>
      labels.map((label, index) => (
        <HuntingMapLabel
          {...label}
          key={index}
          mapScale={zoomOptions.current.zoomValue}
          maxMapScale={zoomLabelMax}
          minMapScale={zoomLabelMin}
          visible={filterOptions.showLabels}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterOptions, forcedUpdate, labels, zoomLabelMax, zoomLabelMin],
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
    // Clear current list of references before continuing
    animalMarkerRefs.current = [];

    // Build list of animal marker elements to render
    setAnimalMarkerElements(() =>
      animalMarkers.map(marker => {
        // Create component reference
        const ref = createRef<MarkerRefAnimal>();

        // Add reference to the list of animal marker references
        animalMarkerRefs.current.push({ marker, ref });

        return (
          <HuntingMapAnimalMemo
            key={marker.id}
            marker={marker}
            markerSize={markerSizeAnimal}
            markerSizeZone={markerSizeZone}
            markerTrophyRating={markerTrophyRating}
            ref={ref}
            onToggleEditor={handleToggleAnimalEditor}
            onToggleZones={handleToggleAnimalZones}
          />
        );
      }),
    );
  }, [
    animalMarkers,
    handleToggleAnimalEditor,
    handleToggleAnimalZones,
    markerSizeAnimal,
    markerSizeZone,
    setForcedUpdate,
    markerTrophyRating,
  ]);

  // Build a list of generic marker options
  useEffect(() => {
    // Clear current list of references before continuing
    genericMarkerRefs.current = [];

    // Build list of generic marker elements to render
    setGenericMarkerElements(() =>
      genericMarkers.map(marker => {
        // Create component reference
        const ref = createRef<MarkerRef>();

        // Add reference to the list of generic marker references
        genericMarkerRefs.current.push({ marker, ref });

        return (
          <HuntingMapMarkerMemo
            className={getGenericMarkerColorClass(
              marker,
              styles.HuntingMapMarkerGeneric,
              styles.HuntingMapMarkerLandmark,
              styles.HuntingMapMarkerLodge,
            )}
            key={marker.id}
            marker={marker}
            markerSize={markerSizeGeneric}
            ref={ref}
          />
        );
      }),
    );
  }, [genericMarkers, markerSizeGeneric]);

  // Update editor and need zone states when edited animal changes
  useEffect(() => {
    // Determine if editor is visible
    const editorVisible = !!editedAnimal;

    animalMarkerRefs.current.forEach(options => {
      // Detect if the current animal marker is the one being toggled
      const isCurrentAnimal = options.marker.id === editedAnimal?.id;

      // Disable editor and hide need zones for all the other markers
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
    [animalMarkerElements, animalMarkerRecords, handleUpdateAnimalData],
  );

  // Update marker visibility whenever any of function dependencies change
  useEffect(
    () => handleUpdateMarkerVisibility(),
    [animalMarkerElements, genericMarkerElements, handleUpdateMarkerVisibility],
  );

  // Ensure debug markers are always visible if there are any present
  useEffect(() => {
    animalMarkerRefs.current
      .filter(options => options.marker.meta?.debug)
      .forEach((options, index, list) => {
        // Update marker visibility once references are available
        setTimeout(() => {
          // Update marker and zone visibility
          options.ref.current?.setVisible(true);
          options.ref.current?.setZonesVisible(index === list.length - 1);
        }, 100);
      });

    // Force markers to be re-rendered
    setForcedUpdate();
  }, [animalMarkers, setForcedUpdate]);

  // Enable custom marker creation functionality and disable viewport zoom
  useEffect(() => {
    // Store container reference to ensure events are detached correctly
    const container = containerRef.current;

    container?.addEventListener('touchmove', handleContainerTouchMove, {
      passive: true,
    });
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      container?.removeEventListener('touchmove', handleContainerTouchMove);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [handleContainerTouchMove, handleDocumentKeyDown]);

  return (
    <>
      {!imageLoaded && <LoadingOverlay />}

      <HuntingMapToolbar
        onReset={handleMapReset}
        onZoomIn={handleMapZoomIn}
        onZoomOut={handleMapZoomOut}
      />

      <HuntingMapFilter
        animalMarkers={animalMarkers}
        genericMarkers={genericMarkers}
        options={filterOptions}
        onChange={setFilterOptions}
      />

      <AnimalEditor
        marker={editedAnimal}
        onClose={handleAnimalEditorClose}
        onDataClear={onClearAnimalMarker}
        onDataRead={onLoadAnimalMarker}
        onDataWrite={onUpdateAnimalMarker}
      />

      <div
        className={styles.HuntingMap}
        ref={containerRef}
        onDoubleClick={handleContainerDoubleClick}
        onMouseDown={handleContainerMouseDown}
        onMouseLeave={handleMapDragCancel}
        onMouseMove={handleContainerMouseMove}
        onMouseUp={handleContainerMouseUp}
        onTouchEnd={handleMapDragCancel}
        onTouchStart={handleContainerTouchStart}
        onWheel={handleContainerWheel}
      >
        <div className={styles.HuntingMapImageWrapper} ref={imageWrapperRef}>
          {animalMarkerElements}
          {genericMarkerElements}
          {renderedLabels}
          {renderedCustomMarkers}

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

        <HuntingMapCoords ref={coordsRef} />

        <HuntingMapScale
          imageScale={imageScale}
          imageWidth={imageWidth}
          mapWidth={mapOptions.current.mapWidth}
        />
      </div>
    </>
  );
};
