import { baseUrl } from 'config/app';
import styles from './Background.module.css';

export const Background = () => (
  <div
    className={styles.Background}
    style={{
      backgroundImage: `url("${baseUrl}/img/cover.jpg")`,
    }}
  ></div>
);
