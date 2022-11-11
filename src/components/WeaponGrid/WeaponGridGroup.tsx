import { SectionHeader } from 'components/SectionHeader';
import { WeaponGridRows } from './WeaponGridRows';
import { WeaponGridGroupProps } from './types';

export const WeaponGridGroup = (props: WeaponGridGroupProps) => {
  const { animal, group } = props;

  return (
    <>
      <SectionHeader>Tier {group.tier}</SectionHeader>
      <WeaponGridRows animal={animal} weapons={group.weapons} />
    </>
  );
};
