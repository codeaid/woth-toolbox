import {
  createRef,
  memo,
  MouseEvent,
  ReactElement,
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
  HuntingMapAnimalProps,
} from 'components/HuntingMapAnimal';
import {
  HuntingMapCoords,
  HuntingMapCoordsRef,
} from 'components/HuntingMapCoords';
import { HuntingMapFilter } from 'components/HuntingMapFilter';
import { HuntingMapLabel } from 'components/HuntingMapLabel';
import {
  HuntingMapMarker,
  HuntingMapMarkerProps,
} from 'components/HuntingMapMarker';
import { HuntingMapScale } from 'components/HuntingMapScale';
import { HuntingMapToolbar } from 'components/HuntingMapToolbar';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { useForceUpdate } from 'hooks';
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
  isHighlightedMarker,
  updateMarkerVisibility,
} from 'lib/markers';
import { roundNumber } from 'lib/utils';
import {
  MapFilterOptions,
  MapOptions,
  MapZoomOptions,
} from 'types/cartography';
import { Point } from 'types/generic';
import {
  MarkerOptionsAnimal,
  MarkerOptionsCustom,
  MarkerOptionsGeneric,
  MarkerRef,
  MarkerRefAnimal,
  MarkerReferenceAnimal,
  MarkerReferenceGeneric,
} from 'types/markers';
import { HuntingMapDragOptions, HuntingMapProps } from './types';
import styles from './HuntingMap.module.css';

const HuntingMapAnimalMemo = memo(HuntingMapAnimal);
const HuntingMapMarkerMemo = memo(HuntingMapMarker);

