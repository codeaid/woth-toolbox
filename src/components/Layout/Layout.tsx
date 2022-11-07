import { Background } from 'components/Background';
import { Header } from 'components/Header';
import styles from './Layout.module.css';
import { LayoutProps } from './types';

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className={styles.Layout}>
      <Header>Way Of The Hunter Toolbox</Header>
      <Background />
      <div className={styles.LayoutContent}>{children}</div>
    </div>
  );
};
