import clsx from 'clsx';
import { useEffect, useMemo, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { Transition } from 'react-transition-group';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { TextEllipsis } from 'components/TextEllipsis';
import type { ModalProps } from './types';
import styles from './Modal.module.css';

export const Modal = (props: ModalProps) => {
  const {
    actions,
    blur = true,
    canClose = true,
    children,
    className,
    header,
    visible = true,
    onClose,
  } = props;

  // Reference to the main modal wrapper element and its body
  const bodyRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Pre-render modal actions
  const renderedActions = useMemo(() => {
    if (!actions || !actions.length) {
      return null;
    }

    return (
      <div className={styles.ModalActions}>
        {actions.map((action, index) => (
          <Button
            {...action}
            className={clsx(styles.ModalAction, action.className)}
            key={index}
          />
        ))}
      </div>
    );
  }, [actions]);

  // Render the close button when applicable
  const renderedCloseButton = useMemo(() => {
    if (!canClose) {
      return null;
    }

    return (
      <IconButton className={styles.ModalClose} onClick={onClose}>
        <RiCloseFill />
      </IconButton>
    );
  }, [canClose, onClose]);

  // Scroll body contents back up to top on change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [children]);

  return (
    <Transition
      in={visible}
      mountOnEnter
      nodeRef={ref}
      timeout={200}
      unmountOnExit
    >
      {state => (
        <div
          className={clsx(styles.Modal, {
            [styles.ModalEntering]: state === 'entering',
            [styles.ModalEntered]: state === 'entered',
            [styles.ModalExiting]: state === 'exiting',
            [styles.ModalExited]: state === 'exited',
          })}
          ref={ref}
        >
          {blur && <div className={styles.ModalOverlay} />}
          <div
            className={clsx(styles.ModalDialogContainer, {
              [styles.ModalDialogContainerBlurred]: blur,
            })}
          >
            <div className={clsx(styles.ModalDialog, className)}>
              <div className={styles.ModalHeader}>
                <TextEllipsis>{header}</TextEllipsis>
                {renderedCloseButton}
              </div>
              <div className={styles.ModalBody} ref={bodyRef}>
                {children}
              </div>
              {renderedActions}
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};
