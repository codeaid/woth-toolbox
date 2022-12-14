import classnames from 'classnames';
import { useMemo } from 'react';
import { LabelProps } from './types';
import styles from './Label.module.css';

export const Label = (props: LabelProps) => {
  const { className, ...rest } = props;

  // Generate component class names
  const classNames = useMemo(
    () => classnames(styles.Label, className),
    [className],
  );

  return <label {...rest} className={classNames} />;
};
