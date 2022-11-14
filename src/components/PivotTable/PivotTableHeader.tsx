import styles from './PivotTableHeader.module.css';

export const PivotTableHeader = () => (
  <div className={styles.PivotTableHeader}>
    <div className={styles.PivotTableHeaderDistance}>50m</div>
    <div className={styles.PivotTableHeaderDistance}>100m</div>
    <div className={styles.PivotTableHeaderDistance}>150m</div>
    <div className={styles.PivotTableHeaderDistance}>200m</div>
    <div className={styles.PivotTableHeaderDistance}>300m</div>
  </div>
);
