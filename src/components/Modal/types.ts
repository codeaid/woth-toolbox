import { ReactNode } from 'react';
import { ButtonProps } from 'components/Button';

type ModalCloseHandler = () => void;

export interface ModalProps {
  actions?: Array<ButtonProps>;
  children?: ReactNode;
  className?: string;
  header: string;
  visible?: boolean;
  onClose?: ModalCloseHandler;
}