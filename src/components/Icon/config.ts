import { FunctionComponent } from 'react';
import { IconType } from 'types/icons';
import { NeedZoneMarkerType } from 'types/markers';
import AnimalAmericanBadger from './assets/animals/AmericanBadger.svg';
import AnimalAmericanBlackBear from './assets/animals/AmericanBlackBear.svg';
import AnimalBighornSheep from './assets/animals/BighornSheep.svg';
import AnimalBrownBear from './assets/animals/BrownBear.svg';
import AnimalChamois from './assets/animals/Chamois.svg';
import AnimalElk from './assets/animals/Elk.svg';
import AnimalEurasianBadger from './assets/animals/EurasianBadger.svg';
import AnimalEuropeanHare from './assets/animals/EuropeanHare.svg';
import AnimalFallowDeer from './assets/animals/FallowDeer.svg';
import AnimalGoldenJackal from './assets/animals/GoldenJackal.svg';
import AnimalGrayWolf from './assets/animals/GrayWolf.svg';
import AnimalGreylagGoose from './assets/animals/GreylagGoose.svg';
import AnimalLesserScaup from './assets/animals/LesserScaup.svg';
import AnimalMoose from './assets/animals/Moose.svg';
import AnimalMouflon from './assets/animals/Mouflon.svg';
import AnimalMountainGoat from './assets/animals/MountainGoat.svg';
import AnimalMuleDeer from './assets/animals/MuleDeer.svg';
import AnimalPheasant from './assets/animals/Pheasant.svg';
import AnimalRedDeer from './assets/animals/RedDeer.svg';
import AnimalRedFox from './assets/animals/RedFox.svg';
import AnimalRoeDeer from './assets/animals/RoeDeer.svg';
import AnimalRossGoose from './assets/animals/RossGoose.svg';
import AnimalSnowshoeHare from './assets/animals/SnowshoeHare.svg';
import AnimalWhiteTailedDeer from './assets/animals/WhiteTailedDeer.svg';
import AnimalWildBoar from './assets/animals/WildBoar.svg';
import AnimalWildDuck from './assets/animals/WildDuck.svg';
import Cabin from './assets/Cabin.svg';
import Camp from './assets/Camp.svg';
import Echo from './assets/Echo.svg';
import HuntingStand from './assets/HuntingStand.svg';
import Lodge from './assets/Lodge.svg';
import Photo from './assets/Photo.svg';
import ShootingRange from './assets/ShootingRange.svg';
import View from './assets/View.svg';
import ZoneDrink from './assets/zones/Drink.png';
import ZoneEat from './assets/zones/Eat.png';
import ZoneGather from './assets/zones/Gather.png';
import ZonePath from './assets/zones/Path.png';
import ZoneSleep from './assets/zones/Sleep.png';

export const iconMap: Partial<Record<IconType, FunctionComponent>> = {
  'animal:american badger': AnimalAmericanBadger,
  'animal:american black bear': AnimalAmericanBlackBear,
  'animal:bighorn sheep': AnimalBighornSheep,
  'animal:brown bear': AnimalBrownBear,
  'animal:chamois': AnimalChamois,
  'animal:elk': AnimalElk,
  'animal:eurasian badger': AnimalEurasianBadger,
  'animal:european hare': AnimalEuropeanHare,
  'animal:fallow deer': AnimalFallowDeer,
  'animal:golden jackal': AnimalGoldenJackal,
  'animal:gray wolf': AnimalGrayWolf,
  'animal:greylag goose': AnimalGreylagGoose,
  'animal:lesser scaup': AnimalLesserScaup,
  'animal:moose': AnimalMoose,
  'animal:mouflon': AnimalMouflon,
  'animal:mountain goat': AnimalMountainGoat,
  'animal:mule deer': AnimalMuleDeer,
  'animal:pheasant': AnimalPheasant,
  'animal:red deer': AnimalRedDeer,
  'animal:red fox': AnimalRedFox,
  'animal:roe deer': AnimalRoeDeer,
  'animal:ross goose': AnimalRossGoose,
  'animal:showshoe hare': AnimalSnowshoeHare,
  'animal:white-tailed deer': AnimalWhiteTailedDeer,
  'animal:wild boar': AnimalWildBoar,
  'animal:wild duck': AnimalWildDuck,
  'cabin': Cabin,
  'camp': Camp,
  'echo': Echo,
  'hunting stand': HuntingStand,
  'lodge': Lodge,
  'photo': Photo,
  'shooting range': ShootingRange,
  'view': View,
};

// Map of zone marker types and their associated asset files
export const zoneMap: Record<NeedZoneMarkerType, string> = {
  'zone:drink': ZoneDrink.src,
  'zone:eat': ZoneEat.src,
  'zone:gather': ZoneGather.src,
  'zone:path': ZonePath.src,
  'zone:sleep': ZoneSleep.src,
};
