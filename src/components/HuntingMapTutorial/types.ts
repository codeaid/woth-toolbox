type HuntingMapTutorialVoidHandler = () => void;

export interface HuntingMapTutorialProps {
  visible?: boolean;
  onComplete?: HuntingMapTutorialVoidHandler;
  onClose?: HuntingMapTutorialVoidHandler;
}
