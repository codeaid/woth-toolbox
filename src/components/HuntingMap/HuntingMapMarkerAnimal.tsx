import classnames from 'classnames';
import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { HuntingMapMarker } from 'components/HuntingMapMarker';
import { getMarkerKey } from 'lib/markers';
import { MarkerOptions } from 'types/markers';
import { HuntingMapMarkerAnimalProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarkerAnimal = (props: HuntingMapMarkerAnimalProps) => {
  const {
    mapScale,
    marker,
    markerRangeMap,
    maxMarkerSize,
    selectedFilterTypes,
    visible = true,
  } = props;

  // Mouse coordinates that allow detecting if drag occurred while holding
  // mouse cursor over the animal trigger icon
  const [pageCoords, setPageCoords] = useState<[number, number]>([-1, -1]);

  // Flag indicating whether the need zone icons are visible or not
  const [zonesVisible, setZonesVisible] = useState(false);

  // Reference to the trigger element (animal icon)
  const triggerRef = useRef<HTMLImageElement>(null);

  /**
   * Handle clicking on the trigger icon
   */
  const handleDocumentClick = useCallback((event: MouseEvent) => {
    // Hide need zones if clicking on another animal icon
    if (
      (event.target as HTMLElement).classList.contains(
        styles.HuntingMapMarkerAnimal,
      ) &&
      event.target !== triggerRef.current
    ) {
      setZonesVisible(false);
    }
  }, []);

  /**
   * Handle mouse down on the document
   */
  const handleDocumentMouseDown = useCallback((event: MouseEvent) => {
    setPageCoords([event.pageX, event.pageY]);
  }, []);

  /**
   * Handle clicking on the trigger icon
   */
  const handleTriggerClick = useCallback(
    (marker: MarkerOptions, event: ReactMouseEvent<EventTarget>) => {
      const [mouseDownX, mouseDownY] = pageCoords;
      const { pageX: mouseUpX, pageY: mouseUpY } = event;

      // Cancel trigger click if mouse up coordinates aren't the same as down
      if (mouseUpX !== mouseDownX || mouseUpY !== mouseDownY) {
        event.stopPropagation();
        return;
      }

      setZonesVisible(current => !current);
    },
    [pageCoords],
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
            selectedFilterTypes={selectedFilterTypes}
            visible={visible && zonesVisible}
          />
        ))}
      </>
    ),
    [
      mapScale,
      markerRangeMap,
      maxMarkerSize,
      selectedFilterTypes,
      visible,
      zonesVisible,
    ],
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
        className={classnames(styles.HuntingMapMarkerAnimal, {
          [styles.HuntingMapMarkerAnimalActive]: zonesVisible,
        })}
        highlighted={zonesVisible}
        mapScale={mapScale}
        marker={marker}
        markerRangeMap={markerRangeMap}
        maxMarkerSize={70}
        ref={triggerRef}
        selectedFilterTypes={selectedFilterTypes}
        visible={visible}
        onClick={handleTriggerClick}
      />
    ),
    [
      handleTriggerClick,
      mapScale,
      marker,
      markerRangeMap,
      selectedFilterTypes,
      visible,
      zonesVisible,
    ],
  );

  // Hide need zone icons when current animal type is removed through filters
  useEffect(() => {
    if (!visible) {
      setZonesVisible(false);
    }
  }, [visible]);

  // Monitor clicks outside the current marker and hide zones when needed
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('mousedown', handleDocumentMouseDown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('mousedown', handleDocumentMouseDown);
    };
  }, [handleDocumentClick, handleDocumentMouseDown]);

  return (
    <>
      {trigger}
      {drinkZones}
      {eatZones}
      {sleepZones}
    </>
  );
};
