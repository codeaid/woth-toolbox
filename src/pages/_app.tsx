import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode } from 'react';
import { Layout } from 'components/Layout';
import 'modern-normalize/modern-normalize.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Way Of The Hunter Toolbox</title>
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1.0, minimum-scale=1.0 user-scalable=no, width=device-width"
        />
      </Head>
      <Layout>
        <StrictMode>
          <Component {...pageProps} />
        </StrictMode>
      </Layout>
    </>
  );
};

export default App;
