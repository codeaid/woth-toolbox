import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html>
    <Head>
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=BenchNine&family=Fira+Sans:ital@0;1&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <div className="overlay"></div>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
