import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/africa';

const AfricaPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapType="africa"
    mapImageSrc="/img/maps/africa.jpeg"
    mapLabels={mapLabels}
    titleKey="POI:MAP_NAME_AFRICA"
  />
);

export default AfricaPage;
