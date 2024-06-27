import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
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
import {
  baseUrlAfrica,
  baseUrlAlaska,
  baseUrlAnimals,
  baseUrlFirearms,
  baseUrlIdaho,
  baseUrlLifeCycle,
  baseUrlNewZealand,
  baseUrlTransylvania,
} from 'config/routing';
import { useSettings, useTranslator, useTutorial } from 'hooks';
import { isMapUrl } from 'lib/routing';
import type { ToolbarProps } from './types';
import styles from './Toolbar.module.css';

export const Toolbar = (props: ToolbarProps) => {
  const { subtitle, title } = props;

  // Flag indicating whether the map list menu is visible
  const [mapMenuVisible, setMapMenuVisible] = useState(false);

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
          href: baseUrlAnimals,
        },
        {
          children: translate('UI:SECTION_FIREARMS'),
          href: baseUrlFirearms,
        },
        {
          children: translate('UI:LIFE_CYCLE'),
          href: baseUrlLifeCycle,
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
   * Handle hiding map menu
   */
  const handleHideMapMenu = useCallback(() => setMapMenuVisible(false), []);

  /**
   * Handle hiding mobile menu
   */
  const handleHideMobileMenu = useCallback(
    () => setMobileMenuVisible(false),
    [],
  );

  /**
   * Handle showing map menu
   */
  const handleShowMapMenu = useCallback(() => setMapMenuVisible(true), []);

  /**
   * Handle toggling mobile menu visibility
   */
  const handleToggleMobileMenu = useCallback(
    (event: MouseEvent<EventTarget>) => {
      event.preventDefault();
      event.stopPropagation();

      setMobileMenuVisible(current => !current);
    },
    [],
  );

  /**
   * Handle toggling settings
   */
  const handleToggleSettings = useCallback((event: MouseEvent<EventTarget>) => {
    event.stopPropagation();
    setSettingsVisible(current => !current);
  }, []);

  // Build list of toolbar action items
  const renderedMapActions = useMemo(
    () =>
      [
        {
          children: translate('POI:MAP_NAME_IDAHO'),
          href: baseUrlIdaho,
        },
        {
          children: translate('POI:MAP_NAME_TRANSYLVANIA'),
          href: baseUrlTransylvania,
        },
        {
          children: translate('POI:MAP_NAME_ALASKA'),
          href: baseUrlAlaska,
        },
        {
          children: translate('POI:MAP_NAME_AFRICA'),
          href: baseUrlAfrica,
        },
        {
          children: translate('POI:MAP_NAME_NEW_ZEALAND'),
          href: baseUrlNewZealand,
        },
      ].map((action, index) => (
        <NavLink
          activeClassName={styles.ToolbarActionActive}
          className={styles.ToolbarAction}
          key={index}
          onClick={() => {
            handleHideMobileMenu();
            handleHideMapMenu();
          }}
          {...action}
        />
      )),
    [handleHideMapMenu, handleHideMobileMenu, translate],
  );

  // Mobile menu contents
  const renderedMobileMenu = useMemo(() => {
    // Ensure browser is initialized
    if (typeof window === 'undefined' || !mobileMenuVisible) {
      return null;
    }

    // Render menu into the layout content component
    return createPortal(
      <div className={styles.ToolbarMobileMenu}>
        {baseActions}
        {renderedMapActions}
      </div>,
      document.getElementById('layout-content') ?? document.body,
    );
  }, [baseActions, renderedMapActions, mobileMenuVisible]);

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

          <div
            className={styles.ToolbarActionMenuTrigger}
            onMouseEnter={handleShowMapMenu}
            onMouseLeave={handleHideMapMenu}
            onPointerDown={handleShowMapMenu}
          >
            <div
              className={clsx(styles.ToolbarAction, {
                [styles.ToolbarActionActive]: isMapUrl(window.location.href),
              })}
            >
              {translate('UI:MAP')}
            </div>
            {mapMenuVisible && (
              <div className={styles.ToolbarActionMenu}>
                {renderedMapActions}
              </div>
            )}
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
      {renderedMobileMenu}
    </>
  );
};
