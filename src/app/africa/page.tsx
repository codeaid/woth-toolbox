import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/africa';

const AfricaPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapImageSrc="/img/maps/africa.jpeg"
    mapLabels={mapLabels}
    mapType="africa"
    titleKey="POI:MAP_NAME_AFRICA"
  />
);

export default AfricaPage;
