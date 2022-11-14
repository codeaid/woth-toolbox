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
          active={animal.id === selected?.id}
          animal={animal}
          key={animal.id}
          onClick={onAnimalClick}
        />
      ))}
    </>
  );
};
