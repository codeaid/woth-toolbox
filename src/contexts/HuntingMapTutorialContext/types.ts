type HuntingMapTutorialContextFlagHandler = (enabled: boolean) => void;
type HuntingMapTutorialContextVoidHandler = () => void;

export interface HuntingMapTutorialContextValue {
  completed: boolean;
  enabled: boolean;
  visible: boolean;
  onTutorialClose: HuntingMapTutorialContextVoidHandler;
  onTutorialComplete: HuntingMapTutorialContextVoidHandler;
  onTutorialEnable: HuntingMapTutorialContextFlagHandler;
  onTutorialOpen: HuntingMapTutorialContextVoidHandler;
}
