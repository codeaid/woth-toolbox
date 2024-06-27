import { weapons } from 'config/weapons';
import type { TranslationKey } from 'types/i18n';

// List of unique weapon calibers
const set = weapons.reduce(
  (acc, curr) => acc.add(curr.caliber),
  new Set<TranslationKey | undefined>(),
);

const extraBowCaliber = 'WEAPON:BOW_00_CALIBER';

export default [...set, extraBowCaliber]
  .filter(value => !!value)
  .map(translationKey => ({
    ID: translationKey,
  }));
