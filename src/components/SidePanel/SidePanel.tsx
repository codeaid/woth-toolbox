import classnames from 'classnames';
import { useMemo, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { Transition } from 'react-transition-group';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { SidePanelProps } from './types';
import styles from './SidePanel.module.css';

export const SidePanel = (props: SidePanelProps) => {
  const {
    actions = [],
    children,
    className,
    style,
    title,
    visible = false,
    onClose,
  } = props;

  // Reference to the main side panel element
  const ref = useRef<HTMLDivElement>(null);

  // Pre-render side panel actions
  const renderedActions = useMemo(() => {
    if (!actions || !actions.length) {
      return;
    }

    return (
      <div className={styles.SidePanelActions}>
        {actions.map((action, index) => (
          <Button {...action} key={index} />
        ))}
      </div>
    );
  }, [actions]);

  return (
    <Transition
      in={visible}
      mountOnEnter={true}
      nodeRef={ref}
      timeout={100}
      unmountOnExit={true}
    >
      {state => (
        <div
          className={classnames(
            styles.SidePanel,
            {
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
          <div className={styles.SidePanelContent}>{children}</div>
          {renderedActions}
        </div>
      )}
    </Transition>
  );
};
