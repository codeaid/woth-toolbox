import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import { getTransitionClassName } from 'lib/dom';
import { ContextMenuOptionList } from './ContextMenuOptionList';
import type { ContextMenuProps } from './types';
import styles from './ContextMenu.module.css';

export const ContextMenu = (props: ContextMenuProps) => {
  const { anchor, enabled = true, options, parent } = props;

  // Flag indicating whether the context menu is visible
  const [visible, setVisible] = useState(false);

  // Reference to the main context menu element
  const ref = useRef<HTMLUListElement>(null);

  /**
   * Handle showing the context menu when right-clicking inside the anchor
   *
   * @param event Mouse event object
   */
  const handleAnchorContextMenu = useCallback(
    (event: MouseEvent) => {
      // Prevent native context menu from appearing
      event.preventDefault();

      // Ignore logic if menu is not enabled
      if (!enabled) {
        return;
      }

      // Show custom context menu
      setVisible(true);
    },
    [enabled],
  );

  /**
   * Update position of the current context menu
   */
  const handleContextMenuPosition = useCallback(() => {
    // Ensure menu is visible and references to all elements are present
    if (!visible || !anchor || !ref.current) {
      return;
    }

    // Get position properties of the anchor element
    const {
      height: anchorHeight,
      left: anchorLeft,
      top: anchorTop,
    } = anchor.getBoundingClientRect();

    // Position context menu relative to the anchor element
    ref.current.style.left = `${anchorLeft}px`;
    ref.current.style.top = `${anchorTop + anchorHeight}px`;
  }, [anchor, visible]);

  /**
   * Handle clicks outside the context menu element
   *
   * @param event Mouse event object
   */
  const handleDocumentMouseDown = useCallback(
    (event: MouseEvent) => {
      // Ignore logic if menu is not visible
      if (!enabled || !visible) {
        return;
      }

      // Check if the click occurred inside the panel component
      const clickOnMenu = ref.current
        ? ref.current.contains(event.target as Node)
        : false;

      // Close context menu if click occurred outside the main element
      if (!clickOnMenu) {
        setVisible(false);
      }
    },
    [enabled, visible],
  );

  /**
   * Handle mouse wheel scrolls
   *
   * @param event Wheel event object
   */
  const handleDocumentWheel = useCallback(() => {
    // Ignore logic if menu is not visible
    if (!enabled || !visible) {
      return;
    }

    handleContextMenuPosition();
  }, [enabled, handleContextMenuPosition, visible]);

  /**
   * Handle pressing mouse down over the context menu
   */
  const handleMouseDown = useCallback(
    (event: ReactMouseEvent<EventTarget>) => event.stopPropagation(),
    [],
  );

  /**
   * Handle clicking on option items
   */
  const handleOptionClick = useCallback(() => setVisible(false), []);

  // Set context menu's position relative to the anchor
  useEffect(() => {
    handleContextMenuPosition();
  }, [handleContextMenuPosition]);

  // Hide context menu when the parent anchor is unmounted
  useEffect(() => {
    if (!anchor) {
      setVisible(false);
    }
  }, [anchor]);

  useEffect(() => {
    anchor?.addEventListener('contextmenu', handleAnchorContextMenu);
    document.addEventListener('mousedown', handleDocumentMouseDown);
    document.addEventListener('wheel', handleDocumentWheel);

    return () => {
      anchor?.removeEventListener('contextmenu', handleAnchorContextMenu);
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      document.removeEventListener('wheel', handleDocumentWheel);
    };
  }, [
    anchor,
    handleAnchorContextMenu,
    handleDocumentMouseDown,
    handleDocumentWheel,
  ]);

  return createPortal(
    <Transition
      in={visible}
      mountOnEnter
      nodeRef={ref}
      timeout={75}
      unmountOnExit
    >
      {state => (
        <ul
          className={getTransitionClassName(
            state,
            styles.ContextMenuStateEntering,
            styles.ContextMenuStateEntered,
            styles.ContextMenuStateExiting,
            styles.ContextMenuStateExited,
            [styles.ContextMenu],
          )}
          ref={ref}
          onMouseDown={handleMouseDown}
        >
          <ContextMenuOptionList
            options={options}
            onOptionClick={handleOptionClick}
          />
        </ul>
      )}
    </Transition>,
    parent ?? document.body,
  );
};
