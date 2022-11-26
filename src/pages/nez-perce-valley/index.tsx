import Head from 'next/head';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
import { mapHeight, mapWidth, markerVisibilityMap } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const NezPerceValleyPage = () => (
  <>
    <Head>
      <title>Nez Perce Valley - Way Of The Hunter</title>
    </Head>

    <NoSSR>
      <HuntingMap
        animalMarkers={animalMarkers}
        imageHeight={mapHeight}
        imageSrc={`${baseUrl}/img/maps/nez_perce.jpeg`}
        imageWidth={mapWidth}
        genericMarkers={genericMarkers}
        markerVisibilityMap={markerVisibilityMap}
      />
    </NoSSR>
  </>
);

export default NezPerceValleyPage;
