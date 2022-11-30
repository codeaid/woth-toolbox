import Head from 'next/head';
import { useState } from 'react';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { HuntingMapFilterOptions } from 'components/HuntingMapFilter';
import { baseUrl } from 'config/app';
import { mapHeight, mapLabels, mapWidth, markerVisibilityMap } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const NezPerceValleyPage = () => {
  // Marker filter state
  const [filterOptions, setFilterOptions] = useState<HuntingMapFilterOptions>({
    selectedTypes: [],
  });

  return (
    <>
      <Head>
        <title>Nez Perce Valley - Way Of The Hunter</title>
      </Head>

      <NoSSR>
        <HuntingMap
          animalMarkers={animalMarkers}
          filterOptions={filterOptions}
          imageHeight={mapHeight}
          imageSrc={`${baseUrl}/img/maps/nez_perce.jpeg`}
          imageWidth={mapWidth}
          genericMarkers={genericMarkers}
          labels={mapLabels}
          markerRangeMap={markerVisibilityMap}
          onFilterChange={setFilterOptions}
        />
      </NoSSR>
    </>
  );
};

export default NezPerceValleyPage;
