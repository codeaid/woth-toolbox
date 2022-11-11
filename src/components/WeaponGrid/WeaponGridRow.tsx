import { useMemo } from 'react';
import { WeaponName } from 'components/WeaponName';
import { isOptimal, isSuboptimal } from 'lib/weapons';
import { WeaponDistance } from 'types/weapons';
import { WeaponGridEnergyRating } from './WeaponGridEnergyRating';
import { WeaponGridRowProps } from './types';
import styles from './WeaponGridRow.module.css';

export const WeaponGridRow = (props: WeaponGridRowProps) => {
  const { animal, weapon } = props;

  // Extract energy hit ratings
  const [m50, m100, m150, m200, m300] = weapon.hitEnergy;

  // Generate optimal distance flags
  const optimal50 = useMemo(
    () => isOptimal(animal, weapon, WeaponDistance.M50),
    [animal, weapon],
  );
  const optimal100 = useMemo(
    () => isOptimal(animal, weapon, WeaponDistance.M100),
    [animal, weapon],
  );
  const optimal150 = useMemo(
    () => isOptimal(animal, weapon, WeaponDistance.M150),
    [animal, weapon],
  );
  const optimal200 = useMemo(
    () => isOptimal(animal, weapon, WeaponDistance.M200),
    [animal, weapon],
  );
  const optimal300 = useMemo(
    () => isOptimal(animal, weapon, WeaponDistance.M300),
    [animal, weapon],
  );

  // Generate suboptimal distance flags
  const suboptimal50 = useMemo(
    () => isSuboptimal(animal, weapon, WeaponDistance.M50),
    [animal, weapon],
  );
  const suboptimal100 = useMemo(
    () => isSuboptimal(animal, weapon, WeaponDistance.M100),
    [animal, weapon],
  );
  const suboptimal150 = useMemo(
    () => isSuboptimal(animal, weapon, WeaponDistance.M150),
    [animal, weapon],
  );
  const suboptimal200 = useMemo(
    () => isSuboptimal(animal, weapon, WeaponDistance.M200),
    [animal, weapon],
  );
  const suboptimal300 = useMemo(
    () => isSuboptimal(animal, weapon, WeaponDistance.M300),
    [animal, weapon],
  );

  // Flag indicating that all distances are optimal
  const isAllOptimal =
    optimal50 && optimal100 && optimal150 && optimal200 && optimal300;

  return (
    <div className={styles.WeaponGridRow}>
      <div className={styles.WeaponGridRowName}>
        <WeaponName highlighted={isAllOptimal} weapon={weapon} />
      </div>

      <div className={styles.WeaponGridRowRatings}>
        <WeaponGridEnergyRating
          optimal={optimal50}
          suboptimal={suboptimal50}
          value={m50}
        />
        <WeaponGridEnergyRating
          optimal={optimal100}
          suboptimal={suboptimal100}
          value={m100}
        />
        <WeaponGridEnergyRating
          optimal={optimal150}
          suboptimal={suboptimal150}
          value={m150}
        />
        <WeaponGridEnergyRating
          optimal={optimal200}
          suboptimal={suboptimal200}
          value={m200}
        />
        <WeaponGridEnergyRating
          optimal={optimal300}
          suboptimal={suboptimal300}
          value={m300}
        />
      </div>
    </div>
  );
};
