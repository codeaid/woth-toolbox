import { CSSProperties, ReactNode } from 'react';
import { ButtonProps } from 'components/Button';

type SidePanelCloseHandler = () => void;

export interface SidePanelProps {
  actions?: Array<ButtonProps>;
  children?: ReactNode;
  style?: CSSProperties;
  title: string;
  visible?: boolean;
  onClose?: SidePanelCloseHandler;
}
