import Head from 'next/head';
import { useState } from 'react';
import NoSSR from 'react-no-ssr';
import { HuntingMap } from 'components/HuntingMap';
import { baseUrl } from 'config/app';
import { AnimalType } from 'types/animals';
import { MarkerPosition, MarkerType } from 'types/markers';
import {
  enabledTypes,
  mapHeight,
  mapWidth,
  markerVisibilityMap,
} from './config';
import { animalMarkers } from './markers/animals';
import { genericMarkers } from './markers/generic';

let markers: Array<MarkerPosition> = [];

function consoleWithNoSource(...params: Array<any>) {
  setTimeout(console.log.bind(console, ...params));
}

const animal: AnimalType = 'animal:gray wolf';

const callback = (x: number, y: number) => {
  const percentX = x / mapWidth;
  const percentY = y / mapHeight;

  markers.push([percentX, percentY]);

  consoleWithNoSource(`[${percentX}, ${percentY}] read (${markers.length})`);

  if (markers.length === 7) {
    const sleep = markers.splice(-2) as any;
    const eat = markers.splice(-2) as any;
    const drink = markers.splice(-2) as any;
    const coords = markers.pop();

    consoleWithNoSource(`
createAnimalMarker(
  '${animal}',
  ${JSON.stringify(coords)},
  ${JSON.stringify(drink)},
  ${JSON.stringify(eat)},
  ${JSON.stringify(sleep)},
),`);
  }
};

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
          onClick={callback}
          onFilterChange={setMarkerFilter}
        />
      </NoSSR>
    </>
  );
};

export default NezPerceValleyPage;
