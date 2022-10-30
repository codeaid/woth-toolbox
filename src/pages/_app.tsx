import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'modern-normalize/modern-normalize.css';
import 'styles/global.css';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Way Of The Hunter - Animal Weapon Matcher</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
