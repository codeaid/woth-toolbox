import { useLocale, useTranslator } from 'hooks';
import { formatNumber } from 'lib/utils';
import styles from './AnimalDetails.module.css';
import { AnimalDetailsProps } from './types';

export const AnimalDetails = (props: AnimalDetailsProps) => {
  const { animal } = props;

  // Extract animal's hit energy values
  const { hitEnergy } = animal;
  const [energyFrom, energyTo] = hitEnergy;

  // Retrieve application locale and translator
  const locale = useLocale();
  const translate = useTranslator();

  return (
    <div className={styles.AnimalDetails}>
      <div className={styles.AnimalDetailsName}>
        {translate(animal.heading)}
      </div>
      <div className={styles.AnimalDetailsNameLatin}>
        {translate(animal.latin)}
      </div>
      <hr />
      <div className={styles.AnimalDetailsDescription} key={animal.heading}>
        {translate(animal.description)}
      </div>
      <div className={styles.AnimalDetailsStat}>
        <div className={styles.AnimalDetailsStatName}>
          {translate('UI:TIER')}
        </div>
        <div className={styles.AnimalDetailsStatValue}>{animal.tier}</div>
      </div>
      <div className={styles.AnimalDetailsStat}>
        <div className={styles.AnimalDetailsStatName}>
          {translate('UI:OPTIMAL_ENERGY')}
        </div>
        <div className={styles.AnimalDetailsStatValue}>{`${formatNumber(
          energyFrom,
          locale,
        )} - ${formatNumber(energyTo, locale)} J`}</div>
      </div>
    </div>
  );
};
