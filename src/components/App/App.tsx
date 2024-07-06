import type { PropsWithChildren } from 'react';
import { Layout } from 'components/Layout';
import { useLocaleResource } from 'hooks';

export const App = (props: PropsWithChildren) => {
  const { children } = props;

  // Retrieve locale's translation messages
  const messages = useLocaleResource();

  return <Layout ready={!!messages}>{children}</Layout>;
};
