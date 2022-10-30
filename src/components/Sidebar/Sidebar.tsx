import { Fragment, useMemo } from 'react';
import { getAnimalGroups } from 'lib/animals';
import { AnimalGroup } from 'types/animals';
import styles from './Sidebar.module.css';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItem } from './SidebarItem';
import { SidebarProps } from './types';

export const Sidebar = (props: SidebarProps) => {
  const { animals, selected, onAnimalClick } = props;

  // Group animals by their tiers
  const animalGroups = useMemo(() => getAnimalGroups(animals), [animals]);

  /**
   * Render an individual animal group
   *
   * @param group Group to render
   */
  const renderGroup = (group: AnimalGroup) => (
    <Fragment key={group.tier}>
      <SidebarHeader tier={group.tier} />
      <ul className={styles.SidebarList} key={group.tier}>
        {group.animals.map(animal => (
          <SidebarItem
            active={animal.name === selected?.name}
            animal={animal}
            key={animal.name}
            onClick={onAnimalClick}
          />
        ))}
      </ul>
    </Fragment>
  );

  return <div className={styles.Sidebar}>{animalGroups.map(renderGroup)}</div>;
};
