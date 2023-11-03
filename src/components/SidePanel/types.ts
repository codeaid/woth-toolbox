import type { CSSProperties, ReactNode } from 'react';
import type { ButtonProps } from 'components/Button';

type SidePanelCloseHandler = () => void;
type SidePanelVisibleChangeHandler = (visible: boolean) => void;
type SidePanelSide = 'left' | 'right';

export interface SidePanelProps {
  actions?: Array<ButtonProps>;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  side?: SidePanelSide;
  style?: CSSProperties;
  title: string;
  visible?: boolean;
  onClose?: SidePanelCloseHandler;
  onVisible?: SidePanelVisibleChangeHandler;
}
