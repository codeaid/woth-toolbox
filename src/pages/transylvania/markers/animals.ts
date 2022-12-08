import {
  brownBearMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
} from 'config/transylvania';
import { AnimalMarkerOptions } from 'types/markers';

export const animalMarkers: Array<AnimalMarkerOptions> = [
  brownBearMarkers,
  europeanHareMarkers,
  goldenJackalMarkers,
].flat();
