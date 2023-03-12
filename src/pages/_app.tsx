import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode } from 'react';
import { App as Toolbox } from 'components/App';
import { Notifications } from 'components/Notifications';
import {
  AnimalMarkerProvider,
  CustomMarkerProvider,
  SettingsProvider,
  TutorialProvider,
} from 'contexts';
import {
  useAnimalMarkerManager,
  useCustomMarkerManager,
  useSettingsManager,
  useTutorialManager,
} from 'hooks';
import 'modern-normalize/modern-normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  // Retrieve application settings and tutorial managers
  const animalManager = useAnimalMarkerManager();
  const customManager = useCustomMarkerManager();
  const settingsManager = useSettingsManager();
  const tutorialManager = useTutorialManager();

  return (
    <>
      <StrictMode>
        <Head>
          <title>Way Of The Hunter Toolbox</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no"
          />
        </Head>

        <AnimalMarkerProvider value={animalManager}>
          <CustomMarkerProvider value={customManager}>
            <SettingsProvider value={settingsManager}>
              <TutorialProvider value={tutorialManager}>
                <Notifications />
                <Toolbox {...props} />
              </TutorialProvider>
            </SettingsProvider>
          </CustomMarkerProvider>
        </AnimalMarkerProvider>
      </StrictMode>
    </>
  );
};

export default App;
