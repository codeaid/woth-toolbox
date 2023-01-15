import Image, { ImageProps } from 'next/image';
import styles from './HuntingMapTutorialImage.module.css';

export const HuntingMapTutorialImage = (props: ImageProps) => (
  <div className={styles.HuntingMapTutorialImage}>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <Image {...props} priority={true} quality={100} />
  </div>
);
