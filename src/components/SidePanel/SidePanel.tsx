import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { Transition } from 'react-transition-group';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { Spinner } from 'components/Spinner';
import { SidePanelProps } from './types';
import styles from './SidePanel.module.css';

export const SidePanel = (props: SidePanelProps) => {
  const {
    actions = [],
    children,
    className,
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
  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      // Check if the click occurred inside the panel component
      const clickOnSidePanel = ref.current
        ? ref.current.contains(event.target as Node)
        : false;

      // Close the panel if clicked outside the component
      if (!clickOnSidePanel && onClose) {
        onClose();
      }
    },
    [onClose],
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
    // Do not register event listeners if panel shouldn't be closed on outside clicks
    if (!closeOnOutsideClick) {
      return;
    }

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [closeOnOutsideClick, handleDocumentClick]);

  return (
    <Transition
      in={visible}
      mountOnEnter={true}
      nodeRef={ref}
      timeout={100}
      onEntering={handleEntering}
      onExited={handleExited}
      unmountOnExit={true}
    >
      {state => (
        <div
          className={classnames(
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
