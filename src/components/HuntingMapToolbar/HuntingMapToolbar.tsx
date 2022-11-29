import { RiArrowGoBackFill, RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { IconButton } from 'components/IconButton';
import { HuntingMapToolbarProps } from './types';
import styles from './HuntingMapToolbar.module.css';

export const HuntingMapToolbar = (props: HuntingMapToolbarProps) => {
  const { onReset, onZoomIn, onZoomOut } = props;

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
