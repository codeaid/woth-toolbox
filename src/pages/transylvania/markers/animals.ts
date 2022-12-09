import {
  brownBearMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
  redDeerMarkers,
} from 'config/transylvania';
import { MarkerOptionsAnimal } from 'types/markers';

export const animalMarkers: Array<MarkerOptionsAnimal> = [
  brownBearMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
  redDeerMarkers,
].flat();
