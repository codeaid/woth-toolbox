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
          href="https://fonts.googleapis.com/css2?family=BenchNine:wght@300;400&family=Fira+Sans+Condensed&family=Fira+Sans+Extra+Condensed&family=Fira+Sans:wght@300;400;500&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href={`${basePath}/img/favicon.png`} />
        <style
          dangerouslySetInnerHTML={{
            __html: `html { cursor: url("${basePath}/img/mouse.png"), auto; }`,
          }}
        ></style>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseURL}${basePath}`} />
        <meta property="og:title" content="Way Of The Hunter Toolbox" />
        <meta
          property="og:description"
          content="Unleash your inner hunter with the ultimate resource for weapons, animals and locations, featuring interactive maps and species life cycles."
        />
        <meta
          property="og:image"
          content={`${baseURL}${basePath}/img/og.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${baseURL}${basePath}/img/og.jpg`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
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
