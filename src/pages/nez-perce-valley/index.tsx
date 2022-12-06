import Head from 'next/head';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
import { useAnimalMarkerData } from 'hooks';
import { mapHeight, mapLabels, mapWidth, markerVisibilityMap } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const NezPerceValleyPage = () => {
  // Custom animal data manager values
  const { dataMap, onDataClear, onDataRead, onDataWrite } =
    useAnimalMarkerData();

  return (
    <>
      <Head>
        <title>Nez Perce Valley - Way Of The Hunter</title>
      </Head>

      <NoSSR>
        <HuntingMap
          animalMarkerDataMap={dataMap}
          animalMarkers={animalMarkers}
          imageHeight={mapHeight}
          imageSrc={`${baseUrl}/img/maps/nez_perce.jpeg`}
          imageWidth={mapWidth}
          genericMarkers={genericMarkers}
          labels={mapLabels}
          markerRangeMap={markerVisibilityMap}
          onEditorClear={onDataClear}
          onEditorRead={onDataRead}
          onEditorWrite={onDataWrite}
        />
      </NoSSR>
    </>
  );
};

export default NezPerceValleyPage;
