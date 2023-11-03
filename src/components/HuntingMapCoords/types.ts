import type { Point } from 'types/generic';

export interface HuntingMapCoordsRef {
  setCoords: (coords: Point) => void;
}

export interface HuntingMapCoordsProps {
  multiplier?: number;
  placeholder?: string;
}
