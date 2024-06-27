import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/idaho';

const NezPerceValleyPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapImageSrc="/img/maps/nez_perce.jpeg"
    mapLabels={mapLabels}
    mapType="idaho"
    titleKey="POI:MAP_NAME_IDAHO"
  />
);

export default NezPerceValleyPage;
