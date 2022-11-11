import styles from './AnimalActivityGridHeader.module.css';

export const AnimalActivityGridHeader = () => (
  <div className={styles.AnimalActivityGridHeader}>
    <div className={styles.AnimalActivityGridHeaderPlaceholder}>&#8203;</div>

    <div className={styles.AnimalActivityGridHeaderCells}>
      {Array.from(Array(24).keys()).map(hour => {
        return (
          <div className={styles.AnimalActivityGridHeaderCell} key={hour}>
            {hour.toString().padStart(2, '0')}
          </div>
        );
      })}
    </div>
  </div>
);
