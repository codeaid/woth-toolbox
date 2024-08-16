import type { ForwardedRef } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { getCoordinateRatio } from 'lib/markers';
import type { Point } from 'types/generic';
import type { HuntingMapCoordsProps, HuntingMapCoordsRef } from './types';
import styles from './HuntingMapCoords.module.css';

export const HuntingMapCoords = forwardRef(
  (props: HuntingMapCoordsProps, ref: ForwardedRef<HuntingMapCoordsRef>) => {
    const { multiplier = 1000, placeholder = '-' } = props;

    // Reference to the element rendering coordinates
    const coordsRef = useRef<HTMLSpanElement>(null);

    // Update coordinate value
    const setCoords = useCallback(
      (coords: Point) => {
        if (!coordsRef.current) {
          return;
        }

        const [x, y] = coords;

        // Ensure coordinates are within map's boundaries
        if (x < 0 || x > 1 || y < 0 || y > 1) {
          return [placeholder, placeholder];
        }

        const [ratioX, ratioY] = getCoordinateRatio(coords, multiplier);
        coordsRef.current.innerHTML = `${ratioX}, ${ratioY}`;
      },
      [multiplier, placeholder],
    );

    // Expose coordinate setter
    useImperativeHandle(ref, () => ({
      setCoords,
    }));

    // Only render coordinates on devices that have mouse support
    if (!matchMedia('(pointer:fine)').matches) {
      return null;
    }

    return (
      <div className={styles.HuntingMapCoords}>
        <MdOutlineMyLocation className={styles.HuntingMapCoordsIcon} />
        <span ref={coordsRef} />
      </div>
    );
  },
);

HuntingMapCoords.displayName = 'HuntingMapCoords';
