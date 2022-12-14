import { useMemo } from 'react';
import { LayoutBackground } from 'components/LayoutBackground';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { NavLinkProps } from 'components/NavLink';
import { Toolbar } from 'components/Toolbar';
import { useTranslator } from 'hooks';
import styles from './Layout.module.css';
import { LayoutProps } from './types';

export const Layout = (props: LayoutProps) => {
  const { children, ready = false } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // Build list of toolbar action items
  const toolbarActions = useMemo<Array<NavLinkProps>>(
    () =>
      ready
        ? [
            {
              children: translate('UI:SECTION_ANIMALS'),
              href: '/animals',
            },
            {
              children: translate('UI:SECTION_FIREARMS'),
              href: '/firearms',
            },
            {
              children: translate('UI:LIFE_CYCLE'),
              href: '/life-cycle',
            },
            {
              children: translate('POI:MAP_NAME_IDAHO'),
              href: '/nez-perce-valley',
            },
            {
              children: translate('POI:MAP_NAME_TRANSYLVANIA'),
              href: '/transylvania',
            },
          ]
        : [],
    [ready, translate],
  );

  // Ensure application is ready before rendering its content
  if (!ready) {
    return <LoadingOverlay />;
  }

  return (
    <div className={styles.Layout}>
      <Toolbar
        actions={toolbarActions}
        subtitle={translate('TOOLBOX:TITLE')}
        title={translate('UI:GAME_TITLE')}
      />
      <LayoutBackground />
      <div className={styles.LayoutContent} id="layout-content">
        {children}
      </div>
    </div>
  );
};
