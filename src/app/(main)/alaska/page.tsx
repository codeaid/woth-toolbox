import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/alaska';

const AlaskaPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapId="alaska"
    mapImageSrc="/img/maps/alaska.jpeg"
    mapLabels={mapLabels}
    titleKey="POI:MAP_NAME_ALASKA"
  />
);

export default AlaskaPage;
