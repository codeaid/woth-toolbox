import { createContext } from 'react';
import { HuntingMapTutorialContextValue } from './types';

export const HuntingMapTutorialContext =
  createContext<HuntingMapTutorialContextValue>({
    completed: false,
    enabled: false,
    visible: false,
    onTutorialClose: () => undefined,
    onTutorialComplete: () => undefined,
    onTutorialEnable: () => undefined,
    onTutorialOpen: () => undefined,
  });

export const { Provider: HuntingMapTutorialProvider } =
  HuntingMapTutorialContext;
