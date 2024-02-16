import { ColorSelectorCell } from './ColorSelectorCell';
import type { ColorSelectorProps } from './types';
import styles from './ColorSelector.module.css';

export const ColorSelector = (props: ColorSelectorProps) => (
  <div className={styles.ColorSelector}>
    <ColorSelectorCell value="#ff0000" {...props} />
    <ColorSelectorCell value="#ffa500" {...props} />
    <ColorSelectorCell value="#ffff00" {...props} />
    <ColorSelectorCell value="#008000" {...props} />
    <ColorSelectorCell value="#0000ff" {...props} />
    <ColorSelectorCell value="#4b0082" {...props} />
    <ColorSelectorCell value="#ee82ee" {...props} />
  </div>
);
