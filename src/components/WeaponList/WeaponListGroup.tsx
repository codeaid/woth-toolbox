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

      {group.weapons.map(weapon => (
        <WeaponListItem
          active={weapon.id === selected?.id}
          weapon={weapon}
          key={weapon.id}
          onClick={onWeaponClick}
        />
      ))}
    </>
  );
};
