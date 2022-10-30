import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import 'modern-normalize/modern-normalize.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  // Read Google Analytics ID
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  /**
   * Render the Google Analytics tag script
   */
  const renderGoogleAnalytics = () => {
    // Don't render Google Analytics code if ID is not present
    if (!googleAnalyticsId) {
      return null;
    }

    return (
      <>
        <Script
          async={true}
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        ></Script>
        <Script id="gtag">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');`}</Script>
      </>
    );
  };

  return (
    <>
      {renderGoogleAnalytics()}
      <Head>
        <title>Weapon Energy Calculator - Way Of The Hunter</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
