import { memo } from 'react';
import { SectionHeader } from 'components/SectionHeader';
import { AnimalActivityGridHeader } from './AnimalActivityGridHeader';
import { AnimalActivityGridRows } from './AnimalActivityGridRows';
import { AnimalActivityGridGroupProps } from './types';

const AnimalActivityGridHeaderMemo = memo(AnimalActivityGridHeader);

export const AnimalActivityGridGroup = (
  props: AnimalActivityGridGroupProps,
) => {
  const { group } = props;

  return (
    <>
      <SectionHeader>Tier {group.tier}</SectionHeader>
      <AnimalActivityGridHeaderMemo />
      <AnimalActivityGridRows animals={group.entities} />
    </>
  );
};
