import Head from 'next/head';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
import { markerVisibilityMap } from 'config/markers';
import {
  useAnimalMarkerData,
  useCustomMarkers,
  useSettings,
  useTranslator,
} from 'hooks';
import { mapHeight, mapLabels, mapWidth } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const TransylvaniaPage = () => {
  // Custom animal data manager values
  const { dataMap, onDataClear, onDataRead, onDataWrite } =
    useAnimalMarkerData();

  // Retrieve custom marker functionality
  const {
    customMarkers,
    onCustomMarkerCreate,
    onCustomMarkerRemove,
    onCustomMarkersClear,
  } = useCustomMarkers('transylvania');

  // Retrieve application settings
  const { settings } = useSettings();

  // Retrieve application translator
  const translate = useTranslator();

  return (
    <>
      <Head>
        <title>
          {`${translate('POI:MAP_NAME_TRANSYLVANIA')} - ${translate(
            'UI:GAME_TITLE',
          )}`}
        </title>
      </Head>

      <NoSSR>
        <HuntingMap
          animalMarkerRecords={dataMap}
          animalMarkers={animalMarkers}
          customMarkers={customMarkers}
          imageHeight={mapHeight}
          imageSrc={`${baseUrl}/img/maps/transylvania.jpeg`}
          imageWidth={mapWidth}
          genericMarkers={genericMarkers}
          labels={mapLabels}
          markerSizeAnimal={settings.animalMarkerSize}
          markerSizeGeneric={settings.genericMarkerSize}
          markerSizeZone={settings.zoneMarkerSize}
          zoomMarkerMap={markerVisibilityMap}
          onCustomMarkerCreate={onCustomMarkerCreate}
          onCustomMarkerRemove={onCustomMarkerRemove}
          onCustomMarkersClear={onCustomMarkersClear}
          onEditorClear={onDataClear}
          onEditorRead={onDataRead}
          onEditorWrite={onDataWrite}
        />
      </NoSSR>
    </>
  );
};

export default TransylvaniaPage;
