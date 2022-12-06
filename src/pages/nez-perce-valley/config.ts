import { MapLabelOptions } from 'types/cartography';
import { MarkerType } from 'types/markers';

// Map size configuration
export const mapHeight = 4096;
export const mapWidth = 4096;

// List of label to show on the map
export const mapLabels: Array<MapLabelOptions> = [
  {
    coords: [0.2587890625, 0.191162109375],
    habitat: 'Mountains',
    name: 'She Devil',
  },
  {
    coords: [0.46875, 0.213134765625],
    habitat: 'Highland forest',
    name: 'White Pine Orchard',
  },
  {
    coords: [0.68310546875, 0.225341796875],
    habitat: 'Swamps',
    name: 'Kaniksu Shores',
  },
  {
    coords: [0.849609375, 0.178720703125],
    habitat: 'Swamps',
    name: 'Falls Reservoir',
  },
  {
    coords: [0.751953125, 0.3466796875],
    habitat: 'Swamps',
    name: 'Breakwater',
  },
  {
    coords: [0.135009765625, 0.384033203125],
    habitat: 'Mountains',
    name: 'Sheepeater Ridge',
  },
  {
    coords: [0.40380859375, 0.52392578125],
    habitat: 'Highland forest',
    name: 'Thorn Springs',
  },
  {
    coords: [0.60888671875, 0.51611328125],
    habitat: 'Grassland',
    name: 'Cottonwood',
  },
  {
    coords: [0.783447265625, 0.52392578125],
    habitat: 'Lowland forest',
    name: 'Small Paws',
  },
  {
    coords: [0.15478515625, 0.57080078125],
    habitat: 'Mountains',
    name: 'He Devil',
  },
  {
    coords: [0.51025390625, 0.73291015625],
    habitat: 'Grassland',
    name: 'Rivermouth',
  },
  {
    coords: [0.7802734375, 0.71826171875],
    habitat: 'Lowland forest',
    name: 'Black Fox Range',
  },
  {
    coords: [0.162958984375, 0.85498046875],
    habitat: 'Highland forest',
    name: 'Haliwitch',
  },
  {
    coords: [0.345947265625, 0.830810546875],
    habitat: 'Highland forest',
    name: 'Cascade Forest',
  },
  {
    coords: [0.541015625, 0.89453125],
    habitat: 'Lowland forest',
    name: 'Greenacres',
  },
  {
    coords: [0.882080078125, 0.887451171875],
    habitat: 'Lowland forest',
    name: 'Diamond Drill',
  },
];

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['animal:american badger', 0.9],
  ['animal:american black bear', 0.9],
  ['animal:bighorn sheep', 0.9],
  ['animal:elk', 0.9],
  ['animal:gray wolf', 0.9],
  ['animal:lesser scaup', 0.9],
  ['animal:moose', 0.9],
  ['animal:mountain goat', 0.9],
  ['animal:mule deer', 0.9],
  ['animal:pheasant', 0.9],
  ['animal:red fox', 0.9],
  ['animal:ross goose', 0.9],
  ['animal:showshoe hare', 0.9],
  ['animal:white-tailed deer', 0.9],
  ['animal:wild duck', 0.9],
  ['cabin', 0.25],
  ['camp', 0.25],
  ['echo', 0.35],
  ['hunting stand', 0.45],
  ['lodge', 0],
  ['shooting range', 0.25],
  ['view', 0.35],
  ['zone:drink', 0.65],
  ['zone:eat', 0.65],
  ['zone:sleep', 0.65],
]);
