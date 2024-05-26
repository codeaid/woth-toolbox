import { fauna } from 'config/animals';
import { animalHabitatTranslationMap } from 'config/i18n';

export default fauna
  .map(entry =>
    entry.habitatPrimary
      .map(habitat => ({
        ANIMAL: entry.heading,
        HABITAT: animalHabitatTranslationMap.get(habitat),
        TYPE: 0,
      }))
      .concat(
        entry.habitatSecondary?.map(habitat => ({
          ANIMAL: entry.heading,
          HABITAT: animalHabitatTranslationMap.get(habitat),
          TYPE: 1,
        })) ?? [],
      ),
  )
  .flat();
