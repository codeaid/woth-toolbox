'use client';

import type { PropsWithChildren } from 'react';
import { StrictMode } from 'react';
import { App } from 'components/App';
import { Notifications } from 'components/Notifications';
import {
  AnimalMarkerProvider,
  CustomMarkerProvider,
  HuntingMapTypeProvider,
  SettingsProvider,
  TutorialProvider,
} from 'contexts';
import {
  useAnimalMarkerManager,
  useCustomMarkerManager,
  useHuntingMapTypeManager,
  useSettingsManager,
  useTutorialManager,
} from 'hooks';

export const ApplicationProvider = (props: PropsWithChildren) => {
  const { children } = props;

  // Retrieve map type switching context and the currently active map type
  const mapTypeManager = useHuntingMapTypeManager();
  const { mapType } = mapTypeManager;

  // Retrieve application settings and tutorial managers
  const animalManager = useAnimalMarkerManager(mapType);
  const customManager = useCustomMarkerManager(mapType);
  const settingsManager = useSettingsManager();
  const tutorialManager = useTutorialManager();

  return (
    <StrictMode>
      <HuntingMapTypeProvider value={mapTypeManager}>
        <AnimalMarkerProvider value={animalManager}>
          <CustomMarkerProvider value={customManager}>
            <SettingsProvider value={settingsManager}>
              <TutorialProvider value={tutorialManager}>
                <Notifications />
                <App>{children}</App>
              </TutorialProvider>
            </SettingsProvider>
          </CustomMarkerProvider>
        </AnimalMarkerProvider>
      </HuntingMapTypeProvider>
    </StrictMode>
  );
};
