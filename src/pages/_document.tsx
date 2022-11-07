import { Head, Html, Main, NextScript } from 'next/document';
import { baseUrl, googleAnalyticsId } from 'config/app';

const Document = () => {
  /**
   * Render the Google Analytics tag script
   */
  const renderGoogleAnalytics = () => {
    // Don't render Google Analytics code if ID is not present
    if (!googleAnalyticsId) {
      return null;
    }

    // Lines of code to insert into the script tag
    const code = [
      `window.dataLayer = window.dataLayer || [];`,
      `function gtag() { dataLayer.push(arguments); }`,
      `gtag('js', new Date());`,
      `gtag('config', '${googleAnalyticsId}');`,
    ];

    return (
      <>
        <script
          async={true}
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        ></script>
        <script dangerouslySetInnerHTML={{ __html: code.join('\n') }}></script>
      </>
    );
  };

  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=BenchNine&family=Fira+Sans:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href={`${baseUrl}/img/favicon.png`} />
        {renderGoogleAnalytics()}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
