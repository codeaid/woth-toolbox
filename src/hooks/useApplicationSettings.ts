import { useContext } from 'react';
import { ApplicationSettingsContext } from 'contexts';

export const useApplicationSettings = () =>
  useContext(ApplicationSettingsContext);
