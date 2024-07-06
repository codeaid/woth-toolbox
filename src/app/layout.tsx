import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';
import { ApplicationProvider } from 'components/ApplicationProvider';
import {
  benchNineFont,
  firaSansCondensedFont,
  firaSansExtraCondensedFont,
  firaSansFont,
  googleAnalyticsId,
  metadataBase,
} from 'config/app';
import 'modern-normalize/modern-normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/global.css';

export const metadata: Metadata = {
  title: 'Way Of The Hunter Toolbox',
  description:
    'Unleash your inner hunter with the ultimate resource for weapons, animals and locations, featuring interactive maps and species life cycles',
  metadataBase,
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  themeColor: {
    color: '#0A1123',
  },
  userScalable: false,
  viewportFit: 'cover',
  width: 'device-width',
};

const RootLayout = (props: PropsWithChildren) => (
  <html
    className={clsx(
      benchNineFont.variable,
      firaSansFont.variable,
      firaSansCondensedFont.variable,
      firaSansExtraCondensedFont.variable,
    )}
    lang="en"
  >
    <body>
      <GoogleAnalytics gaId={googleAnalyticsId} />
      <ApplicationProvider>{props.children}</ApplicationProvider>
    </body>
  </html>
);

export default RootLayout;
