import clsx from 'clsx';
import { useMemo } from 'react';
import { useLocale, useTranslator } from 'hooks';
import { getAnimalHabitatKey } from 'lib/i18n';
import { getIconComponent } from 'lib/icons';
import { formatNumber } from 'lib/utils';
import type { AnimalDetailsProps } from './types';
import styles from './AnimalDetails.module.css';

export const AnimalDetails = (props: AnimalDetailsProps) => {
  const { animal } = props;

  // Extract animal's hit energy values
  const { hitEnergy } = animal;
  const [energyFrom, energyTo] = hitEnergy;

  // Retrieve application locale and translator
  const locale = useLocale();
  const translate = useTranslator();

  // Retrieve icon associated with the current animal
  const AnimalIcon = useMemo(
    () => getIconComponent(animal.type),
    [animal.type],
  );

  return (
    <div className={styles.AnimalDetails}>
      <div className={styles.AnimalDetailsHeading}>
        <div className={styles.AnimalDetailsName}>
          {translate(animal.heading)}
        </div>
        <div className={styles.AnimalDetailsNameLatin}>
          {translate(animal.latin)}
        </div>
        <AnimalIcon className={styles.AnimalDetailsIcon} size={50} />
      </div>
      <hr />
      <div className={styles.AnimalDetailsDescription} key={animal.heading}>
        {translate(animal.description)}
      </div>

      <div className={styles.AnimalDetailsStats}>
        <div
          className={clsx(styles.AnimalDetailsStat, styles.AnimalDetailsStat1)}
        >
          <div className={styles.AnimalDetailsStatName}>
            {translate('UI:TIER')}
          </div>
          <div className={styles.AnimalDetailsStatValue}>{animal.tier}</div>
        </div>
        <div
          className={clsx(styles.AnimalDetailsStat, styles.AnimalDetailsStat2)}
        >
          <div className={styles.AnimalDetailsStatName}>
            {translate('UI:OPTIMAL_ENERGY')}
          </div>
          <div className={styles.AnimalDetailsStatValue}>{`${formatNumber(
            energyFrom,
            locale,
          )} - ${formatNumber(energyTo, locale)} J`}</div>
        </div>
        <div
          className={clsx(styles.AnimalDetailsStat, styles.AnimalDetailsStat3)}
        >
          <div className={styles.AnimalDetailsStatName}>
            {translate('ANIMAL:ANIMAL_HABITAT_PRIMARY')}
          </div>
          <div className={styles.AnimalDetailsStatValue}>
            {animal.habitatPrimary
              .map(getAnimalHabitatKey)
              .map(translate)
              .join(', ')}
          </div>
        </div>
        <div
          className={clsx(styles.AnimalDetailsStat, styles.AnimalDetailsStat4)}
        >
          <div className={styles.AnimalDetailsStatName}>
            {translate('ANIMAL:ANIMAL_HABITAT_SECONDARY')}
          </div>
          <div className={styles.AnimalDetailsStatValue}>
            {animal.habitatSecondary
              ? animal.habitatSecondary
                  .map(getAnimalHabitatKey)
                  .map(translate)
                  .join(', ')
              : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};
