import ReactSlider from 'react-slider';
import type { SliderProps } from './types';
import styles from './Slider.module.css';

export const Slider = (props: SliderProps) => {
  const { max = 100, min = 0, value, onChange } = props;

  return (
    <ReactSlider
      className={styles.Slider}
      max={max}
      min={min}
      thumbClassName={styles.SliderThumb}
      trackClassName={styles.SliderTrack}
      value={value}
      onChange={onChange}
    />
  );
};
