import clsx from 'clsx';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaDiscord } from 'react-icons/fa';
import {
  RiMenuLine,
  RiQuestionLine,
  RiSettings2Line,
  RiSteamFill,
} from 'react-icons/ri';
import { IconButton } from 'components/IconButton';
import { NavLink } from 'components/NavLink';
import { SettingsEditor } from 'components/SettingsEditor';
import { urlDiscord, urlSteam } from 'config/app';
import { useSettings, useTranslator, useTutorial } from 'hooks';
import { ToolbarProps } from './types';
import styles from './Toolbar.module.css';

export const Toolbar = (props: ToolbarProps) => {
  const { subtitle, title } = props;

  // Flag indicating whether the mobile menu is currently visible
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Flag indicating whether the settings panel is visible
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Retrieve current application path
  const { asPath } = useRouter();

  // Retrieve application settings and their updater
  const { settings, onChange: onSettingsChange } = useSettings();

  // Retrieve map tutorial state and open functionality
  const { enabled: tutorialEnabled, onTutorialOpen } = useTutorial();

  // Retrieve application translator
  const translate = useTranslator();

  // Build list of toolbar action items
  const baseActions = useMemo(
    () =>
      [
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
      ].map((action, index) => (
        <NavLink
          activeClassName={styles.ToolbarActionActive}
          className={styles.ToolbarAction}
          key={index}
          {...action}
        />
      )),
    [translate],
  );

  // Build list of toolbar action items
  const mapActions = useMemo(
    () =>
      [
        {
          children: translate('POI:MAP_NAME_IDAHO'),
          href: '/nez-perce-valley',
        },
        {
          children: translate('POI:MAP_NAME_TRANSYLVANIA'),
          href: '/transylvania',
        },
        {
          children: translate('POI:MAP_NAME_ALASKA'),
          href: '/alaska',
        },
        {
          children: translate('POI:MAP_NAME_AFRICA'),
          href: '/africa',
        },
      ].map((action, index) => (
        <NavLink
          activeClassName={styles.ToolbarActionActive}
          className={styles.ToolbarAction}
          key={index}
          {...action}
        />
      )),
    [translate],
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
      <div className={styles.ToolbarMobileMenu}>
        {baseActions}
        {mapActions}
      </div>,
      document.getElementById('layout-content') ?? document.body,
    );
  }, [baseActions, mapActions, mobileMenuVisible]);

  /**
   * Handle hiding settings
   */
  const handleHideSettings = useCallback(() => setSettingsVisible(false), []);

  /**
   * Handle opening game's Discord server
   */
  const handleOpenDiscord = useCallback(
    () => window?.open(urlDiscord, '_blank')?.focus(),
    [],
  );

  /**
   * Handle opening game's Steam guide
   */
  const handleOpenSteam = useCallback(
    () => window?.open(urlSteam, '_blank')?.focus(),
    [],
  );

  /**
   * Handle opening tutorial
   */
  const handleOpenTutorial = useCallback(
    () => onTutorialOpen(1),
    [onTutorialOpen],
  );

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
          className={clsx(styles.ToolbarMobileButton, {
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

        <div className={styles.ToolbarActions}>
          {baseActions}

          <div className={styles.ToolbarActionMenuTrigger}>
            <div className={styles.ToolbarAction}>{translate('UI:MAP')}</div>
            <div className={styles.ToolbarActionMenu}>{mapActions}</div>
          </div>
        </div>

        <div className={styles.ToolbarButtons}>
          {tutorialEnabled && (
            <IconButton
              title={translate('UI:TUTORIAL')}
              onClick={handleOpenTutorial}
            >
              <RiQuestionLine />
            </IconButton>
          )}
          <IconButton title="Discord" onClick={handleOpenDiscord}>
            <FaDiscord />
          </IconButton>
          <IconButton title="Steam" onClick={handleOpenSteam}>
            <RiSteamFill />
          </IconButton>
          <IconButton
            title={translate('UI:SETTINGS')}
            onMouseDown={handleToggleSettings}
          >
            <RiSettings2Line />
          </IconButton>
        </div>
      </div>

      {renderedSettings}
      {mobileMenu}
    </>
  );
};
