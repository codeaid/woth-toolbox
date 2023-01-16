import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode, useEffect } from 'react';
import { App as Toolbox } from 'components/App';
import { HuntingMapTutorialProvider, SettingsManagerProvider } from 'contexts';
import {
  useHuntingMapTutorialManager,
  useSettingsManager,
  useStorage,
} from 'hooks';
import { remapAnimalMarkerStore } from 'lib/storage';
import 'modern-normalize/modern-normalize.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  // Retrieve application settings and tutorial managers
  const settings = useSettingsManager();
  const tutorial = useHuntingMapTutorialManager();

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
        <SettingsManagerProvider value={settings}>
          <HuntingMapTutorialProvider value={tutorial}>
            <Toolbox {...props} />
          </HuntingMapTutorialProvider>
        </SettingsManagerProvider>
      </StrictMode>
    </>
  );
};

export default App;
