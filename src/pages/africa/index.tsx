import Head from 'next/head';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HuntingMap } from 'components/HuntingMap';
import { animalMarkers, genericMarkers, mapLabels } from 'config/africa';
import { basePath } from 'config/app';
import { markerVisibilityMap } from 'config/markers';
import {
  useHuntingMapType,
  useSettings,
  useTranslator,
  useTutorial,
} from 'hooks';

const AfricaPage = () => {
  // Retrieve map type switcher
  const { onSetMapType } = useHuntingMapType();

  // Render map tutorial dialog
  const { component: tutorial } = useTutorial(true);

  // Retrieve application settings
  const { settings } = useSettings();

  // Retrieve application translator
  const translate = useTranslator();

  // Toggle currently active map type on page load and unload
  useEffect(() => {
    onSetMapType('africa');
    return () => onSetMapType();
  }, [onSetMapType]);

  return (
    <>
      <Head>
        <title>
          {`${translate('POI:MAP_NAME_AFRICA')} - ${translate(
            'UI:GAME_TITLE',
          )}`}
        </title>
      </Head>

      <HuntingMap
        animalMarkers={animalMarkers}
        imageScale={2}
        imageSrc={`${basePath}/img/maps/africa.jpeg`}
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

export default AfricaPage;
