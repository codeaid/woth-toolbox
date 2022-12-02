import { useCallback, useEffect } from 'react';
import { RiArrowGoBackFill, RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { IconButton } from 'components/IconButton';
import { HuntingMapToolbarProps } from './types';
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

  // Monitor keyboard key presses
  useEffect(() => {
    document.addEventListener('keypress', handleDocumentKeyPress);

    return () => {
      document.removeEventListener('keypress', handleDocumentKeyPress);
    };
  }, [handleDocumentKeyPress]);

  return (
    <div className={styles.HuntingMapToolbar}>
      <IconButton onClick={onZoomIn}>
        <RiZoomInLine />
      </IconButton>
      <IconButton onClick={onZoomOut}>
        <RiZoomOutLine />
      </IconButton>
      <IconButton onClick={onReset}>
        <RiArrowGoBackFill />
      </IconButton>
    </div>
  );
};
