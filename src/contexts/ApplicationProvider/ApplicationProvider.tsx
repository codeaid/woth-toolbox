'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { StrictMode } from 'react';
import { App } from 'components/App';
import { Notifications } from 'components/Notifications';
import {
  HuntingMapTypeProvider,
  SettingsProvider,
} from 'contexts';
import { useHuntingMapTypeManager } from 'hooks';
import { queryClient } from 'lib/services';

export const ApplicationProvider = (props: PropsWithChildren) => {
  const { children } = props;

  // Retrieve map type switching context and the currently active map type
  const mapTypeManager = useHuntingMapTypeManager();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
            <HuntingMapTypeProvider value={mapTypeManager}>
              <Notifications />
              <App>{children}</App>
            </HuntingMapTypeProvider>
          </TutorialProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};
