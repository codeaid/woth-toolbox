import { createContext } from 'react';
import { TutorialContextValue } from './types';

export const TutorialContext = createContext<TutorialContextValue>({
  completed: false,
  defaultPageIndex: 0,
  enabled: false,
  visible: false,
  onTutorialClose: () => undefined,
  onTutorialComplete: () => undefined,
  onTutorialEnable: () => undefined,
  onTutorialOpen: () => undefined,
});

export const { Provider: TutorialProvider } = TutorialContext;
