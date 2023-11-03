import clsx from 'clsx';
import type { TextEllipsisProps } from './types';
import styles from './TextEllipsis.module.css';

export const TextEllipsis = (props: TextEllipsisProps) => {
  const { children, className } = props;

  return <div className={clsx(styles.TextEllipsis, className)}>{children}</div>;
};
