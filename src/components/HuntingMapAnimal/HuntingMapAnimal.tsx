import classnames from 'classnames';
import {
  createRef,
  ForwardedRef,
  forwardRef,
  MouseEvent as ReactMouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { HuntingMapMarker } from 'components/HuntingMapMarker';
import { getMarkerKey } from 'lib/markers';
import { MapMarkerRef, MapOptions } from 'types/cartography';
import {
  AnimalMarkerData,
  AnimalMarkerOptions,
  MarkerOptions,
} from 'types/markers';
import { HuntingMapAnimalProps, HuntingMapAnimalRef } from './types';
import styles from './HuntingMapAnimal.module.css';

export const HuntingMapAnimal = forwardRef(
  (props: HuntingMapAnimalProps, ref: ForwardedRef<HuntingMapAnimalRef>) => {
    const {
      className,
      marker,
      size,
      style,
      zoneSize = 45,
      onToggleEditor,
      onToggleZones,
    } = props;

    // Reference to trigger's marker component
    const [markerRef, setMarkerRef] = useState<Nullable<MapMarkerRef>>(null);

    // Reference to the most up-to-date map options
    const currentMapOptions = useRef<MapOptions>();

    // Mouse coordinates that allow detecting if drag occurred while holding
    // mouse cursor over the animal trigger icon
    const pageCoords = useRef<[number, number]>([-1, -1]);

    // References to all need zone icons
    const zoneRefs = useRef<Array<RefObject<MapMarkerRef>>>([]);

    // Custom data associated with the marker
    const [data, setData] = useState<AnimalMarkerData>();

    // Flag indicating if the marker editor is currently active
    const [editorActive, setEditorActive] = useState(false);

    // Flag indicating if the need zones are visible or not
    const [zonesVisible, setZonesVisible] = useState(false);

    // Custom marker color if data has one specified
    const color = useMemo(() => {
      // Revert to default colors if there is no data available or marker is
      // currently expanded (activated) to show zones
      if (!data || !data.color || zonesVisible) {
        return;
      }

      return data.color;
    }, [data, zonesVisible]);

    /**
     * Handle mouse down on the document
     */
    const handleDocumentMouseDown = useCallback(
      (event: MouseEvent) => (pageCoords.current = [event.pageX, event.pageY]),
      [],
    );

    /**
     * Update trigger and zone visibility based on map's filter status
     */
    const handleSetHidden = useCallback(
      (hidden: boolean) => {
        // Update trigger marker's visibility
        markerRef?.setHidden(hidden);

        // Hide need zones if trigger gets hidden
        if (hidden) {
          setZonesVisible(false);
        }
      },
      [markerRef],
    );

    /**
     * Update trigger and zone visibility based on map's filter and zoom status
     */
    const handleSetVisible = useCallback(
      (visible: boolean) => {
        // Update trigger marker's visibility
        markerRef?.setVisible(visible);

        // Hide need zones and editor if animal marker is removed
        if (!visible) {
          setZonesVisible(false);
          onToggleEditor(marker, false);
        }
      },
      [marker, markerRef, onToggleEditor],
    );

    /**
     * Handle clicking on the trigger icon
     *
     * @param marker Marker options
     * @param event Mouse event object
     */
    const handleTriggerClick = useCallback(
      (marker: MarkerOptions, event: ReactMouseEvent<EventTarget>) => {
        const [mouseDownX, mouseDownY] = pageCoords.current;
        const { pageX: mouseUpX, pageY: mouseUpY } = event;

        // Cancel trigger click if mouse up coordinates aren't the same as down
        if (mouseUpX !== mouseDownX || mouseUpY !== mouseDownY) {
          event.stopPropagation();
          return;
        }

        // Single click occurred, ignore editor functionality
        if (!event.shiftKey) {
          // Ignore clicks if current animal is being edited
          if (editorActive) {
            return;
          }

          // Toggle visibility of need zone icons
          setZonesVisible(!zonesVisible);

          // Don't notify marker manager about this animal marker being expanded
          // if Ctrl key is being held down during the click. This allows having
          // multiple markers expanded simultaneously.
          if (!event.ctrlKey && !event.metaKey) {
            // Notify marker manager about need zone visibility change
            onToggleZones(marker as AnimalMarkerOptions);
          }
        }

        // Activate marker editor if Shift key was held down during the click
        if (event.shiftKey) {
          // Notify marker manager about this marker being edited
          onToggleEditor(marker as AnimalMarkerOptions, !editorActive);
        }
      },
      [editorActive, onToggleEditor, onToggleZones, zonesVisible],
    );

    /**
     * Handle long-pressing on the icon to open the editor
     */
    const handleTriggerLongPress = useCallback(
      () => onToggleEditor(marker, true),
      [marker, onToggleEditor],
    );

    /**
     * Update positions of all need zone markers using the latest map options
     */
    const handleUpdateZonePositions = useCallback(() => {
      // Ensure zones are currently visible and map options are available
      const mapOptions = currentMapOptions.current;
      if (!zonesVisible || !mapOptions) {
        return;
      }

      // Update each zone's position when they appear
      zoneRefs.current.forEach(ref => ref.current?.updatePosition(mapOptions));
    }, [zonesVisible]);

    /**
     * Handle updating marker's position in relation to the container
     *
     * @param mapOptions Source map options
     */
    const handleUpdatePositions = useCallback(
      (mapOptions: MapOptions) => {
        // Store map options so that need zone markers can be positions when
        // they appear
        currentMapOptions.current = mapOptions;

        // Invoke trigger and zone marker position changes
        markerRef?.updatePosition(mapOptions);
        handleUpdateZonePositions();
      },
      [handleUpdateZonePositions, markerRef],
    );

    // Render need zones
    const renderedNeedZoneIcons = useMemo(
      () =>
        [marker.drink, marker.eat, marker.sleep]
          .flat()
          .map((marker: MarkerOptions) => {
            // Create a reference to each need zone icon
            const ref = createRef<MapMarkerRef>();
            zoneRefs.current.push(ref);

            return (
              <HuntingMapMarker
                forceVisible={zonesVisible}
                key={marker.id ?? getMarkerKey(marker)}
                marker={marker}
                mountOnEnter={true}
                ref={ref}
                size={zoneSize}
                style={{ zIndex: 2 }}
                unmountOnExit={true}
              />
            );
          }),
      [marker.drink, marker.eat, marker.sleep, zoneSize, zonesVisible],
    );

    // Expose control functions of the main trigger component as well as
    // functionality to change zone visibility externally
    useImperativeHandle<HuntingMapAnimalRef, HuntingMapAnimalRef>(ref, () => ({
      setData,
      setEditorActive,
      setHidden: handleSetHidden,
      setVisible: handleSetVisible,
      setZonesVisible,
      updatePosition: handleUpdatePositions,
    }));

    // Update zone positions when they are shown
    useEffect(() => {
      if (zonesVisible) {
        handleUpdateZonePositions();
      }
    }, [handleUpdateZonePositions, zonesVisible]);

    // Clear references to zone markers once they get removed
    useEffect(() => {
      if (!zonesVisible) {
        zoneRefs.current = [];
      }
    }, [zonesVisible]);

    // Monitor clicks outside the current marker and hide zones when needed
    useEffect(() => {
      document.addEventListener('mousedown', handleDocumentMouseDown);

      return () => {
        document.removeEventListener('mousedown', handleDocumentMouseDown);
      };
    }, [handleDocumentMouseDown]);

    return (
      <>
        <HuntingMapMarker
          className={classnames(
            styles.HuntingMapAnimal,
            {
              [styles.HuntingMapAnimalActive]: zonesVisible,
              [styles.HuntingMapAnimalEdited]: !!data,
            },
            className,
          )}
          highlighted={editorActive || zonesVisible}
          marker={marker}
          ref={setMarkerRef}
          size={size}
          style={{
            ...style,
            color,
          }}
          onClick={handleTriggerClick}
          onLongPress={handleTriggerLongPress}
        />
        {renderedNeedZoneIcons}
      </>
    );
  },
);

HuntingMapAnimal.displayName = 'HuntingMapAnimal';
