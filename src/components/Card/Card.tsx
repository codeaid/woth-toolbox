import type { PropsWithChildren } from 'react';
import styles from './Card.module.css';

export const Card = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.Card}>{children}</div>;
};
