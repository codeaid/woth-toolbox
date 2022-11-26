import { SectionHeader } from 'components/SectionHeader';
import { AnimalListItem } from './AnimalListItem';
import { AnimalListGroupProps } from './types';

export const AnimalListGroup = (props: AnimalListGroupProps) => {
  const { group, selected, onAnimalClick } = props;

  return (
    <>
      <li>
        <SectionHeader>Tier {group.tier}</SectionHeader>
      </li>

      {group.entities.map(animal => (
        <AnimalListItem
          active={animal.type === selected?.type}
          animal={animal}
          key={animal.type}
          onClick={onAnimalClick}
        />
      ))}
    </>
  );
};
