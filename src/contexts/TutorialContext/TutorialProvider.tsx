'use client';

import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSettings } from 'hooks';
import { sendGoogleEvent } from 'lib/tracking';
import { TutorialContext } from './TutorialContext';

export const TutorialProvider = (props: PropsWithChildren) => {
  const { children } = props;

  // Flag indicating whether tutorial has been previously completed
  const [completed, setCompleted] = useState<boolean>();

  // Index of the page that is activated by default
  const [defaultPageIndex, setDefaultPageIndex] = useState(0);

  // Flag indicating whether tutorial functionality is enabled
  const [enabled, setEnabled] = useState(false);

  // Flag indicating whether tutorial is currently open
  const [visible, setVisible] = useState(false);

  // Get settings settings and accessors
  const { onSettingsRead, onSettingsUpdateAsync } = useSettings();

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
  const handleTutorialComplete = useCallback(async () => {
    setCompleted(true);
    setVisible(false);

    // Send custom Google Analytics event
    sendGoogleEvent('help_complete');
    await onSettingsUpdateAsync('tutorial:completed', true);
  }, [onSettingsUpdateAsync]);

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
    const completed = onSettingsRead('tutorial:completed', false);
    setCompleted(completed);
  }, [onSettingsRead]);

  return (
    <TutorialContext.Provider
      value={{
        completed,
        defaultPageIndex,
        enabled,
        visible,
        onTutorialClose: handleTutorialClose,
        onTutorialComplete: handleTutorialComplete,
        onTutorialEnable: setEnabled,
        onTutorialOpen: handleTutorialOpen,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
