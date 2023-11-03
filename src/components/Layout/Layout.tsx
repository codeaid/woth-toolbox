import { LayoutBackground } from 'components/LayoutBackground';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { Toolbar } from 'components/Toolbar';
import { useTranslator } from 'hooks';
import type { LayoutProps } from './types';
import styles from './Layout.module.css';

export const Layout = (props: LayoutProps) => {
  const { children, ready = false } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // Ensure application is ready before rendering its content
  if (!ready) {
    return <LoadingOverlay />;
  }

  return (
    <div className={styles.Layout}>
      <Toolbar
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
