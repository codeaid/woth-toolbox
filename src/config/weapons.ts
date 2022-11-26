import { Brand, Weapon } from 'types/weapons';

export const weapons: Array<Weapon> = [
  // Tier 2
  {
    brand: Brand.Steyr,
    calibre: '.22 LR',
    description:
      'The new Steyr small bore follows up the excellent build quality of its "big sisters" and sets totally new standards in the rimfire rifle sector. The NRA American Hunter confirmed this in december 2018 by announcing the STEYR MANNLICHER ZEPHYR II as Rifle of the Year 2019.',
    hitEnergy: [154, 138, 124, 114, 99],
    slug: 'steyr-zephyr-ii',
    model: 'Zephyr II',
    tier: 2,
  },
  {
    brand: Brand.Stinger,
    calibre: '.22 LR',
    description:
      'This legendary American produced firearm found its followers mostly among those that enjoy plinking and Sunday gun-days. Its low recoil makes it great for beginners or seasoned hunters that want to improve their aim. Hunting small game was never so much fun.',
    hitEnergy: [154, 138, 124, 114, 99],
    slug: 'stinger-22',
    model: '22',
    tier: 2,
  },

  // Tier 3
  {
    brand: Brand.Steyr,
    calibre: '.223 Win',
    description:
      'The Steyr Scout offers living proof of the saying "A man needs only one rifle". With a short overall length of just 39.4", a light weight of 6.6 lbs, a fold-away integrated bipod, integrated spare magazine and other unique features, the Scout is a perfectly versatile tool for a wide range of applications from patrolling the ranch, hunting in nearly any environment or target practice at the range.',
    hitEnergy: [1608, 1550, 1485, 1423, 1313],
    slug: 'steyr-scout',
    model: 'Scout',
    tier: 3,
  },

  // Tier 4
  {
    brand: Brand.Unknown,
    calibre: '30-30 Win',
    description:
      "This lever-action icon of the deer woods is chambered in 30-30 Win ensuring that tags will be filled, mouths fed and the reign of America's ultimate woods rifle will continue going strong. Its substantial sidewalls are cut out only where necessary for loading and ejection. For rock-solid reliability, heat-treated solid-steel forgings are used for the receiver and trigger guard.",
    hitEnergy: [1658, 1553, 1445, 1346, 1170],
    slug: 'grandpas-old-rifle',
    model: "Grandpa's Old Rifle",
    tier: 4,
  },

  // Tier 5
  {
    brand: Brand.Remington,
    calibre: '.243 Win',
    description:
      'The Remington 783 is a civilian, bolt-action hunting rifle built for the budget market. Supreme accuracy for the price made it very popular with beginner hunters. Chambered in .342 Win, it is a great option for confidently hunting deer out to 250 meters.',
    hitEnergy: [2948, 2832, 2699, 2578, 2360],
    slug: 'remington-783',
    model: '783',
    tier: 5,
  },
  {
    brand: Brand.Steyr,
    calibre: '.243 Win',
    description:
      "Steyr's reputation for legendary accuracy and durability has kept them in business for over one hundred years. The Pro Hunter Bolt-Action Rifles feature the finest cold hammer-forged barrels mated to an ultra rigid cylindrical action. This rifle is the first in a great family of accurate, reliable and long-lasting bolt-action rifles.",
    hitEnergy: [2948, 2832, 2698, 2578, 2334],
    slug: 'steyr-pro-hunter',
    model: 'Pro Hunter',
    tier: 5,
  },
  {
    brand: Brand.Steyr,
    calibre: '7mm-08 Rem',
    description:
      'The Pro Hunter II is the latest iteration of the Pro Hunter series from the legendary manufacturer Steyr Arms. The barrel on the Pro Hunter II is a cold hammer-forged barrel which has been threaded at 1/2x28 and features the ultra durable Black Mannox finish. In addition, a detachable box magazine, Boyds laminate wood stock and Mossy Oak Elements Terra Gila finish are standard features of this rifle.',
    hitEnergy: [3066, 2971, 2867, 2774, 2597],
    slug: 'steyr-pro-hunter-ii',
    model: 'Pro Hunter II',
    tier: 5,
  },
  {
    brand: Brand.Steyr,
    calibre: '.308 Win',
    description:
      'An all-steel weapon made according to military standards for ultimate ruggedness. New "monoblock" construction - the barrel and housing are made from a single piece for unbeatable accuracy. A top ergonomic stock with numerous, innovative options for customization.',
    hitEnergy: [3468, 3382, 3288, 3203, 3041],
    slug: 'steyr-monoblock',
    model: 'Monoblock',
    tier: 5,
  },
  {
    brand: Brand.Remington,
    calibre: '.270 Win',
    description:
      "When the heat of the moment finds you looking for a follow-up, the Model 7600 can deliver with outstanding speed and accuracy, time and time again. You won't find a big-game rifle with a better combination of practical shooting features: twin action bars provide slick, smooth operation for rapid repeat shots; a quick-release, drop-out, four-round magazine that loads and unloads instantly; and a free-floating barrel that matches the accuracy of the best bolt guns.",
    hitEnergy: [3600, 3541, 3479, 3418, 3310],
    slug: 'remington-7600',
    model: '7600',
    tier: 5,
  },
  {
    brand: Brand.Remington,
    calibre: '.30-06',
    description:
      'The Model 1903 Springfield Rifle was perhaps the most famous and popular of all U.S. military rifles. First issued in 1903, it served in two world wars and the Korean War and numerous smaller military actions around the globe in the first half of the 20th Century. It even saw limited service during the Vietnam War. Today, it is extremely sought-after military rifle, popular with both collectors and hunters.',
    hitEnergy: [3755, 3630, 3494, 3381, 3239],
    slug: 'remington-1903',
    model: '1903',
    tier: 5,
  },

  // Tier 6
  {
    brand: Brand.Remington,
    calibre: '.350 Rem Mag',
    description:
      'The Remington Model 673 Guide Rifle was a bolt-action rifle introduced by Remington Arms in 2003 and discontinued in 2006. It is an updated version of the Remington Model 600 and model 660. The company hails the weapon as the "ultimate guildes\' rifle", with features ranging from its laminated stock, ventilated rib and iron sights. Its action is based on that of the Model Seven and features Remington\'s proprietary short action.',
    hitEnergy: [4416, 4238, 4045, 3861, 3525],
    slug: 'remington-673-guide-rifle',
    model: '673 Guide Rifle',
    tier: 6,
  },
  {
    brand: Brand.Steyr,
    calibre: '.300 Win Mag',
    description:
      'The Steyr SM12 offers an ergonomic and elegant design with fish scale checkering and a Bavarian cheek piece with double flame, while the easy-to-operate Hand Cocking System (HCS) and other unique Steyr features provide proven accuracy, durability and functionality.',
    hitEnergy: [4653, 4559, 4455, 4360, 4177],
    slug: 'steyr-sm12',
    model: 'SM12',
    tier: 6,
  },
  {
    brand: Brand.Remington,
    calibre: '.300 Win Mag',
    description:
      "The Remington Model 700 Long Range Bolt-Action Rifle is enhanced to hit targets at ranges extending to the horizon. At the heart of this specialized long-range rifle is the famous Model 700 action that has been proven for reliability and precision accuracy in combat with the U.S. Army's M24 sniper rifle.",
    hitEnergy: [4655, 4559, 4455, 4360, 4176],
    slug: 'remington-700-long-range',
    model: '700 Long Range',
    tier: 6,
  },
  {
    brand: Brand.Steyr,
    calibre: '.338 Lapua Mag',
    description:
      'The Steyr Carbon CL II combines the accuracy of a Steyr rifle with a new extra-light carbon fiber stock. Designed by FBT, the new stock not only captivates with its light weight and high stability, it is also "quiet" carbon fiber with the same acoustic characteristics as a wooden stock.',
    hitEnergy: [5989, 5872, 5755, 5637, 5409],
    slug: 'steyr-carbon-cl-ii',
    model: 'Carbon CL II',
    tier: 6,
  },
];
