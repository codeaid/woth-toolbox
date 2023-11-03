import { useCallback, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { RiArrowGoBackFill, RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { IconButton } from 'components/IconButton';
import type { HuntingMapToolbarProps } from './types';
import styles from './HuntingMapToolbar.module.css';

export const HuntingMapToolbar = (props: HuntingMapToolbarProps) => {
  const { onReset, onZoomIn, onZoomOut } = props;

  /**
   * Handle pressing keyboard keys
   */
  const handleDocumentKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case '+':
        case '=':
          onZoomIn();
          break;
        case '-':
          onZoomOut();
          break;
        case '/':
          onReset();
          break;
        default:
          break;
      }
    },
    [onReset, onZoomIn, onZoomOut],
  );

  /**
   * Handle resetting the map
   *
   * @param event Mouse click event
   */
  const handleReset = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onReset();
    },
    [onReset],
  );

  /**
   * Handle zooming map in
   *
   * @param event Mouse click event
   */
  const handleZoomIn = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onZoomIn();
    },
    [onZoomIn],
  );

  /**
   * Handle zooming map out
   *
   * @param event Mouse click event
   */
  const handleZoomOut = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onZoomOut();
    },
    [onZoomOut],
  );

  // Monitor keyboard key presses
  useEffect(() => {
    document.addEventListener('keypress', handleDocumentKeyPress);

    return () => {
      document.removeEventListener('keypress', handleDocumentKeyPress);
    };
  }, [handleDocumentKeyPress]);

  return (
    <div className={styles.HuntingMapToolbar}>
      <IconButton tabIndex={-1} onClick={handleZoomIn}>
        <RiZoomInLine />
      </IconButton>
      <IconButton tabIndex={-1} onClick={handleZoomOut}>
        <RiZoomOutLine />
      </IconButton>
      <IconButton tabIndex={-1} onClick={handleReset}>
        <RiArrowGoBackFill />
      </IconButton>
    </div>
  );
};
