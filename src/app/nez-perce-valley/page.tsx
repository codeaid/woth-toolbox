'use client';

import { useEffect, useState } from 'react';
import { HerdMapOverlay } from 'components/HerdMapOverlay';
import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/idaho';
import { isUserLoggedIn } from 'services/discordApiService';

const NezPerceValleyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Only check login status on client side
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  return (
    <>
      <HuntingMapPage
        animalMarkers={animalMarkers}
        genericMarkers={genericMarkers}
        mapId="idaho"
        mapImageSrc="/img/maps/nez_perce.jpeg"
        mapLabels={mapLabels}
        titleKey="POI:MAP_NAME_IDAHO"
      />
      {isLoggedIn && <HerdMapOverlay currentMap="Nez Perce Valley" />}
    </>
  );
};

export default NezPerceValleyPage;
