import { useContext, useEffect, useMemo } from 'react';
import { HuntingMapTutorial } from 'components/HuntingMapTutorial';
import { HuntingMapTutorialContext } from 'contexts';

/**
 * Hook exposing the map tutorial component and its associated functionality
 *
 * @param enable Forces tutorial functionality to be enabled
 */
export const useHuntingMapTutorial = (enable = false) => {
  const {
    completed,
    enabled,
    visible,
    onTutorialClose,
    onTutorialComplete,
    onTutorialEnable,
    onTutorialOpen,
  } = useContext(HuntingMapTutorialContext);

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

  return useMemo(
    () => ({
      component: (
        <HuntingMapTutorial
          key="woth:tutorial"
          visible={visible}
          onClose={onTutorialClose}
          onComplete={onTutorialComplete}
        />
      ),
      enabled,
      onTutorialOpen,
    }),
    [enabled, onTutorialClose, onTutorialComplete, onTutorialOpen, visible],
  );
};
