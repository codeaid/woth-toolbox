import {
  brownBearMarkers,
  chamoisMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
  redDeerMarkers,
} from 'config/transylvania';
import { MarkerOptionsAnimal } from 'types/markers';

export const animalMarkers: Array<MarkerOptionsAnimal> = [
  brownBearMarkers,
  chamoisMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
  redDeerMarkers,
].flat();
