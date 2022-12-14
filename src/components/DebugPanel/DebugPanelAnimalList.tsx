import { useMemo } from 'react';
import { animalMarkerTypes } from 'config/markers';
import { useTranslator } from 'hooks';
import { getAnimalTypeKey } from 'lib/i18n';
import { getIconComponent } from 'lib/icons';
import { DebugPanelAnimalListProps } from './types';
import styles from './DebugPanelAnimalList.module.css';

export const DebugPanelAnimalList = (props: DebugPanelAnimalListProps) => {
  const { selected, onSelect } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // List of animal buttons to render
  const renderedButtons = useMemo(
    () =>
      animalMarkerTypes.map(type => {
        const IconComponent = getIconComponent(type);
        const title = translate(getAnimalTypeKey(type));

        return (
          <IconComponent
            className={styles.DebugPanelAnimalListIcon}
            highlighted={type === selected}
            key={type}
            size={45}
            title={title}
            onClick={() => onSelect(type)}
          />
        );
      }),
    [onSelect, selected, translate],
  );

  return <div className={styles.DebugPanelAnimalList}>{renderedButtons}</div>;
};
