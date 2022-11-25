import LayoutBackgroundImage from './LayoutBackground.jpg';
import styles from './LayoutBackground.module.css';

export const LayoutBackground = () => (
  <div
    className={styles.LayoutBackground}
    style={{ backgroundImage: `url("${LayoutBackgroundImage.src}")` }}
  ></div>
);
