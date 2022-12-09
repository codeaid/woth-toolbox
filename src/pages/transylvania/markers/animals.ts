import {
  brownBearMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
} from 'config/transylvania';
import { MarkerOptionsAnimal } from 'types/markers';

export const animalMarkers: Array<MarkerOptionsAnimal> = [
  brownBearMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
].flat();
