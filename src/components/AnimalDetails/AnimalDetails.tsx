import { formatNumber } from 'lib/utils';
import styles from './AnimalDetails.module.css';
import { AnimalDetailsProps } from './types';

export const AnimalDetails = (props: AnimalDetailsProps) => {
  const { animal } = props;

  // Extract animal's hit energy values
  const { hitEnergy } = animal;
  const [energyFrom, energyTo] = hitEnergy;

  return (
    <div className={styles.AnimalDetails}>
      <div className={styles.AnimalName}>{animal.name}</div>
      <div className={styles.AnimalNameLatin}>{animal.latin}</div>
      <hr />
      <div className={styles.AnimalDescription} key={animal.name}>
        {animal.description}
      </div>
      <div className={styles.AnimalStat}>
        <div className={styles.AnimalStatName}>Hunting Tier</div>
        <div className={styles.AnimalStatValue}>{animal.tier}</div>
      </div>
      <div className={styles.AnimalStat}>
        <div className={styles.AnimalStatName}>Recommended Hit Energy</div>
        <div className={styles.AnimalStatValue}>{`${formatNumber(
          energyFrom,
        )} - ${formatNumber(energyTo)} J`}</div>
      </div>
    </div>
  );
};
