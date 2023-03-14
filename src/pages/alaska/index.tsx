import Head from 'next/head';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HuntingMap } from 'components/HuntingMap';
import {
  animalMarkers,
  genericMarkers,
  mapHeight,
  mapLabels,
  mapWidth,
} from 'config/alaska';
import { basePath } from 'config/app';
import tbxMarkers from 'config/legacy/alaska.json';
import { markerVisibilityMap } from 'config/markers';
import {
  useHuntingMapType,
  useSettings,
  useTranslator,
  useTutorial,
} from 'hooks';
import { getMigrationDebugMarkers } from 'lib/debug';
import { MarkerOptionsAnimal } from 'types/markers';

// Build a list of all matched and unmatched markers
const debugMarkers = getMigrationDebugMarkers(
  tbxMarkers as Array<MarkerOptionsAnimal>,
  animalMarkers,
);

const AlaskaPage = () => {
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
    onSetMapType('alaska');
    return () => onSetMapType();
  }, [onSetMapType]);

  return (
    <>
      <Head>
        <title>
          {`${translate('POI:MAP_NAME_ALASKA')} - ${translate(
            'UI:GAME_TITLE',
          )}`}
        </title>
      </Head>

      <HuntingMap
        animalMarkers={debugMarkers}
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
      />

      {createPortal(tutorial, document.body)}
    </>
  );
};

export default AlaskaPage;
