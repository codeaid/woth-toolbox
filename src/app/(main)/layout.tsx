import type { PropsWithChildren } from 'react';
import { ApplicationProvider } from 'contexts';

const MainLayout = (props: PropsWithChildren) => (
  <ApplicationProvider>{props.children}</ApplicationProvider>
);

export default MainLayout;
