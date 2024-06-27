import Image from 'next/image';
import type { ImageProps } from 'next/image';
import styles from './HuntingMapTutorialImage.module.css';

export const HuntingMapTutorialImage = (props: ImageProps) => (
  <div className={styles.HuntingMapTutorialImage}>
    <Image {...props} priority quality={100} />
  </div>
);
