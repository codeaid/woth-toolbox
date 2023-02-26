import Head from 'next/head';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HuntingMap } from 'components/HuntingMap';
import { basePath } from 'config/app';
import {
  animalMarkers,
  genericMarkers,
  mapHeight,
  mapLabels,
  mapWidth,
} from 'config/idaho';
import { markerVisibilityMap } from 'config/markers';
import {
  useCustomMarkers,
  useSettings,
  useTranslator,
  useTutorial,
} from 'hooks';

const NezPerceValleyPage = () => {
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
    onSetCurrentMap('idaho');
    return () => onSetCurrentMap();
  }, [onSetCurrentMap]);

  return (
    <>
      <Head>
        <title>
          {`${translate('POI:MAP_NAME_IDAHO')} - ${translate('UI:GAME_TITLE')}`}
        </title>
      </Head>

      <HuntingMap
        animalMarkers={animalMarkers}
        imageHeight={mapHeight}
        imageSrc={`${basePath}/img/maps/nez_perce.jpeg`}
        imageWidth={mapWidth}
        genericMarkers={genericMarkers}
        labels={mapLabels}
        markerSizeAnimal={settings.animalMarkerSize}
        markerSizeGeneric={settings.genericMarkerSize}
        markerSizeZone={settings.zoneMarkerSize}
        markerTrophyRating={settings.animalMarkerRatings}
        zoomMarkerMap={markerVisibilityMap}
      />

      {createPortal(tutorial, document.body)}
    </>
  );
};

export default NezPerceValleyPage;
