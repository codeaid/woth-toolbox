import {
  brownBearMarkers,
  chamoisMarkers,
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
  europeanHareMarkers,
  goldenJackalMarkers,
  greylagGooseMarkers,
  redDeerMarkers,
  redFoxMarkers,
  wildDuckMarkers,
].flat();
