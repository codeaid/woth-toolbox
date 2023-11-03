import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { IconButton } from 'components/IconButton';
import styles from './Sidebar.module.css';

export const Sidebar = (props: PropsWithChildren) => {
  const { children } = props;

  // Flags indicating whether mobile sidebar is enabled and expanded
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarFloating, setSidebarFloating] = useState(false);

  /**
   * Handle clicking on the collapse/expand button
   */
  const handleButtonClick = useCallback(
    () => setSidebarExpanded(current => !current),
    [],
  );

  // Render toggle button
  const renderedButton = useMemo(() => {
    // Only render the button when sidebar is floating (mobile mode)
    if (!sidebarFloating) {
      return;
    }

    return (
      <IconButton className={styles.SidebarButton} onClick={handleButtonClick}>
        {sidebarExpanded ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
      </IconButton>
    );
  }, [sidebarFloating, handleButtonClick, sidebarExpanded]);

  // Observe changes to document width and toggle sidebar's visibility
  useEffect(() => {
    // Instantiate a new observer
    const observer = new ResizeObserver(entries => {
      const [entry] = entries;

      // Mark sidebar as floating on mobile devices
      const isMobile = entry.contentRect.width <= 768;
      setSidebarFloating(isMobile);
    });

    // Start observing document width
    observer.observe(document.body);

    // Disconnect observer on unmount
    return () => observer.disconnect();
  }, []);

  // Close sidebar when it first becomes floating
  useEffect(() => {
    setSidebarExpanded(!sidebarFloating);
  }, [sidebarFloating]);

  return (
    <div
      className={clsx(styles.SidebarWrapper, {
        [styles.SidebarWrapperExpanded]: sidebarExpanded,
      })}
    >
      {renderedButton}
      <div className={styles.Sidebar}>{children}</div>
    </div>
  );
};
