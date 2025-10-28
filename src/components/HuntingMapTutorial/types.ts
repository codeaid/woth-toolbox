type HuntingMapTutorialVoidHandler = () => void;

export interface HuntingMapTutorialProps {
  defaultPageIndex?: number;
  visible?: boolean;
  onComplete?: HuntingMapTutorialVoidHandler;
  onClose?: HuntingMapTutorialVoidHandler;
}
