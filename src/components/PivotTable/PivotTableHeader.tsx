import { useTranslator } from 'hooks';
import styles from './PivotTableHeader.module.css';

export const PivotTableHeader = () => {
  // Retrieve application translator
  const translate = useTranslator();

  return (
    <div className={styles.PivotTableHeader}>
      <div className={styles.PivotTableHeaderDistance}>{`50${translate(
        'UNITS:METRIC_METERS',
      )}`}</div>
      <div className={styles.PivotTableHeaderDistance}>{`100${translate(
        'UNITS:METRIC_METERS',
      )}`}</div>
      <div className={styles.PivotTableHeaderDistance}>{`150${translate(
        'UNITS:METRIC_METERS',
      )}`}</div>
      <div className={styles.PivotTableHeaderDistance}>{`200${translate(
        'UNITS:METRIC_METERS',
      )}`}</div>
      <div className={styles.PivotTableHeaderDistance}>{`300${translate(
        'UNITS:METRIC_METERS',
      )}`}</div>
    </div>
  );
};
