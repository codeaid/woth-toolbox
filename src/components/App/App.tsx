import { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { Layout } from 'components/Layout';
import { useLocale, useLocaleResource, useSettings } from 'hooks';

export const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  // Retrieve current application settings and locale
  const { initialized, settings } = useSettings();
  const locale = useLocale();

  // Retrieve locale's translation messages
  const messages = useLocaleResource(initialized ? settings.locale : undefined);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Layout ready={!!messages}>
        <Component {...pageProps} />
      </Layout>
    </IntlProvider>
  );
};
