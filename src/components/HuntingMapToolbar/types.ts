type HuntingMapToolbarVoidHandler = () => void;

export interface HuntingMapToolbarProps {
  onReset: HuntingMapToolbarVoidHandler;
  onZoomIn: HuntingMapToolbarVoidHandler;
  onZoomOut: HuntingMapToolbarVoidHandler;
}
