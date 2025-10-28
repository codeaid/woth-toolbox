'use client';


import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimalEditor } from 'components/AnimalEditor';
import type { HuntingMapProps } from 'components/HuntingMap';
import { HuntingMap } from 'components/HuntingMap';
import { basePath } from 'config/app';
import { markerVisibilityMap } from 'config/markers';
import {
  useAnimalMarkers,
  useCustomMarkers,
  useHuntingMapType,
  useSettings,
  useTranslator,
  useTutorial,
} from 'hooks';
import type { AnimalMarker } from 'types/markers';
import type { HuntingMapPageProps } from './types';

export const HuntingMapPage = (props: HuntingMapPageProps) => {
  const {
    animalMarkers,
    genericMarkers,
    mapHeight = 4096,
    mapId,
    mapImageSrc,
    mapLabels,
    mapWidth = 4096,
    titleKey,
  } = props;

  // Retrieve animal marker helpers
  const {
    recordMap: animalRecordMap,
    onCreateRecordAsync: onCreateAnimalMarkerRecord,
    onDeleteRecordAsync: onDeleteAnimalMarkerRecord,
    onReadRecord: onReadAnimalMarkerRecord,
    onUpdateRecordAsync: onUpdateAnimalMarkerRecord,
  } = useAnimalMarkers(mapId);

  const {
    markers: customMarkers,
    onClearTrackingMarkersAsync,
    onCreateCustomMarkerAsync,
    onDeleteCustomMarkerAsync,
  } = useCustomMarkers(mapId);

  // Retrieve map context switcher
  const { onSetMapType } = useHuntingMapType();

  // Retrieve map dependencies
  const { onSettingsRead } = useSettings();
  const translate = useTranslator();
  const { component: tutorial } = useTutorial(true);

  // Animal marker that is currently being edited
  const [pendingMarker, setPendingMarker] = useState<AnimalMarker>();

  // Find animal marker record for the currently edited marker
  const record = useMemo(
    () =>
      pendingMarker ? onReadAnimalMarkerRecord(pendingMarker.id) : undefined,
    [pendingMarker, onReadAnimalMarkerRecord],
  );

  const settings = useMemo<
    Pick<
      HuntingMapProps,
      | 'markerSizeAnimal'
      | 'markerSizeGeneric'
      | 'markerSizeZone'
      | 'markerTrophyRating'
    >
  >(
    () => ({
      markerSizeAnimal: onSettingsRead('marker:animal:size', 40),
      markerSizeGeneric: onSettingsRead('marker:generic:size', 50),
      markerSizeZone: onSettingsRead('marker:zone:size', 35),
      markerTrophyRating: onSettingsRead('marker:animal:ratings', true),
    }),
    [onSettingsRead],
  );

  /**
   * Clear currently active animal
   */
  const handleAnimalEditorClose = useCallback(
    () => setPendingMarker(undefined),
    [],
  );

  // Toggle currently active map type on page load and unload
  useEffect(() => {
    onSetMapType(mapId);
    return () => onSetMapType();
  }, [mapId, onSetMapType]);

  return (
  <>
      <HuntingMap
        {...settings}
        animalMarkers={animalMarkers}
        animalRecordMap={animalRecordMap}
        customMarkers={customMarkers}
        editedAnimal={pendingMarker}
        genericMarkers={genericMarkers}
        imageHeight={mapHeight}
        imageSrc={basePath + mapImageSrc}
        imageWidth={mapWidth}
        labels={mapLabels}
        zoomMarkerMap={markerVisibilityMap}
        onClearTrackingMarkers={onClearTrackingMarkersAsync}
        onCreateCustomMarker={onCreateCustomMarkerAsync}
        onDeleteCustomMarker={onDeleteCustomMarkerAsync}
        onEditAnimalMarker={setPendingMarker}
      />

      <AnimalEditor
        marker={pendingMarker}
        record={record}
        onClose={handleAnimalEditorClose}
        onCreateRecordAsync={onCreateAnimalMarkerRecord}
        onDeleteRecordAsync={onDeleteAnimalMarkerRecord}
        onUpdateRecordAsync={onUpdateAnimalMarkerRecord}
      />

      {tutorial}
    </>
  );
};
