import Head from 'next/head';
import { useState } from 'react';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
import { MarkerType } from 'types/markers';
import {
  enabledTypes,
  mapHeight,
  mapWidth,
  markerVisibilityMap,
} from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const NezPerceValleyPage = () => {
  // Marker filter state
  const [markerFilter, setMarkerFilter] = useState<Array<MarkerType>>([]);

  return (
    <>
      <Head>
        <title>Nez Perce Valley - Way Of The Hunter</title>
      </Head>

      <NoSSR>
        <HuntingMap
          animalMarkers={animalMarkers}
          enabledTypes={enabledTypes}
          imageHeight={mapHeight}
          imageSrc={`${baseUrl}/img/maps/nez_perce.jpeg`}
          imageWidth={mapWidth}
          genericMarkers={genericMarkers}
          markerFilter={markerFilter}
          markerVisibilityMap={markerVisibilityMap}
          onFilterChange={setMarkerFilter}
        />
      </NoSSR>
    </>
  );
};

export default NezPerceValleyPage;
