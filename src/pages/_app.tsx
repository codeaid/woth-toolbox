import type { AppProps } from 'next/app';
import 'modern-normalize/modern-normalize.css';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

export default App;
