import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode } from 'react';
import { App as Toolbox } from 'components/App';
import { SettingsManagerProvider } from 'contexts';
import { useSettingsManager } from 'hooks';
import 'modern-normalize/modern-normalize.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  // Retrieve application settings manager
  const manager = useSettingsManager();

  return (
    <>
      <Head>
        <title>Way Of The Hunter Toolbox</title>
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1.0, minimum-scale=1.0 user-scalable=no, width=device-width"
        />
      </Head>
      <StrictMode>
        <SettingsManagerProvider value={manager}>
          <Toolbox {...props} />
        </SettingsManagerProvider>
      </StrictMode>
    </>
  );
};

export default App;
