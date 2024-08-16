import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/new-zealand';

const NewZealandPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapId="new-zealand"
    mapImageSrc="/img/maps/new_zealand.jpeg"
    mapLabels={mapLabels}
    titleKey="POI:MAP_NAME_NEW_ZEALAND"
  />
);

export default NewZealandPage;
