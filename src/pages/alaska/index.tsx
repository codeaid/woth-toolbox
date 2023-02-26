import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DebugPanel } from 'components/DebugPanel';
import { HuntingMap } from 'components/HuntingMap';
import { genericMarkers, mapHeight, mapLabels, mapWidth } from 'config/alaska';
import { basePath } from 'config/app';
import { markerVisibilityMap } from 'config/markers';
import {
  useCustomMarkers,
  useDebugPanel,
  useSettings,
  useTranslator,
  useTutorial,
} from 'hooks';

const AlaskaPage = () => {
  const { query } = useRouter();
  const { debug } = query;

  // Retrieve custom marker map switcher
  const { onSetCurrentMap } = useCustomMarkers();

  // Render map tutorial dialog
  const { component: tutorial } = useTutorial(true);

  // Retrieve application settings
  const { settings } = useSettings();

  // Retrieve application translator
  const translate = useTranslator();

  // Enable and disable custom marker functionality on mount and unmount
  useEffect(() => {
    onSetCurrentMap('alaska');
    return () => onSetCurrentMap();
  }, [onSetCurrentMap]);

  // Enable debug functionality
  const {
    currentDebugMarker,
    debugMarkersWithCurrent,
    onDebugMarkerDelete,
    debugMarkers,
    onDebugCoordinates,
    onDebugCopy,
    onDebugDrinkZoneRemove,
    onDebugEatZoneRemove,
    onDebugSleepZoneRemove,
    onDebugSettingsChange,
    onDebugClear,
  } = useDebugPanel();

  return (
    <>
      <Head>
        <title>
          {`${translate('POI:MAP_NAME_IDAHO')} - ${translate('UI:GAME_TITLE')}`}
        </title>
      </Head>

      <HuntingMap
        animalMarkers={debugMarkersWithCurrent}
        imageHeight={mapHeight}
        imageScale={2}
        imageSrc={`${basePath}/img/maps/alaska.jpeg`}
        imageWidth={mapWidth}
        genericMarkers={genericMarkers}
        labels={mapLabels}
        markerSizeAnimal={settings.animalMarkerSize}
        markerSizeGeneric={settings.genericMarkerSize}
        markerSizeZone={settings.zoneMarkerSize}
        markerTrophyRating={settings.animalMarkerRatings}
        zoomMarkerMap={markerVisibilityMap}
        onClick={onDebugCoordinates}
      />

      <DebugPanel
        currentMarker={currentDebugMarker}
        enabled={!!debug}
        markers={debugMarkers}
        onClear={onDebugClear}
        onCopy={onDebugCopy}
        onDrinkZoneRemove={onDebugDrinkZoneRemove}
        onEatZoneRemove={onDebugEatZoneRemove}
        onMarkerDelete={onDebugMarkerDelete}
        onSettingsChange={onDebugSettingsChange}
        onSleepZoneRemove={onDebugSleepZoneRemove}
      />

      {createPortal(tutorial, document.body)}
    </>
  );
};

export default AlaskaPage;
