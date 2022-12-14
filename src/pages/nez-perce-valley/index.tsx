import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
import { markerVisibilityMap } from 'config/markers';
import {
  useAnimalMarkerData,
  useApplicationSettings,
  useTranslator,
} from 'hooks';
import { mapHeight, mapLabels, mapWidth } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const NezPerceValleyPage = () => {
  // Custom animal data manager values
  const { dataMap, onDataClear, onDataRead, onDataWrite } =
    useAnimalMarkerData();

  // Retrieve application settings
  const { settings } = useApplicationSettings();

  // Retrieve application translator
  const translate = useTranslator();

  return (
    <>
      <Head>
        <title>
          {translate('POI:MAP_NAME_IDAHO')} - {translate('UI:GAME_TITLE')}
        </title>
      </Head>

      <NoSSR>
        <HuntingMap
          animalMarkerRecords={dataMap}
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
          onEditorClear={onDataClear}
          onEditorRead={onDataRead}
          onEditorWrite={onDataWrite}
        />
      </NoSSR>
    </>
  );
};

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});

export default NezPerceValleyPage;
