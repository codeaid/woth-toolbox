import { animalHabitatTranslationMap } from 'config/i18n';

export default [...animalHabitatTranslationMap].map(([, translationKey]) => ({
  ID: translationKey,
}));
