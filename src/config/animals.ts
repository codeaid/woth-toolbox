/// noinspection SpellCheckingInspection

import { Animal, AnimalActivity } from 'types/animals';

export const animals: Array<Animal> = [
  // Tier 1
  {
    description:
      'The European hare, also known as the brown hare, is a species of hare native to Europe and parts of Asia. It is among the largest hare species and is adapted to temperate, open country. Hares are herbivorous and feed mainly on grasses and herbs, supplemented with twigs, buds, bark and field crops.',
    hitEnergy: [356, 1068],
    id: 'european-hare',
    latin: 'Lepus europaeus',
    lifeCycle: [
      { activity: AnimalActivity.Feeding, time: 0 },
      { activity: AnimalActivity.Sleeping, time: 3 },
      { activity: AnimalActivity.Feeding, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 17 },
    ],
    name: 'European Hare',
    tier: 1,
  },

  // Tier 3
  {
    description:
      'They\'re sturdy, with short legs, short tails, and flat bodies. Their triangular faces - ideal for digging and "nosing" into tight spaces - are dark in color, with white stripes down their nose and over their eyes',
    hitEnergy: [612, 1836],
    id: 'american-badger',
    latin: 'Taxidea taxus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 3 },
      { activity: AnimalActivity.Drinking, time: 7 },
      { activity: AnimalActivity.Sleeping, time: 10 },
      { activity: AnimalActivity.Feeding, time: 15 },
      { activity: AnimalActivity.Drinking, time: 19 },
    ],
    name: 'American Badger',
    tier: 3,
  },
  {
    description:
      'The European badger is a powerfully built black, white, brown and gray animal with a small head, stocky body, small black eyes and a short tail.',
    hitEnergy: [700, 2100],
    id: 'eurasian-badger',
    latin: 'Meles meles',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 3 },
      { activity: AnimalActivity.Drinking, time: 7 },
      { activity: AnimalActivity.Sleeping, time: 10 },
      { activity: AnimalActivity.Feeding, time: 15 },
      { activity: AnimalActivity.Drinking, time: 19 },
    ],
    name: 'Eurasian Badger',
    tier: 3,
  },
  {
    description:
      'Red foxes are famous predators, known for their cunning and intelligence. They are solitary hunters that feed on rodents, rabbits, birds, and other small game - but their diet can be as flexible as their home habitat. Their fur comes in beautiful shades of crimson, white and dark coal.',
    hitEnergy: [612, 1836],
    id: 'red-fox',
    latin: 'Vulpes vulpes',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 3 },
      { activity: AnimalActivity.Drinking, time: 7 },
      { activity: AnimalActivity.Sleeping, time: 10 },
      { activity: AnimalActivity.Feeding, time: 15 },
      { activity: AnimalActivity.Drinking, time: 19 },
    ],
    name: 'Red Fox',
    tier: 3,
  },

  // Tier 4
  {
    description:
      'Roe deer are small, reddish and grey-brown, almost tailless, and well-adapted to cold environments. In good conditions, bucks develop antlers roughened and enlarged at the base, with two, three, and rarely even four points.',
    hitEnergy: [945, 2458],
    id: 'roe-deer',
    latin: 'Capreolus capreolus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Roe Deer',
    tier: 4,
  },

  // Tier 5
  {
    description:
      'Bighorn males, called rams, are famous for their large, curled horns. Females, called ewes, have horns too, but theirs are shorter and less curved.',
    hitEnergy: [1669, 4005],
    id: 'bighorn-sheep',
    latin: 'Ovis canadensis',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Bighorn Sheep',
    tier: 5,
  },
  {
    description:
      'The chamois is a species of goat-antelope native to mountains in Europe. Both sexes possess vertical horns that hook sharply backward at the ends.',
    hitEnergy: [1323, 3439],
    id: 'chamois',
    latin: 'Rupicapra rupicapra',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Chamois',
    tier: 5,
  },
  {
    description:
      'The fallow deer is an elegant, medium-sized deer, with a typically spotted coat. Males have broad, palmate antlers.',
    hitEnergy: [1462, 3510],
    id: 'fallow-deer',
    latin: 'Dama dama',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Fallow Deer',
    tier: 5,
  },
  {
    description:
      'The gray wolf, largest wild member of the dog family, inhabits vast areas of the northern hemisphere. Wolves were domesticated several thousand years ago, and selective breeding produced dogs. Gray wolves usually live in packs of six to ten, but pack size can be as large as two dozen individuals. A pack is basically a family group consisting of an adult breeding pair and their offspring of various ages. The ability of wolves to form strong social bonds with one another is what makes the wolf pack possible.',
    hitEnergy: [1165, 3029],
    id: 'gray-wolf',
    latin: 'Canis lupus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 3 },
      { activity: AnimalActivity.Drinking, time: 7 },
      { activity: AnimalActivity.Sleeping, time: 10 },
      { activity: AnimalActivity.Feeding, time: 15 },
      { activity: AnimalActivity.Drinking, time: 19 },
    ],
    name: 'Gray Wolf',
    tier: 5,
  },
  {
    description:
      'Mouflon is a feral subspecies of the domestic sheep. It was originally found only on the Mediterranean islands of Corsica and Sardinia, but has since been introduced into many other regions of Europe.',
    hitEnergy: [1345, 3498],
    id: 'mouflon',
    latin: 'Ovis musimon',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Mouflon',
    tier: 5,
  },
  {
    description:
      'Mountain goats have cloven hooves with two toes that spread wide to improve balance. They have distinctive beards and long, warm, white coats to protect them from cold temperatures and strong mountain winds.',
    hitEnergy: [1515, 3636],
    id: 'mountain-goat',
    latin: 'Oreamnos americanus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Mountain Goat',
    tier: 5,
  },
  {
    description:
      'They gained their name from their large, mule-like ears which they can move independently, allowing them to survey their surroundings for sounds of potential danger. They are often confused with white-tailed deer but, fully formed, mature mule deer racks are taller and broader than those on whitetails. They are also bifurcated, forking in two directions as they grow, splitting again to create more tines (points).',
    hitEnergy: [1576, 3783],
    id: 'mule-deer',
    latin: 'Odocoileus hemionus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Mule Deer',
    tier: 5,
  },
  {
    description:
      'The deer can be recognized by the characteristic white underside to its tail. It raises its tail when alarmed to warn the predator that it has been detected. Bucks have either a typical or atypical antler arrangement. Typical antlers are symmetrical with points growing straight up from the main beam. Atypical antlers are asymmetrical and the points may project at any angle from the main beam.',
    hitEnergy: [1543, 3705],
    id: 'white-tailed-deer',
    latin: 'Odocoileus virginianus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'White-Tailed Deer',
    tier: 5,
  },
  {
    description:
      'Large head, long narrow snout and small ears. Coarse coat, with a mane of bristles from the neck to the middle of the back.',
    hitEnergy: [1625, 3900],
    id: 'wild-boar',
    latin: 'Sus scrofa',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Wild Boar',
    tier: 5,
  },

  // Tier 6
  {
    description:
      'The black bear, also called the American bear, is the most common bear found in the forests of North America, including parts of Mexico. Males can be up to 70 percent heavier than females. The head is small but is supported by a strong neck. The ears are small and rounded. The curved claws are non-retractable, and, unlike cats and dogs, bears walk on the soles of their feet.',
    hitEnergy: [2889, 4911],
    id: 'american-black-bear',
    latin: 'Ursus americanus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 3 },
      { activity: AnimalActivity.Drinking, time: 7 },
      { activity: AnimalActivity.Sleeping, time: 10 },
      { activity: AnimalActivity.Feeding, time: 15 },
      { activity: AnimalActivity.Drinking, time: 19 },
    ],
    name: 'American Black Bear',
    tier: 6,
  },
  {
    description:
      'Adult brown bears are powerful apex predators, but much of their diet consists of nuts, berries, fruit, leaves, and roots. Bears also eat other animals, from rodents to moose.',
    hitEnergy: [2835, 5386],
    id: 'brown-bear',
    latin: 'Ursus arctos',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 3 },
      { activity: AnimalActivity.Drinking, time: 7 },
      { activity: AnimalActivity.Sleeping, time: 10 },
      { activity: AnimalActivity.Feeding, time: 15 },
      { activity: AnimalActivity.Drinking, time: 19 },
    ],
    name: 'Brown Bear',
    tier: 6,
  },
  {
    description:
      'Elk are also called wapiti, a Native American word that means "light-colored deer". In North America there are six subspecies of elk. Males are called bulls, and females are called cows. Elk have thick bodies with slender legs and short tails. Most have lighter yellow-brown to orange coats in contrast to the dark brown hair on their heads.',
    hitEnergy: [2912, 5532],
    id: 'elk',
    latin: 'Cervus canadensis',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Elk',
    tier: 6,
  },
  {
    description:
      'Moose are the largest members of the deer family. Most adult males have distinctive broad, palmate ("open-hand shaped") antlers. Both male and female moose have dewlaps, also known as a "bell", which grow under their jaw. Young males often have the largest bells, and their exact function remains a mystery.',
    hitEnergy: [3088, 5867],
    id: 'moose',
    latin: 'Alces americanus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Moose',
    tier: 6,
  },
  {
    description:
      'The red deer is one of the largest deer species. A male red deer is called a stag or hart, and a female is called a hind. The stag has long, regularly-branched antlers bearing a total of 10 or more tines. Its coat is reddish brown, darkening to grayish brown.',
    hitEnergy: [2693, 4579],
    id: 'red-deer',
    latin: 'Cervus elpahus',
    lifeCycle: [
      { activity: AnimalActivity.Sleeping, time: 0 },
      { activity: AnimalActivity.Feeding, time: 5 },
      { activity: AnimalActivity.Drinking, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 13 },
      { activity: AnimalActivity.Feeding, time: 17 },
      { activity: AnimalActivity.Drinking, time: 22 },
    ],
    name: 'Red Deer',
    tier: 6,
  },
];
