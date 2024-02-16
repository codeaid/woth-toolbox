type ColorSelectorChangeHandler = (color: string) => void;

export interface ColorSelectorCellProps {
  color?: string;
  value: string;
  onChange: ColorSelectorChangeHandler;
}

export interface ColorSelectorProps {
  color?: string;
  onChange: ColorSelectorChangeHandler;
}
