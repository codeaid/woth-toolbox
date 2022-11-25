import {
  Toolbar,
  ToolbarAction,
  ToolbarActions,
  ToolbarTitle,
} from 'components/Toolbar';
import LayoutBackground from './LayoutBackground.jpg';
import styles from './Layout.module.css';
import { LayoutProps } from './types';

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className={styles.Layout}>
      <Toolbar>
        <ToolbarTitle>Way Of The Hunter Toolbox</ToolbarTitle>
        <ToolbarActions>
          <ToolbarAction href="/weapon-selector">Weapon Selector</ToolbarAction>
          <ToolbarAction href="/animal-selector">Animal Selector</ToolbarAction>
          <ToolbarAction href="/animal-life-cycles">
            Animal Life Cycles
          </ToolbarAction>
          <ToolbarAction href="/nez-perce-valley">
            Nez Perce Valley
          </ToolbarAction>
        </ToolbarActions>
      </Toolbar>

      <div
        className={styles.LayoutBackground}
        style={{ backgroundImage: `url("${LayoutBackground.src}")` }}
      ></div>
      <div className={styles.LayoutContent}>{children}</div>
    </div>
  );
};
