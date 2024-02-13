import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/transylvania';

const TransylvaniaPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapType="transylvania"
    mapImageSrc="/img/maps/transylvania.jpeg"
    mapLabels={mapLabels}
    titleKey="POI:MAP_NAME_TRANSYLVANIA"
  />
);

export default TransylvaniaPage;
