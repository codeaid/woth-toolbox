import type { ReactNode } from 'react';
import type { ButtonProps } from 'components/Button';

type ModalCloseHandler = () => void;

export interface ModalProps {
  actions?: Array<ButtonProps>;
  blur?: boolean;
  canClose?: boolean;
  children?: ReactNode;
  className?: string;
  header: string;
  visible?: boolean;
  onClose?: ModalCloseHandler;
}
