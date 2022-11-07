import styles from './Background.module.css';
import BackgroundImage from './Background.jpg';

export const Background = () => (
  <div
    className={styles.Background}
    style={{
      backgroundImage: `url("${BackgroundImage.src}")`,
    }}
  ></div>
);
