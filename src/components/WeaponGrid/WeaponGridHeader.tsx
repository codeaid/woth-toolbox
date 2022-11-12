import styles from "./WeaponGridHeader.module.css";

export const WeaponGridHeader = () => (
  <div className={styles.WeaponGridHeader}>
    <div className={styles.WeaponGridHeaderDistance}>50m</div>
    <div className={styles.WeaponGridHeaderDistance}>100m</div>
    <div className={styles.WeaponGridHeaderDistance}>150m</div>
    <div className={styles.WeaponGridHeaderDistance}>200m</div>
    <div className={styles.WeaponGridHeaderDistance}>300m</div>
  </div>
)
