import classnames from 'classnames';
import { useMemo } from 'react';
import { baseUrl } from 'config/app';
import { iconMap } from './config';
import { MarkerProps } from './types';
import styles from './Marker.module.css';

export const Marker = (props: MarkerProps) => {
  const { alt = '', className, size = 128, style, title, type } = props;

  // Combine custom class names with internal ones
  const classNames = useMemo(
    () => classnames(styles.Marker, className),
    [className],
  );

  // Retrieve image source file for the current type
  const imageName = useMemo(() => iconMap[type] ?? 'default', [type]);
  const imageSrc = useMemo(
    () => `${baseUrl}/img/markers/${imageName}.png`,
    [imageName],
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={classNames}
      draggable={false}
      height={size}
      src={imageSrc}
      style={style}
      title={title}
      width={size}
    />
  );
};
