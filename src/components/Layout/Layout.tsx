import { Background } from 'components/Background';
import { Toolbar } from 'components/Toolbar';
import styles from './Layout.module.css';
import { LayoutProps } from './types';

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className={styles.Layout}>
      <Toolbar>Way Of The Hunter Toolbox</Toolbar>
      <Background />
      <div className={styles.LayoutContent}>{children}</div>
    </div>
  );
};
