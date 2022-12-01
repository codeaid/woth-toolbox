import { HuntingMapLabelOptions } from 'components/HuntingMapLabel';
import { MarkerType } from 'types/markers';

// Map size configuration
export const mapHeight = 4096;
export const mapWidth = 4096;

// List of label to show on the map
export const mapLabels: Array<HuntingMapLabelOptions> = [
  {
    habitat: 'Mountains',
    left: 0.2587890625,
    name: 'She Devil',
    top: 0.191162109375,
  },
  {
    habitat: 'Highland forest',
    left: 0.46875,
    name: 'White Pine Orchard',
    top: 0.213134765625,
  },
  {
    habitat: 'Swamps',
    left: 0.68310546875,
    name: 'Kaniksu Shores',
    top: 0.225341796875,
  },
  {
    habitat: 'Swamps',
    left: 0.849609375,
    name: 'Falls Reservoir',
    top: 0.178720703125,
  },
  {
    habitat: 'Swamps',
    left: 0.751953125,
    name: 'Breakwater',
    top: 0.3466796875,
  },
  {
    habitat: 'Mountains',
    left: 0.135009765625,
    name: 'Sheepeater Ridge',
    top: 0.384033203125,
  },
  {
    habitat: 'Highland forest',
    left: 0.40380859375,
    name: 'Thorn Springs',
    top: 0.52392578125,
  },
  {
    habitat: 'Grassland',
    left: 0.60888671875,
    name: 'Cottonwood',
    top: 0.51611328125,
  },
  {
    habitat: 'Lowland forest',
    left: 0.783447265625,
    name: 'Small Paws',
    top: 0.52392578125,
  },
  {
    habitat: 'Mountains',
    left: 0.15478515625,
    name: 'He Devil',
    top: 0.57080078125,
  },
  {
    habitat: 'Grassland',
    left: 0.51025390625,
    name: 'Rivermouth',
    top: 0.73291015625,
  },
  {
    habitat: 'Lowland forest',
    left: 0.7802734375,
    name: 'Black Fox Range',
    top: 0.71826171875,
  },
  {
    habitat: 'Highland forest',
    left: 0.162958984375,
    name: 'Haliwitch',
    top: 0.85498046875,
  },
  {
    habitat: 'Highland forest',
    left: 0.345947265625,
    name: 'Cascade Forest',
    top: 0.830810546875,
  },
  {
    habitat: 'Lowland forest',
    left: 0.541015625,
    name: 'Greenacres',
    top: 0.89453125,
  },
  {
    habitat: 'Lowland forest',
    left: 0.882080078125,
    name: 'Diamond Drill',
    top: 0.887451171875,
  },
];

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['animal:american badger', 0.65],
  ['animal:american black bear', 0.65],
  ['animal:bighorn sheep', 0.65],
  ['animal:elk', 0.65],
  ['animal:gray wolf', 0.65],
  ['animal:lesser scaup', 0.65],
  ['animal:moose', 0.65],
  ['animal:mountain goat', 0.65],
  ['animal:mule deer', 0.65],
  ['animal:pheasant', 0.65],
  ['animal:red fox', 0.65],
  ['animal:ross goose', 0.65],
  ['animal:showshoe hare', 0.65],
  ['animal:white-tailed deer', 0.65],
  ['animal:wild duck', 0.65],
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
