import { useMemo } from 'react';
import { LayoutBackground } from 'components/LayoutBackground';
import { NavLinkProps } from 'components/NavLink';
import { Toolbar } from 'components/Toolbar';
import styles from './Layout.module.css';
import { LayoutProps } from './types';

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  const toolbarActions = useMemo<Array<NavLinkProps>>(
    () => [
      {
        children: 'Weapon Selector',
        href: '/weapon-selector',
      },
      {
        children: 'Animal Selector',
        href: '/animal-selector',
      },
      {
        children: 'Animal Life Cycles',
        href: '/animal-life-cycles',
      },
      {
        children: 'Nez Perce Valley',
        href: '/nez-perce-valley',
      },
      {
        children: 'Transylvania',
        href: '/transylvania',
      },
    ],
    [],
  );

  return (
    <div className={styles.Layout}>
      <Toolbar
        actions={toolbarActions}
        responsiveTitle="WOTH"
        subtitle="Toolbox"
        title="Way Of The Hunter"
      />
      <LayoutBackground />
      <div className={styles.LayoutContent} id="layout-content">
        {children}
      </div>
    </div>
  );
};
