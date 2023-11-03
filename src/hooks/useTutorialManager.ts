import { useCallback, useEffect, useState } from 'react';
import type { TutorialContextValue } from 'contexts';
import { isMapTutorialCompleted, writeMapTutorialCompleted } from 'lib/storage';
import { sendGoogleEvent } from 'lib/tracking';
import { useStorage } from './useStorage';

/**
 * Hook exposing map tutorial states and functionality
 */
export const useTutorialManager = (): TutorialContextValue => {
  // Flag indicating whether tutorial has been previously completed
  const [completed, setCompleted] = useState(false);

  // Index of the page that is activated by default
  const [defaultPageIndex, setDefaultPageIndex] = useState(0);

  // Flag indicating whether tutorial functionality is enabled
  const [enabled, setEnabled] = useState(false);

  // Flag indicating whether tutorial is currently open
  const [visible, setVisible] = useState(false);

  // Browser storage manager
  const storage = useStorage();

  /**
   * Handle closing tutorial halfway through
   */
  const handleTutorialClose = useCallback(() => {
    setDefaultPageIndex(0);
    setVisible(false);

    // Send custom Google Analytics event
    sendGoogleEvent('help_close');
  }, []);

  /**
   * Handle completing tutorial
   */
  const handleTutorialComplete = useCallback(() => {
    setCompleted(true);
    setVisible(false);

    // Send custom Google Analytics event
    sendGoogleEvent('help_complete');

    if (storage) {
      writeMapTutorialCompleted(storage);
    }
  }, [storage]);

  /**
   * Handle showing tutorial
   *
   * @param defaultPageIndex Default page index to activate
   */
  const handleTutorialOpen = useCallback(
    (defaultPageIndex = 0) => {
      // Ignore request if tutorial functionality is disabled
      if (!enabled) {
        return;
      }

      setVisible(true);
      setDefaultPageIndex(defaultPageIndex);

      // Send custom Google Analytics event
      sendGoogleEvent('help_open');
    },
    [enabled],
  );

  // Set tutorial completion state
  useEffect(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    setCompleted(isMapTutorialCompleted(storage));
  }, [storage]);

  return {
    completed,
    defaultPageIndex,
    enabled,
    visible,
    onTutorialClose: handleTutorialClose,
    onTutorialComplete: handleTutorialComplete,
    onTutorialEnable: setEnabled,
    onTutorialOpen: handleTutorialOpen,
  };
};
