import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode } from 'react';
import { App as Toolbox } from 'components/App';
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
import 'modern-normalize/modern-normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  // Retrieve map type switching context and the currently active map type
  const mapTypeManager = useHuntingMapTypeManager();
  const { mapType } = mapTypeManager;

  // Retrieve application settings and tutorial managers
  const animalManager = useAnimalMarkerManager(mapType);
  const customManager = useCustomMarkerManager(mapType);
  const settingsManager = useSettingsManager();
  const tutorialManager = useTutorialManager();

  return (
    <>
      <StrictMode>
        <Head>
          <title>Way Of The Hunter Toolbox</title>
          <meta
            content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no"
            name="viewport"
          />
        </Head>

        <HuntingMapTypeProvider value={mapTypeManager}>
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
        </HuntingMapTypeProvider>
      </StrictMode>
    </>
  );
};

export default App;
