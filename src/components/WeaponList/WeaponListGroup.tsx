import { SectionHeader } from 'components/SectionHeader';
import { WeaponListItem } from './WeaponListItem';
import { WeaponListGroupProps } from './types';

export const WeaponListGroup = (props: WeaponListGroupProps) => {
  const { group, selected, onWeaponClick } = props;

  return (
    <>
      <li>
        <SectionHeader>Tier {group.tier}</SectionHeader>
      </li>

      {group.entities.map(weapon => (
        <WeaponListItem
          active={weapon.slug === selected?.slug}
          weapon={weapon}
          key={weapon.slug}
          onClick={onWeaponClick}
        />
      ))}
    </>
  );
};
