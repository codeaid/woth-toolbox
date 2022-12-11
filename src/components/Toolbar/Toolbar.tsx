import classnames from 'classnames';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiMenuLine, RiSettings2Line } from 'react-icons/ri';
import { IconButton } from 'components/IconButton';
import { NavLink } from 'components/NavLink';
import { SettingsEditor } from 'components/SettingsEditor';
import { useApplicationSettings } from 'hooks';
import { ToolbarProps } from './types';
import styles from './Toolbar.module.css';

export const Toolbar = (props: ToolbarProps) => {
  const { actions, subtitle, title } = props;

  // Flag indicating whether the mobile menu is currently visible
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Flag indicating whether the settings panel is visible
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Extract current application settings and their updater
  const { settings, onSettingsChange } = useApplicationSettings();

  // Retrieve current application path
  const { asPath } = useRouter();

  // Build list of links to render
  const children = useMemo(
    () =>
      actions.map((action, index) => (
        <NavLink
          activeClassName={styles.ToolbarActionActive}
          className={styles.ToolbarAction}
          key={index}
          {...action}
        />
      )),
    [actions],
  );

  // Mobile menu contents
  const mobileMenu = useMemo(() => {
    // Ensure browser is initialized
    if (typeof window === 'undefined') {
      return null;
    }

    // Ensure menu is visible before proceeding
    if (!mobileMenuVisible) {
      return;
    }

    // Render menu into the layout content component
    return createPortal(
      <div className={styles.ToolbarMobileMenu}>{children}</div>,
      document.getElementById('layout-content') ?? document.body,
    );
  }, [children, mobileMenuVisible]);

  /**
   * Handle hiding settings
   */
  const handleHideSettings = useCallback(() => setSettingsVisible(false), []);

  /**
   * Handle toggling settings
   */
  const handleToggleSettings = useCallback((event: MouseEvent<EventTarget>) => {
    event.stopPropagation();
    setSettingsVisible(current => !current);
  }, []);

  /**
   * Handle showing or hiding mobile menu
   */
  const handleToggleMobileMenu = useCallback(
    (event: MouseEvent<EventTarget>) => {
      event.preventDefault();
      event.stopPropagation();

      setMobileMenuVisible(current => !current);
    },
    [],
  );

  // Rendered settings panel
  const renderedSettings = useMemo(() => {
    // Ensure browser is initialized
    if (typeof window === 'undefined') {
      return null;
    }

    return createPortal(
      <SettingsEditor
        settings={settings}
        visible={settingsVisible}
        onChange={onSettingsChange}
        onClose={handleHideSettings}
      />,
      document.getElementById('layout-content') ?? document.body,
    );
  }, [handleHideSettings, onSettingsChange, settings, settingsVisible]);

  // Hide mobile menu when navigating to a new page
  useEffect(() => setMobileMenuVisible(false), [asPath]);

  return (
    <>
      <div className={styles.Toolbar}>
        <button
          className={classnames(styles.ToolbarMobileButton, {
            [styles.ToolbarMobileButtonActive]: mobileMenuVisible,
          })}
          tabIndex={-1}
          onClick={handleToggleMobileMenu}
        >
          <div className={styles.ToolbarMobileButtonContent}>
            <RiMenuLine className={styles.ToolbarMobileButtonIcon} />
          </div>
        </button>
        <div className={styles.ToolbarHeading}>
          <div className={styles.ToolbarTitle}>{title}</div>
          <div className={styles.ToolbarSubtitle}>{subtitle}</div>
        </div>
        <div className={styles.ToolbarActions}>{children}</div>
        <div className={styles.ToolbarSettingsButton}>
          <IconButton onClick={handleToggleSettings}>
            <RiSettings2Line />
          </IconButton>
        </div>
      </div>
      {renderedSettings}
      {mobileMenu}
    </>
  );
};
