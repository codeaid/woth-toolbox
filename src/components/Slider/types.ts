export type SliderChangeHandler = (value: number) => void;

export interface SliderProps {
  max?: number;
  min?: number;
  value?: number;
  onChange?: SliderChangeHandler;
}
