import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { HuntingMapFilterOptions } from 'components/HuntingMapFilter';
import { baseUrl } from 'config/app';
import { getAnimalMarkerDataMap, getStorage } from 'lib/storage';
import { AnimalMarkerData } from 'types/markers';
import { mapHeight, mapLabels, mapWidth, markerVisibilityMap } from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

const NezPerceValleyPage = () => {
  // Animal marker data
  const [animalMarkerDataMap, setAnimalMarkerDataMap] = useState<
    Record<string, AnimalMarkerData>
  >({});

  // Marker filter state
  const [filterOptions, setFilterOptions] = useState<HuntingMapFilterOptions>({
    selectedTypes: [],
  });

  /**
   * Handle changes to individual animal marker data
   */
  const handleMarkerDataChange = useCallback(
    (key: string, data?: AnimalMarkerData) =>
      setAnimalMarkerDataMap(current =>
        data
          ? { ...current, [key]: data }
          : Object.fromEntries(
              Object.entries(current).filter(([k]) => k !== key),
            ),
      ),
    [],
  );

  // Load initial animal marker data from local storage
  useEffect(() => {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    const entries = getAnimalMarkerDataMap(storage);
    setAnimalMarkerDataMap(entries);
  }, []);

  return (
    <>
      <Head>
        <title>Nez Perce Valley - Way Of The Hunter</title>
      </Head>

      <NoSSR>
        <HuntingMap
          animalMarkerDataMap={animalMarkerDataMap}
          animalMarkers={animalMarkers}
          filterOptions={filterOptions}
          imageHeight={mapHeight}
          imageSrc={`${baseUrl}/img/maps/nez_perce.jpeg`}
          imageWidth={mapWidth}
          genericMarkers={genericMarkers}
          labels={mapLabels}
          markerRangeMap={markerVisibilityMap}
          onFilterChange={setFilterOptions}
          onMarkerDataChange={handleMarkerDataChange}
        />
      </NoSSR>
    </>
  );
};

export default NezPerceValleyPage;
