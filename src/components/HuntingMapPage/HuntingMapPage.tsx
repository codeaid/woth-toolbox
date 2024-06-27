import Head from 'next/head';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HuntingMap } from 'components/HuntingMap';
import { basePath } from 'config/app';
import { markerVisibilityMap } from 'config/markers';
import {
  useHuntingMapType,
  useSettings,
  useTranslator,
  useTutorial,
} from 'hooks';
import type { HuntingMapPageProps } from './types';

export const HuntingMapPage = (props: HuntingMapPageProps) => {
  const {
    animalMarkers,
    genericMarkers,
    mapHeight = 4096,
    mapImageSrc,
    mapLabels,
    mapType,
    mapWidth = 4096,
    titleKey,
  } = props;

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
    onSetMapType(mapType);
    return () => onSetMapType();
  }, [mapType, onSetMapType]);

  return (
    <>
      <Head>
        <title>
          {`${translate(titleKey)} - ${translate('UI:GAME_TITLE')}`}
        </title>
      </Head>

      <HuntingMap
        animalMarkers={animalMarkers}
        genericMarkers={genericMarkers}
        imageHeight={mapHeight}
        imageSrc={basePath + mapImageSrc}
        imageWidth={mapWidth}
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
