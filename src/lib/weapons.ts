import type { Animal } from 'types/animals';
import type { EntityGroup } from 'types/generic';
import type { Translator } from 'types/i18n';
import type { Weapon, WeaponDistance, WeaponEnergyValue } from 'types/weapons';

/**
 * Sort a list of weapons by their tier and name
 *
 * @param weapons List of weapons to sort
 * @param translator Translator
 */
export const getSortedWeapons = (
  weapons: Array<Weapon>,
  translator: Translator,
) =>
  [...weapons].sort((a, b) =>
    a.tier !== b.tier
      ? a.tier - b.tier
      : translator(a.heading).localeCompare(translator(b.heading)),
  );

/**
 * Group weapons by their tier
 *
 * @param weapons List of weapons to group
 * @param translator Translator
 */
export const getWeaponGroups = (
  weapons: Array<Weapon>,
  translator: Translator,
) =>
  getSortedWeapons(weapons, translator).reduce<Array<EntityGroup<Weapon>>>(
    (groups, weapon) => {
      // Attempt to find the existing group for the current tier
      const group = groups.find(g => g.tier === weapon.tier);

      // Create a new group if it doesn't exist
      if (!group) {
        return [...groups, { tier: weapon.tier, entities: [weapon] }];
      }

      return groups.map(group => {
        if (group.tier === weapon.tier) {
          return { ...group, entities: [...group.entities, weapon] };
        }

        return group;
      });
    },
    [],
  );

/**
 * Determine if the specified value is within a range
 *
 * @param value Source value
 * @param from Lower end of the range
 * @param to Upper end of the range
 */
const isWithinRange = (value: number, from: number, to: number) =>
  value > 0 && value >= from && value <= to;

/**
 * Get weapon energy for the specified distance
 *
 * @param weapon Source weapon
 * @param distance Target distance
 */
const getWeaponEnergy = (weapon: Weapon, distance: WeaponDistance) => {
  const map = new Map<WeaponDistance, WeaponEnergyValue>([
    ['50m', weapon.hitEnergy[0]],
    ['100m', weapon.hitEnergy[1]],
    ['150m', weapon.hitEnergy[2]],
    ['200m', weapon.hitEnergy[3]],
    ['300m', weapon.hitEnergy[4]],
  ]);

  return map.get(distance) ?? 0;
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
