import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/lintukoto';

const LintukotoPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapId="lintukoto"
    mapImageSrc="/img/maps/lintukoto.jpeg"
    mapLabels={mapLabels}
    titleKey="POI:MAP_NAME_LINTUKOTO"
  />
);

export default LintukotoPage;
