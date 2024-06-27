import { Head, Html, Main, NextScript } from 'next/document';
import { basePath, baseURL, googleAnalyticsId } from 'config/app';
import { isDevelopmentMode } from 'lib/utils';

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
      isDevelopmentMode()
        ? `gtag('config', '${googleAnalyticsId}', { 'debug_mode': true });`
        : `gtag('config', '${googleAnalyticsId}');`,
    ];

    return (
      <>
        <script
          async
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
          href="https://fonts.googleapis.com/css2?family=BenchNine:wght@300;400&family=Fira+Sans+Condensed&family=Fira+Sans+Extra+Condensed&family=Fira+Sans:wght@300;400;500&family=Inconsolata&display=swap"
          rel="stylesheet"
        />
        <link href={`${basePath}/img/favicon.png`} rel="shortcut icon" />
        <style
          dangerouslySetInnerHTML={{
            __html: `html { cursor: url("${basePath}/img/mouse.png"), auto; }`,
          }}
        ></style>
        <meta content="website" property="og:type" />
        <meta content={`${baseURL}${basePath}`} property="og:url" />
        <meta content="Way Of The Hunter Toolbox" property="og:title" />
        <meta
          content="Unleash your inner hunter with the ultimate resource for weapons, animals and locations, featuring interactive maps and species life cycles."
          property="og:description"
        />
        <meta
          content={`${baseURL}${basePath}/img/og.jpg`}
          property="og:image"
        />
        <meta
          content={`${baseURL}${basePath}/img/og.jpg`}
          property="og:image:secure_url"
        />
        <meta content="image/jpeg" property="og:image:type" />
        <meta content="1200" property="og:image:width" />
        <meta content="627" property="og:image:height" />
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
