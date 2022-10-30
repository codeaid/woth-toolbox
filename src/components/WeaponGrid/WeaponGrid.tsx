import classnames from 'classnames';
import { Fragment, useMemo } from 'react';
import { formatNumber } from 'lib/utils';
import {
  getWeaponGroups,
  getWeaponName,
  isOptimal,
  isSuboptimal,
} from 'lib/weapons';
import { Weapon, WeaponDistance, WeaponGroup } from 'types/weapons';
import styles from './WeaponGrid.module.css';
import { WeaponGridProps } from './types';

export const WeaponGrid = (props: WeaponGridProps) => {
  const { animal, weapons } = props;

  // Group weapons by their tiers
  const weaponGroups = useMemo(() => getWeaponGroups(weapons), [weapons]);

  /**
   * Render individual weapon row
   *
   * @param weapon Weapon to render
   */
  const renderWeapon = (weapon: Weapon) => {
    const [m50, m100, m150, m200, m300] = weapon.hitEnergy;

    // Generate optimal distance flags
    const optimal50 = isOptimal(animal, weapon, WeaponDistance.M50);
    const optimal100 = isOptimal(animal, weapon, WeaponDistance.M100);
    const optimal150 = isOptimal(animal, weapon, WeaponDistance.M150);
    const optimal200 = isOptimal(animal, weapon, WeaponDistance.M200);
    const optimal300 = isOptimal(animal, weapon, WeaponDistance.M300);

    const isAllOptimal =
      optimal50 && optimal100 && optimal150 && optimal200 && optimal300;

    // Generate suboptimal distance flags
    const suboptimal50 = isSuboptimal(animal, weapon, WeaponDistance.M50);
    const suboptimal100 = isSuboptimal(animal, weapon, WeaponDistance.M100);
    const suboptimal150 = isSuboptimal(animal, weapon, WeaponDistance.M150);
    const suboptimal200 = isSuboptimal(animal, weapon, WeaponDistance.M200);
    const suboptimal300 = isSuboptimal(animal, weapon, WeaponDistance.M300);

    return (
      <div className={styles.WeaponRow} key={weapon.model}>
        <div
          className={classnames({
            [styles.WeaponName]: true,
            [styles.WeaponNameOptimal]: isAllOptimal,
          })}
        >
          <div>{getWeaponName(weapon)}</div>
          <div className={styles.WeaponCalibre}>{weapon.calibre}</div>
        </div>
        <div className={styles.WeaponEnergyList}>
          <div
            className={classnames({
              [styles.WeaponEnergy]: true,
              [styles.WeaponEnergyOptimal]: optimal50,
              [styles.WeaponEnergySuboptimal]: suboptimal50,
            })}
          >
            {formatNumber(m50)}
          </div>
          <div
            className={classnames({
              [styles.WeaponEnergy]: true,
              [styles.WeaponEnergyOptimal]: optimal100,
              [styles.WeaponEnergySuboptimal]: suboptimal100,
            })}
          >
            {formatNumber(m100)}
          </div>
          <div
            className={classnames({
              [styles.WeaponEnergy]: true,
              [styles.WeaponEnergyOptimal]: optimal150,
              [styles.WeaponEnergySuboptimal]: suboptimal150,
            })}
          >
            {formatNumber(m150)}
          </div>
          <div
            className={classnames({
              [styles.WeaponEnergy]: true,
              [styles.WeaponEnergyOptimal]: optimal200,
              [styles.WeaponEnergySuboptimal]: suboptimal200,
            })}
          >
            {formatNumber(m200)}
          </div>
          <div
            className={classnames({
              [styles.WeaponEnergy]: true,
              [styles.WeaponEnergyOptimal]: optimal300,
              [styles.WeaponEnergySuboptimal]: suboptimal300,
            })}
          >
            {formatNumber(m300)}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render an individual weapon group
   *
   * @param group Group to render
   */
  const renderGroup = (group: WeaponGroup) => (
    <Fragment key={group.tier}>
      <div className={styles.WeaponTier}>
        <div className={styles.WeaponTierText}>{`TIER ${group.tier}`}</div>
      </div>

      <div className={styles.WeaponRows}>{group.weapons.map(renderWeapon)}</div>
    </Fragment>
  );

  return (
    <div className={styles.WeaponGrid}>
      <div className={classnames(styles.WeaponRow, styles.WeaponGridHeader)}>
        <div
          className={classnames(
            styles.WeaponName,
            styles.WeaponNameHeader,
            styles.WeaponGridHeader,
          )}
        >
          &#8203;
        </div>
        <div className={styles.WeaponEnergyList}>
          <div className={styles.WeaponEnergy}>50m</div>
          <div className={styles.WeaponEnergy}>100m</div>
          <div className={styles.WeaponEnergy}>150m</div>
          <div className={styles.WeaponEnergy}>200m</div>
          <div className={styles.WeaponEnergy}>300m</div>
        </div>
      </div>

      {weaponGroups.map(renderGroup)}
    </div>
  );
};
