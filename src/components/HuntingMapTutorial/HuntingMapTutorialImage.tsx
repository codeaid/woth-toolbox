import type { ImgHTMLAttributes } from 'react';
import styles from './HuntingMapTutorialImage.module.css';

export const HuntingMapTutorialImage = (
  props: ImgHTMLAttributes<HTMLImageElement>,
) => (
  <div className={styles.HuntingMapTutorialImage}>
    <img alt="" {...props} />
  </div>
);
