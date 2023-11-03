import type { IconType } from 'react-icons';

type ContextMenuOptionClickHandler = () => void;

export interface ContextMenuOption {
  disabled?: boolean;
  icon?: IconType;
  label: string;
  separator?: boolean;
  onClick: ContextMenuOptionClickHandler;
}

export interface ContextMenuOptionItemProps {
  option: ContextMenuOption;
  onOptionClick: ContextMenuOptionClickHandler;
}

export interface ContextMenuOptionListProps {
  options: Array<ContextMenuOption>;
  onOptionClick: ContextMenuOptionClickHandler;
}

export interface ContextMenuProps {
  anchor?: Nullable<HTMLElement>;
  enabled?: boolean;
  options: Array<ContextMenuOption>;
  parent?: Nullable<HTMLElement>;
}
