'use client';

import { useContext, useEffect } from 'react';
//import { HuntingMapTutorial } from 'components/HuntingMapTutorial';
//import { TutorialContext } from 'contexts';,

/**
 * Hook exposing the map tutorial component and its associated functionality
 *
 * @param enable Forces tutorial functionality to be enabled
 */
export const useTutorial = (enable = false) => {
  // Tutorial functionality disabled - return empty implementation
  return {
    tutorialProps: {
      defaultPageIndex: 0,
      visible: false,
      onClose: () => {},
      onComplete: () => {},
    },
    enabled: false,
    onTutorialOpen: () => {},
  };
};
