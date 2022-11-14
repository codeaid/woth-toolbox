import { getWeaponName } from 'lib/weapons';
import styles from './WeaponDetails.module.css';
import { WeaponDetailsProps } from './types';

export const WeaponDetails = (props: WeaponDetailsProps) => {
  const { weapon } = props;

  return (
    <div className={styles.WeaponDetails}>
      <div className={styles.WeaponName}>{getWeaponName(weapon)}</div>
      <div className={styles.WeaponNameLatin}>{weapon.calibre}</div>
      <hr />
      <div className={styles.WeaponDescription} key={weapon.model}>
        {weapon.description}
      </div>
      <div className={styles.WeaponStat}>
        <div className={styles.WeaponStatName}>Hunting Tier</div>
        <div className={styles.WeaponStatValue}>{weapon.tier}</div>
      </div>
    </div>
  );
};
