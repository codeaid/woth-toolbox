'use client';

import { HuntingMapPage } from 'components/HuntingMapPage';
import { HerdMapOverlay } from 'components/HerdMapOverlay';
import { isUserLoggedIn } from 'services/discordApiService';
import { animalMarkers, genericMarkers, mapLabels } from 'config/idaho';

const NezPerceValleyPage = () => (
  <>
    <HuntingMapPage
      animalMarkers={animalMarkers}
      genericMarkers={genericMarkers}
      mapId="idaho"
      mapImageSrc="/img/maps/nez_perce.jpeg"
      mapLabels={mapLabels}
      titleKey="POI:MAP_NAME_IDAHO"
    />
    {isUserLoggedIn() && <HerdMapOverlay currentMap="Nez Perce Valley" />}
  </>
);

export default NezPerceValleyPage;
