type HuntingMapTutorialContextFlagHandler = (enabled: boolean) => void;
type HuntingMapTutorialContextOpenHandler = (defaultPageIndex?: number) => void;
type HuntingMapTutorialContextVoidHandler = () => void;

export interface TutorialContextValue {
  completed: boolean;
  defaultPageIndex: number;
  enabled: boolean;
  visible: boolean;
  onTutorialClose: HuntingMapTutorialContextVoidHandler;
  onTutorialComplete: HuntingMapTutorialContextVoidHandler;
  onTutorialEnable: HuntingMapTutorialContextFlagHandler;
  onTutorialOpen: HuntingMapTutorialContextOpenHandler;
}
