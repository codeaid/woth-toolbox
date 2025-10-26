'use client';

import { HerdMapOverlay } from 'components/HerdMapOverlay';
import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/idaho';
import { isUserLoggedIn } from 'services/discordApiService';
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
