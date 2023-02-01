import Head from 'next/head';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HuntingMap } from 'components/HuntingMap';
import { basePath } from 'config/app';
import { markerVisibilityMap } from 'config/markers';
import {
  useCustomMarkers,
  useTutorial,
  useSettings,
  useTranslator,
} from 'hooks';
import { mapHeight, mapLabels, mapWidth } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const TransylvaniaPage = () => {
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
    onSetCurrentMap('transylvania');
    return () => onSetCurrentMap();
  }, [onSetCurrentMap]);

  return (
    <>
      <Head>
        <title>
          {`${translate('POI:MAP_NAME_TRANSYLVANIA')} - ${translate(
            'UI:GAME_TITLE',
          )}`}
        </title>
      </Head>

      <HuntingMap
        animalMarkers={animalMarkers}
        imageHeight={mapHeight}
        imageSrc={`${basePath}/img/maps/transylvania.jpeg`}
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

export default TransylvaniaPage;
