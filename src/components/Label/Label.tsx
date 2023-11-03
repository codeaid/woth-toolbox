import clsx from 'clsx';
import { useMemo } from 'react';
import type { LabelProps } from './types';
import styles from './Label.module.css';

export const Label = (props: LabelProps) => {
  const { className, ...rest } = props;

  // Generate component class names
  const classNames = useMemo(() => clsx(styles.Label, className), [className]);

  return <label {...rest} className={classNames} />;
};
