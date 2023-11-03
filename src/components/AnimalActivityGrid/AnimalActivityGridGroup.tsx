import { memo } from 'react';
import { SectionHeader } from 'components/SectionHeader';
import { useTranslator } from 'hooks';
import { getTierKey } from 'lib/i18n';
import { AnimalActivityGridHeader } from './AnimalActivityGridHeader';
import { AnimalActivityGridRows } from './AnimalActivityGridRows';
import type { AnimalActivityGridGroupProps } from './types';

const AnimalActivityGridHeaderMemo = memo(AnimalActivityGridHeader);

export const AnimalActivityGridGroup = (
  props: AnimalActivityGridGroupProps,
) => {
  const { group } = props;

  // Retrieve application translator
  const translate = useTranslator();

  return (
    <>
      <SectionHeader>{translate(getTierKey(group.tier))}</SectionHeader>
      <AnimalActivityGridHeaderMemo />
      <AnimalActivityGridRows animals={group.entities} />
    </>
  );
};
