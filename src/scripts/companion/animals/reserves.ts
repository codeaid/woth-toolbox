import { fauna } from 'config/animals';
import { mapTypeTranslationMap } from 'config/i18n';

export default fauna
  .map(
    entry =>
      entry.maps?.map(mapType => ({
        ANIMAL: entry.heading,
        RESERVE: mapTypeTranslationMap.get(mapType),
      })) ?? [],
  )
  .flat();
