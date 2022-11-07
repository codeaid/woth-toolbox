import { Toolbar } from 'components/Toolbar';
import LayoutBackground from './LayoutBackground.jpg';
import styles from './Layout.module.css';
import { LayoutProps } from './types';

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className={styles.Layout}>
      <Toolbar />
      <div
        className={styles.LayoutBackground}
        style={{ backgroundImage: `url("${LayoutBackground.src}")` }}
      ></div>
      <div className={styles.LayoutContent}>{children}</div>
    </div>
  );
};
