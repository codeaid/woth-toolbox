import { useTranslator } from 'hooks';
import styles from './WeaponDetails.module.css';
import { WeaponDetailsProps } from './types';

export const WeaponDetails = (props: WeaponDetailsProps) => {
  const { weapon } = props;

  // Retrieve application translator
  const translate = useTranslator();

  return (
    <div className={styles.WeaponDetails}>
      <div className={styles.WeaponDetailsName}>
        {translate(weapon.heading)}
      </div>
      <div className={styles.WeaponDetailsNameCaliber}>
        {translate(weapon.caliber)}
      </div>
      <hr />
      <div className={styles.WeaponDetailsDescription} key={weapon.heading}>
        {translate(weapon.description)}
      </div>
      <div className={styles.WeaponDetailsStat}>
        <div className={styles.WeaponDetailsStatName}>
          {translate('WEAPON:ACTION')}
        </div>
        <div className={styles.WeaponDetailsStatValue}>
          {translate(weapon.action)}
        </div>
      </div>
      <div className={styles.WeaponDetailsStat}>
        <div className={styles.WeaponDetailsStatName}>
          {translate('UI:TIER')}
        </div>
        <div className={styles.WeaponDetailsStatValue}>{weapon.tier}</div>
      </div>
    </div>
  );
};
