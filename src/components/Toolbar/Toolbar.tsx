import classnames from 'classnames';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiMenuLine } from 'react-icons/ri';
import { NavLink } from 'components/NavLink';
import { ToolbarProps } from './types';
import styles from './Toolbar.module.css';

export const Toolbar = (props: ToolbarProps) => {
  const { actions, subtitle, title } = props;

  // Flag indicating whether the mobile menu is currently visible
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

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
    // Ensure menu is visible before proceeding
    if (!mobileMenuVisible) {
      return;
    }

    // Render menu into the layout content component
    return createPortal(
      <div className={styles.ToolbarMobileMenu}>{children}</div>,
      document.getElementById('layout-content') || document.body,
    );
  }, [children, mobileMenuVisible]);

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
      </div>
      {mobileMenu}
    </>
  );
};
