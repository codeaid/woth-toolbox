import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';
import {
  benchNineFont,
  firaSansCondensedFont,
  firaSansExtraCondensedFont,
  firaSansFont,
  googleAnalyticsId,
  metadataBase,
} from 'config/app';
import { ApplicationProvider } from 'contexts';
import 'modern-normalize/modern-normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/global.css';

// Load DiscordAuth only on client side (skip during static build)
const DiscordAuth = dynamic(
  () => import('components/DiscordAuth').then(mod => ({ default: mod.DiscordAuth })),
  { ssr: false }
);

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
      <DiscordAuth />
      <ApplicationProvider>{props.children}</ApplicationProvider>
    </body>
  </html>
);

export default RootLayout;
