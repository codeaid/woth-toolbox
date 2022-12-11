import {
  brownBearMarkers,
  chamoisMarkers,
  eurasianBadgerMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
  greylagGooseMarkers,
  redDeerMarkers,
  redFoxMarkers,
  wildDuckMarkers,
} from 'config/transylvania';
import { MarkerOptionsAnimal } from 'types/markers';

export const animalMarkers: Array<MarkerOptionsAnimal> = [
  brownBearMarkers,
  chamoisMarkers,
  eurasianBadgerMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
  greylagGooseMarkers,
  redDeerMarkers,
  redFoxMarkers,
  wildDuckMarkers,
].flat();
