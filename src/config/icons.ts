import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { IconProps } from 'components/Icon';
import * as icons from 'components/Icon';
import { MarkerType } from 'types/markers';

// Map of icon types and their respective icon components
export const iconComponentMap = new Map<
  MarkerType,
  ForwardRefExoticComponent<IconProps & RefAttributes<HTMLDivElement>>
>([
  ['age', icons.AnimalAgeIcon],
  ['animal:alaska moose', icons.AlaskaMooseIcon],
  ['animal:american badger', icons.AmericanBadgerIcon],
  ['animal:american black bear', icons.AmericanBlackBearIcon],
  ['animal:barren-ground caribou', icons.BarrenGroundCaribouIcon],
  ['animal:bighorn sheep', icons.BighornSheepIcon],
  ['animal:black wildebeest', icons.BlackWildebeestIcon],
  ['animal:blue wildebeest', icons.BlueWildebeestIcon],
  ['animal:brown bear', icons.BrownBearIcon],
  ['animal:cape buffalo', icons.CapeBuffaloIcon],
  ['animal:chamois', icons.ChamoisIcon],
  ['animal:common warthog', icons.CommonWarthogIcon],
  ['animal:egyptian goose', icons.EgyptianGooseIcon],
  ['animal:eurasian badger', icons.EurasianBadgerIcon],
  ['animal:european hare', icons.EuropeanHareIcon],
  ['animal:fallow deer', icons.FallowDeerIcon],
  ['animal:gemsbok', icons.GemsbokIcon],
  ['animal:golden jackal', icons.GoldenJackalIcon],
  ['animal:gray wolf', icons.GrayWolfIcon],
  ['animal:greater kudu', icons.GreaterKuduIcon],
  ['animal:greylag goose', icons.GreylagGooseIcon],
  ['animal:helmeted guineafowl', icons.HelmetedGuineafowlIcon],
  ['animal:honey badger', icons.HoneyBadgerIcon],
  ['animal:kodiak bear', icons.KodiakBearIcon],
  ['animal:lesser scaup', icons.LesserScaupIcon],
  ['animal:lion', icons.LionIcon],
  ['animal:mouflon', icons.MouflonIcon],
  ['animal:mountain goat', icons.MountainGoatIcon],
  ['animal:mule deer', icons.MuleDeerIcon],
  ['animal:pheasant', icons.PheasantIcon],
  ['animal:red deer', icons.RedDeerIcon],
  ['animal:red fox', icons.RedFoxIcon],
  ['animal:rocky mountain elk', icons.RockyMountainElkIcon],
  ['animal:roe deer', icons.RoeDeerIcon],
  ['animal:roosevelt elk', icons.RoosveltElkIcon],
  ['animal:ross goose', icons.RossGooseIcon],
  ['animal:sitka deer', icons.SitkaDeerIcon],
  ['animal:snowshoe hare', icons.ShowshoeHareIcon],
  ['animal:spotted hyena', icons.SpottedHyenaIcon],
  ['animal:springbok', icons.SpringbokIcon],
  ['animal:surf scoter', icons.SurfScoterIcon],
  ['animal:western moose', icons.WesternMooseIcon],
  ['animal:white-tailed deer', icons.WhiteTailedDeerIcon],
  ['animal:wild boar', icons.WildBoarIcon],
  ['animal:wild duck', icons.WildDuckIcon],
  ['animal:wood bison', icons.WoodBisonIcon],
  ['cabin', icons.CabinIcon],
  ['camp', icons.CampIcon],
  ['echo', icons.EchoIcon],
  ['flower', icons.FlowerIcon],
  ['hunting stand', icons.HuntingStandIcon],
  ['lodge', icons.LodgeIcon],
  ['marker:exploration', icons.MarkerExplorationIcon],
  ['marker:level area', icons.MarkerLevelAreaIcon],
  ['marker:tracking', icons.MarkerTrackingIcon],
  ['parking', icons.ParkingIcon],
  ['photo', icons.PhotoIcon],
  ['race', icons.RacingIcon],
  ['rating', icons.RatingIcon],
  ['sex:female', icons.AnimalSexFemaleIcon],
  ['sex:generic', icons.AnimalSexGeneralIcon],
  ['sex:male', icons.AnimalSexMaleIcon],
  ['shooting range', icons.ShootingRangeIcon],
  ['species', icons.AnimalSpeciesIcon],
  ['swing', icons.SwingIcon],
  ['trophy', icons.AnimalTrophyIcon],
  ['view', icons.ViewIcon],
  ['zone:drink', icons.DrinkZoneIcon],
  ['zone:eat', icons.EatZoneIcon],
  ['zone:sleep', icons.SleepZoneIcon],
]);
