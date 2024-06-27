import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/transylvania';

const TransylvaniaPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapImageSrc="/img/maps/transylvania.jpeg"
    mapLabels={mapLabels}
    mapType="transylvania"
    titleKey="POI:MAP_NAME_TRANSYLVANIA"
  />
);

export default TransylvaniaPage;
