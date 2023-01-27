import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode, useEffect } from 'react';
import { App as Toolbox } from 'components/App';
import { Notifications } from 'components/Notifications';
import {
  AnimalMarkerProvider,
  CustomMarkerProvider,
  TutorialProvider,
  SettingsManagerProvider,
} from 'contexts';
import {
  useAnimalMarkerManager,
  useCustomMarkerManager,
  useTutorialManager,
  useSettingsManager,
  useStorage,
} from 'hooks';
import { remapAnimalMarkerStore } from 'lib/storage';
import 'modern-normalize/modern-normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  // Retrieve application settings and tutorial managers
  const animalManager = useAnimalMarkerManager();
  const customManager = useCustomMarkerManager();
  const settingsManager = useSettingsManager();
  const tutorialManager = useTutorialManager();

  // Retrieve application storage manager
  const storage = useStorage();

  // Convert legacy animal marker keys to the latest format
  useEffect(() => {
    // Ensure storage is available before continuing
    if (!storage) {
      return;
    }

    // Prefix keys with "woth:"
    remapAnimalMarkerStore(storage);
  }, [storage]);

  return (
    <>
      <Head>
        <title>Way Of The Hunter Toolbox</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no"
        />
      </Head>
      <StrictMode>
        <AnimalMarkerProvider value={animalManager}>
          <CustomMarkerProvider value={customManager}>
            <SettingsManagerProvider value={settingsManager}>
              <TutorialProvider value={tutorialManager}>
                <Notifications />
                <Toolbox {...props} />
              </TutorialProvider>
            </SettingsManagerProvider>
          </CustomMarkerProvider>
        </AnimalMarkerProvider>
      </StrictMode>
    </>
  );
};

export default App;
