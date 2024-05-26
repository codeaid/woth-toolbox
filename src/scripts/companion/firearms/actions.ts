import { weapons } from 'config/weapons';
import type { TranslationKey } from 'types/i18n';

// List of unique weapon actions
const set = weapons.reduce(
  (acc, curr) => acc.add(curr.action),
  new Set<TranslationKey | undefined>(),
);

export default [...set]
  .filter(value => !!value)
  .map(translationKey => ({
    ID: translationKey,
  }));
