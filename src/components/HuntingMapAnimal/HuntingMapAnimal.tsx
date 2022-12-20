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
import { useTranslator } from 'hooks';
import { getAnimalTypeKey, getAnimalZoneKey } from 'lib/i18n';
import {
  MarkerOptionsAnimal,
  MarkerOptionsZone,
  MarkerRef,
  MarkerRefAnimal,
  MarkerStorageRecordAnimal,
} from 'types/markers';
import { HuntingMapAnimalProps } from './types';
import styles from './HuntingMapAnimal.module.css';

export const HuntingMapAnimal = forwardRef(
  (props: HuntingMapAnimalProps, ref: ForwardedRef<MarkerRefAnimal>) => {
    const {
      className,
      marker,
      markerSize,
      markerSizeZone = 45,
      onToggleEditor,
      onToggleZones,
      style,
    } = props;

    // Reference to trigger's marker component
    const [markerRef, setMarkerRef] = useState<Nullable<MarkerRef>>(null);

    // Mouse coordinates that allow detecting if drag occurred while holding
    // mouse cursor over the animal trigger icon
    const pageCoords = useRef<[number, number]>([-1, -1]);

    // References to all need zone icons
    const zoneRefs = useRef<Array<RefObject<MarkerRef>>>([]);

    // Custom data associated with the marker
    const [data, setData] = useState<MarkerStorageRecordAnimal>();

    // Flag indicating if the marker editor is currently active
    const [editorActive, setEditorActive] = useState(false);

    // Flag indicating if the need zones are visible or not
    const [zonesVisible, setZonesVisible] = useState(false);

    // Retrieve application translator
    const translate = useTranslator();

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
      (marker: MarkerOptionsAnimal, event: ReactMouseEvent<EventTarget>) => {
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
            onToggleZones(marker);
          }
        }

        // Activate marker editor if Shift key was held down during the click
        if (event.shiftKey) {
          // Notify marker manager about this marker being edited
          onToggleEditor(marker, !editorActive);
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

    // Render need zones
    const renderedNeedZoneIcons = useMemo(
      () =>
        [marker.drink, marker.eat, marker.sleep]
          .flat()
          .map((zone: MarkerOptionsZone) => {
            // Create a reference to each need zone icon
            const ref = createRef<MarkerRef>();
            zoneRefs.current.push(ref);

            // Get animal and need zone names
            const animalName = translate(
              getAnimalTypeKey(marker.type),
            ).toLocaleUpperCase();
            const zoneName = translate(
              getAnimalZoneKey(zone.type),
            ).toLocaleUpperCase();

            return (
              <HuntingMapMarker
                className={styles.HuntingMapAnimalZone}
                forceVisible={zonesVisible}
                key={zone.id}
                marker={zone}
                mountOnEnter={true}
                ref={ref}
                markerSize={markerSizeZone}
                title={`${animalName} : ${zoneName}`}
                unmountOnExit={true}
              />
            );
          }),
      [
        marker.drink,
        marker.eat,
        marker.sleep,
        marker.type,
        markerSizeZone,
        translate,
        zonesVisible,
      ],
    );

    // Expose control functions of the main trigger component as well as
    // functionality to change zone visibility externally
    useImperativeHandle<MarkerRefAnimal, MarkerRefAnimal>(ref, () => ({
      setData,
      setEditorActive,
      setHidden: handleSetHidden,
      setVisible: handleSetVisible,
      setZonesVisible,
    }));

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
        <HuntingMapMarker<MarkerOptionsAnimal>
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
          markerSize={markerSize}
          style={{ ...style, color }}
          onClick={handleTriggerClick}
          onLongPress={handleTriggerLongPress}
        />
        {renderedNeedZoneIcons}
      </>
    );
  },
);

HuntingMapAnimal.displayName = 'HuntingMapAnimal';
