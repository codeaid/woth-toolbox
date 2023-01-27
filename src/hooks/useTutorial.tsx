import { useContext, useEffect } from 'react';
import { HuntingMapTutorial } from 'components/HuntingMapTutorial';
import { TutorialContext } from 'contexts';

/**
 * Hook exposing the map tutorial component and its associated functionality
 *
 * @param enable Forces tutorial functionality to be enabled
 */
export const useTutorial = (enable = false) => {
  const {
    completed,
    defaultPageIndex,
    enabled,
    visible,
    onTutorialClose,
    onTutorialComplete,
    onTutorialEnable,
    onTutorialOpen,
  } = useContext(TutorialContext);

  // Enable tutorial if required and disable it on unmount
  useEffect(() => {
    if (enable) {
      onTutorialEnable(true);
    }

    return () => onTutorialEnable(false);
  }, [enable, onTutorialEnable]);

  // Show tutorial if it has previously not been completed
  useEffect(() => {
    !completed && onTutorialOpen();
  }, [completed, onTutorialOpen]);

  return {
    component: (
      <HuntingMapTutorial
        defaultPageIndex={defaultPageIndex}
        key="woth:tutorial"
        visible={visible}
        onClose={onTutorialClose}
        onComplete={onTutorialComplete}
      />
    ),
    enabled,
    onTutorialOpen,
  };
};
