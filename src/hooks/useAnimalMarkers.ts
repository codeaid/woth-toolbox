import { useContext } from 'react';
import { AnimalMarkerContext } from 'contexts';

export const useAnimalMarkers = () => useContext(AnimalMarkerContext);
