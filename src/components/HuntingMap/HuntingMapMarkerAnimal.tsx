import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getMarkerKey } from 'lib/markers';
import { MarkerOptions } from 'types/markers';
import { HuntingMapMarkerGeneric } from './HuntingMapMarkerGeneric';
import { HuntingMapMarkerAnimalProps } from './types';
import styles from './HuntingMapMarker.module.css';

export const HuntingMapMarkerAnimal = (props: HuntingMapMarkerAnimalProps) => {
  const { mapScale, marker, markerVisibilityMap, maxMarkerSize } = props;

  // Flag indicating whether the need zone icons are visible or not
  const [zonesVisible, setZonesVisible] = useState(false);

  // Reference to the trigger element (animal icon)
  const triggerRef = useRef<HTMLImageElement>(null);

  /**
   * Handle clicking on the trigger icon
   */
  const handleDocumentClick = useCallback((event: MouseEvent) => {
    // Ignore clicks on the trigger element
    if (event.target === triggerRef.current) {
      return;
    }

    setZonesVisible(false);
  }, []);

  /**
   * Handle clicking on the trigger icon
   */
  const handleTriggerClick = useCallback(
    () => setZonesVisible(current => !current),
    [],
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
          <HuntingMapMarkerGeneric
            key={getMarkerKey(marker)}
            mapScale={mapScale}
            marker={marker}
            markerVisibilityMap={markerVisibilityMap}
            maxMarkerSize={maxMarkerSize * 1.2}
            visible={zonesVisible}
          />
        ))}
      </>
    ),
    [mapScale, markerVisibilityMap, maxMarkerSize, zonesVisible],
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
      <HuntingMapMarkerGeneric
        className={styles.HuntingMapMarkerAnimal}
        mapScale={mapScale}
        marker={marker}
        markerVisibilityMap={markerVisibilityMap}
        maxMarkerSize={70}
        ref={triggerRef}
        onClick={handleTriggerClick}
      />
    ),
    [handleTriggerClick, mapScale, marker, markerVisibilityMap],
  );

  // Monitor clicks outside the current marker and hide zones when needed
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <>
      {trigger}
      {drinkZones}
      {eatZones}
      {sleepZones}
    </>
  );
};
