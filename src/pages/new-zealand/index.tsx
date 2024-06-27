import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/new-zealand';

const NewZealandPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapImageSrc="/img/maps/new_zealand.jpeg"
    mapLabels={mapLabels}
    mapType="new-zealand"
    titleKey="POI:MAP_NAME_NEW_ZEALAND"
  />
);

export default NewZealandPage;
