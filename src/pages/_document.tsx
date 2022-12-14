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
          href="https://fonts.googleapis.com/css2?family=BenchNine:wght@300;400&family=Fira+Sans+Condensed&family=Fira+Sans+Extra+Condensed&family=Fira+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href={`${baseUrl}/img/favicon.png`} />
        <style
          dangerouslySetInnerHTML={{
            __html: `html { cursor: url("${baseUrl}/img/mouse.png"), auto; }`,
          }}
        ></style>
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
