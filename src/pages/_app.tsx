import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { StrictMode } from 'react';
import { Layout } from 'components/Layout';
import { ApplicationSettingsProvider } from 'contexts';
import { useApplicationSettingsStorage } from 'hooks';
import 'modern-normalize/modern-normalize.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  // Retrieve application settings storage
  const settings = useApplicationSettingsStorage();

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
        <ApplicationSettingsProvider value={settings}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApplicationSettingsProvider>
      </StrictMode>
    </>
  );
};

export default appWithTranslation(App);
