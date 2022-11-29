import Head from 'next/head';
import { useState } from 'react';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
import { MarkerType } from 'types/markers';
import { mapHeight, mapLabels, mapWidth, markerVisibilityMap } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const NezPerceValleyPage = () => {
  // Marker filter state
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<
    Array<MarkerType>
  >([]);

  return (
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
          labels={mapLabels}
          markerRangeMap={markerVisibilityMap}
          selectedFilterTypes={selectedFilterTypes}
          onFilterChange={setSelectedFilterTypes}
        />
      </NoSSR>
    </>
  );
};

export default NezPerceValleyPage;
