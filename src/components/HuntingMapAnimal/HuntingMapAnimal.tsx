import classnames from 'classnames';
import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { HuntingMapMarker } from 'components/HuntingMapMarker';
import { getMarkerKey } from 'lib/markers';
import { AnimalMarkerOptions, MarkerOptions } from 'types/markers';
import { HuntingMapAnimalProps } from './types';
import styles from './HuntingMapAnimal.module.css';

export const HuntingMapAnimal = (props: HuntingMapAnimalProps) => {
  const {
    activated = false,
    className,
    expanded = false,
    mapScale,
    marker,
    markerRangeMap,
    maxMarkerSize,
    style,
    visible = true,
    onActivate,
    onToggle,
  } = props;

  // Mouse coordinates that allow detecting if drag occurred while holding
  // mouse cursor over the animal trigger icon
  const pageCoords = useRef<[number, number]>([-1, -1]);

  // Reference to the trigger element (animal icon)
  const triggerRef = useRef<HTMLImageElement>(null);

  /**
   * Handle mouse down on the document
   */
  const handleDocumentMouseDown = useCallback(
    (event: MouseEvent) => (pageCoords.current = [event.pageX, event.pageY]),
    [],
  );

  /**
   * Handle clicking on the trigger icon
   */
  const handleTriggerClick = useCallback(
    (marker: MarkerOptions, event: ReactMouseEvent<EventTarget>) => {
      // Ignore clicks on activated animals
      if (activated) {
        // Deactivate animal if it's currently active
        if (event.shiftKey) {
          onActivate(undefined);
        }
        return;
      }

      const [mouseDownX, mouseDownY] = pageCoords.current;
      const { pageX: mouseUpX, pageY: mouseUpY } = event;

      // Cancel trigger click if mouse up coordinates aren't the same as down
      if (mouseUpX !== mouseDownX || mouseUpY !== mouseDownY) {
        event.stopPropagation();
        return;
      }

      // Toggle need zone visibility
      onToggle(marker as AnimalMarkerOptions, !expanded);

      // Activate animal if Shift key is held down while clicking on it
      if (event.shiftKey) {
        onActivate(marker as AnimalMarkerOptions);
      }
    },
    [activated, pageCoords, onToggle, expanded, onActivate],
  );

  /**
   * Handle long-pressing on the icon to open the editor
   */
  const handleTriggerLongPress = useCallback(
    () => (activated ? onActivate(undefined) : onActivate(marker)),
    [activated, marker, onActivate],
  );

  /**
   * Render need zones
   *
   * @param markers List of need zone markers to render
   */
  const renderZones = useCallback(
    (markers: Array<MarkerOptions>) => (
      <>
        {markers.map(marker => (
          <HuntingMapMarker
            key={getMarkerKey(marker)}
            mapScale={mapScale}
            marker={marker}
            markerRangeMap={markerRangeMap}
            maxMarkerSize={maxMarkerSize * 1.2}
            visible={activated || (visible && expanded)}
          />
        ))}
      </>
    ),
    [mapScale, markerRangeMap, maxMarkerSize, visible, expanded, activated],
  );

  // Drink need zones
  const drinkZones = useMemo(
    () => renderZones(marker.drink),
    [marker.drink, renderZones],
  );

  // Eat need zones
  const eatZones = useMemo(
    () => renderZones(marker.eat),
    [marker.eat, renderZones],
  );

  // Sleep need zones
  const sleepZones = useMemo(
    () => renderZones(marker.sleep),
    [marker.sleep, renderZones],
  );

  // Main animal icon
  const trigger = useMemo(
    () => (
      <HuntingMapMarker
        className={classnames(
          styles.HuntingMapAnimal,
          {
            [styles.HuntingMapAnimalActive]: expanded,
          },
          className,
        )}
        highlighted={activated || expanded}
        mapScale={mapScale}
        marker={marker}
        markerRangeMap={markerRangeMap}
        maxMarkerSize={70}
        ref={triggerRef}
        style={style}
        visible={visible}
        onClick={handleTriggerClick}
        onLongPress={handleTriggerLongPress}
      />
    ),
    [
      activated,
      className,
      expanded,
      handleTriggerClick,
      handleTriggerLongPress,
      mapScale,
      marker,
      markerRangeMap,
      style,
      visible,
    ],
  );

  // Hide need zone icons when current animal type is removed through filters
  useEffect(() => {
    if (!visible) {
      onToggle(marker, false);
    }
  }, [marker, onToggle, visible]);

  // Monitor clicks outside the current marker and hide zones when needed
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
    };
  }, [handleDocumentMouseDown]);

  return (
    <>
      {trigger}
      {drinkZones}
      {eatZones}
      {sleepZones}
    </>
  );
};
