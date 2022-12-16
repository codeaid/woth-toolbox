import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode } from 'react';
import { IntlProvider } from 'react-intl';
import { Layout } from 'components/Layout';
import { ApplicationSettingsProvider } from 'contexts';
import {
  useApplicationSettingsStorage,
  useLocale,
  useLocaleResource,
} from 'hooks';
import 'modern-normalize/modern-normalize.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  // Current user's locale and translation messages
  const locale = useLocale();
  const messages = useLocaleResource(locale);

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
        <IntlProvider locale={locale} messages={messages}>
          <ApplicationSettingsProvider value={settings}>
            <Layout ready={!!messages}>
              <Component {...pageProps} />
            </Layout>
          </ApplicationSettingsProvider>
        </IntlProvider>
      </StrictMode>
    </>
  );
};

export default App;
