import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { Transition } from 'react-transition-group';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { Spinner } from 'components/Spinner';
import type { SidePanelProps } from './types';
import styles from './SidePanel.module.css';

export const SidePanel = (props: SidePanelProps) => {
  const {
    actions = [],
    children,
    className,
    closeOnEscape = true,
    closeOnOutsideClick = false,
    loading = false,
    side = 'right',
    style,
    title,
    visible = false,
    onClose,
    onVisible,
  } = props;

  // Reference to the main side panel element
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Handle clicks anywhere on the document
   */
  const handleDocumentMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!closeOnOutsideClick || !onClose) {
        return;
      }

      // Check if the click occurred inside the panel component
      const clickedOnSidePanel = ref.current
        ? ref.current.contains(event.target as Node)
        : false;

      // Close the panel if clicked outside the component
      if (!clickedOnSidePanel) {
        onClose();
      }
    },
    [closeOnOutsideClick, onClose],
  );

  /**
   * Handle pressing keyboard keys
   */
  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!closeOnEscape || !onClose) {
        return;
      }

      // Close side panel on Escape key
      if (event.key === 'Esc' || event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose],
  );

  /**
   * Handle sidebar entering
   */
  const handleEntering = useCallback(
    () => onVisible && onVisible(true),
    [onVisible],
  );

  /**
   * Handle sidebar exited
   */
  const handleExited = useCallback(
    () => onVisible && onVisible(false),
    [onVisible],
  );

  // Pre-render side panel actions
  const renderedActions = useMemo(() => {
    if (!actions || !actions.length) {
      return null;
    }

    return (
      <div className={styles.SidePanelActions}>
        {actions.map((action, index) => (
          <Button {...action} key={index} />
        ))}
      </div>
    );
  }, [actions]);

  // Render the loading overlay
  const renderedLoader = useMemo(() => {
    if (!loading) {
      return null;
    }

    return (
      <div className={styles.SidePanelLoadingOverlay}>
        <Spinner />
      </div>
    );
  }, [loading]);

  // Register event handlers to handle closing side panel on outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentMouseDown);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [handleDocumentMouseDown, handleDocumentKeyDown]);

  return (
    <Transition
      in={visible}
      mountOnEnter
      nodeRef={ref}
      timeout={100}
      unmountOnExit
      onEntering={handleEntering}
      onExited={handleExited}
    >
      {state => (
        <div
          className={clsx(
            styles.SidePanel,
            {
              [styles.SidePanelLeft]: side === 'left',
              [styles.SidePanelRight]: side === 'right',
              [styles.SidePanelEntering]: state === 'entering',
              [styles.SidePanelEntered]: state === 'entered',
              [styles.SidePanelExiting]: state === 'exiting',
              [styles.SidePanelExited]: state === 'exited',
            },
            className,
          )}
          draggable={false}
          ref={ref}
          style={style}
        >
          <div className={styles.SidePanelHeader}>
            <h1 className={styles.SidePanelHeaderTitle}>{title}</h1>
            <IconButton
              className={styles.SidePanelHeaderAction}
              onClick={onClose}
            >
              <RiCloseFill />
            </IconButton>
          </div>

          <div className={styles.SidePanelContainer}>
            {renderedLoader}
            <div className={styles.SidePanelContent}>{children}</div>
            {renderedActions}
          </div>
        </div>
      )}
    </Transition>
  );
};
