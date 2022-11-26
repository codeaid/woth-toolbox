import { RiArrowGoBackFill, RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { HuntingMapToolbarProps } from './types';
import buttonStyles from './HuntingMapButton.module.css';
import styles from './HuntingMapToolbar.module.css';

export const HuntingMapToolbar = (props: HuntingMapToolbarProps) => {
  const { onReset, onZoomIn, onZoomOut } = props;

  return (
    <div className={styles.HuntingMapToolbar}>
      <button className={buttonStyles.HuntingMapButton} onClick={onZoomIn}>
        <RiZoomInLine />
      </button>
      <button className={buttonStyles.HuntingMapButton} onClick={onZoomOut}>
        <RiZoomOutLine />
      </button>
      <button className={buttonStyles.HuntingMapButton} onClick={onReset}>
        <RiArrowGoBackFill />
      </button>
    </div>
  );
};
