import type { ReactNode } from 'react';

type SelectChangeHandler<TValue> = (value: Optional<TValue>) => void;

export interface SelectOption<TValue> {
  content: ReactNode;
  value: Optional<TValue>;
}

export interface SelectProps<TValue extends string | number> {
  disabled?: boolean;
  options: Array<SelectOption<TValue>>;
  placeholder?: string;
  value?: TValue;
  onChange?: SelectChangeHandler<TValue>;
}
