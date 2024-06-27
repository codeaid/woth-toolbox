import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/alaska';

const AlaskaPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapImageSrc="/img/maps/alaska.jpeg"
    mapLabels={mapLabels}
    mapType="alaska"
    titleKey="POI:MAP_NAME_ALASKA"
  />
);

export default AlaskaPage;
