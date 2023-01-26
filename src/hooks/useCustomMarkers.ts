import { useContext } from 'react';
import { CustomMarkerContext } from 'contexts';

export const useCustomMarkers = () => useContext(CustomMarkerContext);
