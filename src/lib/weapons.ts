import { Animal } from 'types/animals';
import { Brand, Weapon, WeaponDistance, WeaponGroup } from 'types/weapons';

/**
 * Sort a list of weapons by their tier and name
 *
 * @param weapons List of weapons to sort
 */
export const getSortedWeapons = (weapons: Array<Weapon>) =>
  [...weapons].sort((a, b) =>
    a.tier !== b.tier
      ? a.tier - b.tier
      : getWeaponName(a).localeCompare(getWeaponName(b)),
  );

/**
 * Group weapons by their tier
 *
 * @param weapons List of weapons to group
 */
export const getWeaponGroups = (weapons: Array<Weapon>) =>
  getSortedWeapons(weapons).reduce<Array<WeaponGroup>>((groups, weapon) => {
    // Attempt to find the existing group for the current tier
    const group = groups.find(g => g.tier === weapon.tier);

    // Create a new group if it doesn't exist
    if (!group) {
      return [...groups, { tier: weapon.tier, weapons: [weapon] }];
    }

    return groups.map(group => {
      if (group.tier === weapon.tier) {
        return { ...group, weapons: [...group.weapons, weapon] };
      }

      return group;
    });
  }, []);

/**
 * Get weapon brand name
 *
 * @param brand Source weapon brand
 */
export const getBrandName = (brand: Brand) => {
  switch (brand) {
    case Brand.Remington:
      return 'Remington';
    case Brand.Stinger:
      return 'Stinger';
    case Brand.Steyr:
      return 'Steyr';
    case Brand.Unknown:
      return '';
  }
};

/**
 * Get full weapon name
 *
 * @param weapon Source weapon
 */
export const getWeaponName = (weapon: Weapon) =>
  [getBrandName(weapon.brand), weapon.model].filter(value => !!value).join(' ');

/**
 * Determine if the specified value is within a range
 *
 * @param value Source value
 * @param from Lower end of the range
 * @param to Upper end of the range
 */
const isWithinRange = (value: number, from: number, to: number) =>
  value >= from && value <= to;

/**
 * Get weapon energy for the specified distance
 *
 * @param weapon Source weapon
 * @param distance Target distance
 */
const getWeaponEnergy = (weapon: Weapon, distance: WeaponDistance) => {
  const [m50, m100, m150, m200, m300] = weapon.hitEnergy;

  switch (distance) {
    case WeaponDistance.M50:
      return m50;
    case WeaponDistance.M100:
      return m100;
    case WeaponDistance.M150:
      return m150;
    case WeaponDistance.M200:
      return m200;
    case WeaponDistance.M300:
      return m300;
    default:
      return 0;
  }
};

/**
 * Check if a weapon is optimal for an animal at the specified distance
 *
 * @param animal Source animal
 * @param weapon Source weapon
 * @param distance Target distance
 */
export const isOptimal = (
  animal: Animal,
  weapon: Weapon,
  distance: WeaponDistance,
) => {
  const [animalFrom, animalTo] = animal.hitEnergy;

  // Retrieve weapon hit energy at the specified distance
  const distanceEnergy = getWeaponEnergy(weapon, distance);

  // Determine if weapon is optimal at the specified distance
  return isWithinRange(distanceEnergy, animalFrom, animalTo);
};

/**
 * Check if a weapon is suboptimal for an animal at the specified distance
 *
 * @param animal Source animal
 * @param weapon Source weapon
 * @param distance Target distance
 * @param maxDeviation Allowed deviation (0-1)
 */
export const isSuboptimal = (
  animal: Animal,
  weapon: Weapon,
  distance: WeaponDistance,
  maxDeviation = 0.1,
) => {
  // Extract animal hit energy range boundaries
  const [animalFrom, animalTo] = animal.hitEnergy;

  // Calculate maximum hit energy deviation value
  const energyDiff = animalTo - animalFrom;
  const energyOffset = Math.round(energyDiff * maxDeviation);

  // Calculate weapon hit energy at the specified distance
  const weaponEnergy = getWeaponEnergy(weapon, distance);

  // Determine if the hit energy is just over or under the ethical hit energy
  const isUnderpowered = isWithinRange(
    weaponEnergy,
    animalFrom - energyOffset,
    animalFrom,
  );
  const isOverpowered = isWithinRange(
    weaponEnergy,
    animalTo,
    animalTo + energyOffset,
  );

  return isUnderpowered || isOverpowered;
};
