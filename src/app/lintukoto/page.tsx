import { HuntingMapPage } from 'components/HuntingMapPage';
import { animalMarkers, genericMarkers, mapLabels } from 'config/lintukoto';

const LintukotoPage = () => (
  <HuntingMapPage
    animalMarkers={animalMarkers}
    genericMarkers={genericMarkers}
    mapImageSrc="/img/maps/lintukoto.jpeg"
    mapLabels={mapLabels}
    mapType="lintukoto"
    titleKey="POI:MAP_NAME_LINTUKOTO"
  />
);

export default LintukotoPage;
