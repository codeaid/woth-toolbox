import Head from 'next/head';
import { useEffect } from 'react';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
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
        imageSrc={`${baseUrl}/img/maps/nez_perce.jpeg`}
        imageWidth={mapWidth}
        genericMarkers={genericMarkers}
        labels={mapLabels}
        markerSizeAnimal={settings.animalMarkerSize}
        markerSizeGeneric={settings.genericMarkerSize}
        markerSizeZone={settings.zoneMarkerSize}
        zoomMarkerMap={markerVisibilityMap}
      />

      {tutorial}
    </>
  );
};

export default NezPerceValleyPage;
