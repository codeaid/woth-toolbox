import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { Layout } from 'components/Layout';
import { useLocale, useLocaleResource } from 'hooks';

export const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  // Retrieve current application settings and locale
  const locale = useLocale();

  // Retrieve locale's translation messages
  const messages = useLocaleResource();

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Layout ready={!!messages}>
        <Component {...pageProps} />
      </Layout>
    </IntlProvider>
  );
};
