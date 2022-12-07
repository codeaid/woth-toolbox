import { CSSProperties, ReactNode } from 'react';
import { ButtonProps } from 'components/Button';

type SidePanelCloseHandler = () => void;
type SidePanelSide = 'left' | 'right';

export interface SidePanelProps {
  actions?: Array<ButtonProps>;
  children?: ReactNode;
  className?: string;
  side?: SidePanelSide;
  style?: CSSProperties;
  title: string;
  visible?: boolean;
  onClose?: SidePanelCloseHandler;
}