export const HuntingMap = (props: HuntingMapProps) => {
  const {
    animalMarkerRecords,
    animalMarkers,
    customMarkers = [],
    defaultZoomValue = 0.25,
    genericMarkers,
    imageHeight,
    imageSrc,
    imageWidth,
    labels = [],
    mapBoundary = 100,
    markerSizeAnimal = 50,
    markerSizeGeneric = 40,
    markerSizeZone = 35,
    zoomLabelMax = 0.549,
    zoomLabelMin = 0.2,
    zoomMarkerMap = new Map(),
    zoomMax = 5,
    zoomMin = 0.1,
    zoomSpeed = 1,
    zoomStep = 0.05,
    onClick,
    onCustomMarkerCreate,
    onCustomMarkerRemove,
    onCustomMarkersClear,
    onEditorClear,
    onEditorRead,
    onEditorWrite,
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

  // Flag indicating whether left mouse button is being held down
  const isMouseDown = useRef(false);

  // Lists of animal and generic marker elements to render
  const [animalMarkerElements, setAnimalMarkerElements] =
    useState<Array<ReactElement<HuntingMapAnimalProps>>>();
  const [genericMarkerElements, setGenericMarkerElements] =
    useState<
      Array<ReactElement<HuntingMapMarkerProps<MarkerOptionsGeneric>>>
    >();

  // Lists of marker options to be rendered on the page
  const animalMarkerRefs = useRef<Array<MarkerReferenceAnimal>>([]);
  const genericMarkerRefs = useRef<Array<MarkerReferenceGeneric>>([]);

  // The currently selected filters
  const filterOptions = useRef<MapFilterOptions>({
    types: [],
  });

  // Store current mouse cursor coordinates and offset ratio
  const mouseCoords = useRef<Point>([-1, -1]);
  const mouseRatio = useRef<Point>([-1, -1]);

  // Variable tracking whether mouse was moved between mousedown and mouseup
  const mouseMoved = useRef(false);

  // Animal marker that is currently being edited
  const [editedAnimal, setEditedAnimal] = useState<MarkerOptionsAnimal>();

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
   * Handle removing tracking or exploration markers
   *
   * @param marker Target marker to remove
   * @param event Source keyboard event
   */
  const handleCustomMarkerKeyDown = useCallback(
    (marker: MarkerOptionsCustom, event: KeyboardEvent) => {
      // Standardize keyboard key value and retrieve marker type
      const key = event.key.toLowerCase();

      // Determine if the marker under the mouse cursor should be removed
      const removeCurrentMarker =
        key === ' ' || (key === 'f' && marker.type === 'marker:exploration');

      // Remove marker under the mouse cursor
      if (removeCurrentMarker && onCustomMarkerRemove) {
        return onCustomMarkerRemove(marker);
      }

      // Determine if all tracking markers should be removed
      const removeTrackingMarkers =
        key === 't' && marker.type === 'marker:tracking';

      // Remove all tracking markers
      if (removeTrackingMarkers && onCustomMarkersClear) {
        return onCustomMarkersClear('marker:tracking');
      }
    },
    [onCustomMarkerRemove, onCustomMarkersClear],
  );

  /**
   * Handle global key presses
   */
  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ensure custom marker creator is enabled
      if (!onCustomMarkerCreate) {
        return;
      }

      // Standardize the key value
      const key = event.key.toLowerCase();

      if (key === 'f') {
        // Create a new exploration marker
        onCustomMarkerCreate('marker:exploration', mouseRatio.current);
      } else if (key === 'c') {
        // Create a new tracking marker
        onCustomMarkerCreate('marker:tracking', mouseRatio.current);
      }
    },
    [onCustomMarkerCreate],
  );

  /**
   * Update all animal markers with custom data entries when they change
   */
  const handleUpdateAnimalData = useCallback(() => {
    animalMarkerRefs.current.forEach(options => {
      const { marker, ref } = options;

      // Set data associated with the current animal marker
      const data = animalMarkerRecords[marker.id];
      ref.current?.setData(data);
    });
  }, [animalMarkerRecords]);

  /**
   * Handle updating marker visibility based on current filters and zoom
   */
  const handleUpdateMarkerVisibility = useCallback(
    (customZoomOptions?: MapZoomOptions) =>
      updateMarkerVisibility(
        filterOptions.current,
        customZoomOptions ?? zoomOptions.current,
        zoomMarkerMap,
        animalMarkerRefs.current,
        genericMarkerRefs.current,
      ),
    [zoomMarkerMap],
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
    handleMapUpdate(
      () =>
        requestAnimationFrame(() => {
          handleUpdateMarkerVisibility();
          handleUpdateAnimalData();
        }),
      setForcedUpdate,
    );
  }, [
    defaultZoomValue,
    handleMapUpdate,
    handleUpdateAnimalData,
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
        coordsRef.current?.setCoords(mouseCoords.current);
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
    (event: TouchEvent<EventTarget>) => {
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
    (options: MapFilterOptions) => {
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
    (marker: MarkerOptionsAnimal, visible: boolean) =>
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
          forceVisible={true}
          key={marker.id}
          marker={marker}
          markerSize={marker.type === 'marker:exploration' ? 35 : 20}
          onKeyDown={handleCustomMarkerKeyDown}
          onLongPress={onCustomMarkerRemove}
        />
      )),
    [customMarkers, handleCustomMarkerKeyDown, onCustomMarkerRemove],
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
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forcedUpdate, labels, zoomLabelMax, zoomLabelMin],
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
            activated={false}
            key={marker.id}
            marker={marker}
            ref={ref}
            markerSize={markerSizeAnimal}
            markerSizeZone={markerSizeZone}
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
            highlighted={isHighlightedMarker(marker)}
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
    [animalMarkerRecords, handleUpdateAnimalData],
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

  // Enable custom marker creation functionality
  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => document.removeEventListener('keydown', handleDocumentKeyDown);
  }, [handleDocumentKeyDown]);

  return (
    <>
      {!imageLoaded && <LoadingOverlay />}

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
          imageWidth={imageWidth}
          mapWidth={mapOptions.current.mapWidth}
          metersPerPixel={3}
        />
      </div>
    </>
  );
};
