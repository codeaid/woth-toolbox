import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { ButtonProps } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { SectionHeader } from 'components/SectionHeader';
import { SidePanel } from 'components/SidePanel';
import { animalNameMap, genericNameMap } from 'config/names';
import {
  getMarkerOptionTypes,
  isAnimalMarkerType,
  isGenericMarkerType,
} from 'lib/markers';
import { MarkerType } from 'types/markers';
import { HuntingMapFilterItem } from './HuntingMapFilterItem';
import { HuntingMapFilterProps } from './types';
import styles from './HuntingMapFilter.module.css';

export const HuntingMapFilter = (props: HuntingMapFilterProps) => {
  const { animalMarkers, genericMarkers, options, onChange } = props;

  // Flag indicating whether the filter menu is currently visible
  const [menuVisible, setMenuVisible] = useState(false);

  // References to component elements
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Extract list of types available in the options
  const markerTypes = useMemo(
    () => getMarkerOptionTypes(...animalMarkers, ...genericMarkers),
    [animalMarkers, genericMarkers],
  );

  // Extract list of types available in the options
  const markerTypesAnimals = useMemo(
    () => markerTypes.filter(isAnimalMarkerType),
    [markerTypes],
  );

  // Extract list of types available in the options
  const markerTypesGeneric = useMemo(
    () => markerTypes.filter(isGenericMarkerType),
    [markerTypes],
  );

  // Extract list of selected animal types
  const selectedTypesAnimals = useMemo(
    () => options.types.filter(isAnimalMarkerType),
    [options.types],
  );

  // Extract list of selected generic types
  const selectedTypesGeneric = useMemo(
    () => options.types.filter(isGenericMarkerType),
    [options.types],
  );

  /**
   * Handle clearing current filters
   */
  const handleClearFilters = useCallback(() => {
    // Clear filters and close the side panel
    onChange({
      types: [],
    });

    setMenuVisible(false);
  }, [onChange]);

  /**
   * Enable or disable all animal options at once
   */
  const handleToggleAnimalOptions = useCallback(
    () =>
      selectedTypesAnimals.length > 0
        ? onChange({
            ...options,
            types: selectedTypesGeneric,
          })
        : onChange({
            ...options,
            types: [...selectedTypesGeneric, ...markerTypesAnimals],
          }),
    [
      markerTypesAnimals,
      onChange,
      options,
      selectedTypesAnimals.length,
      selectedTypesGeneric,
    ],
  );

  /**
   * Enable or disable all generic options at once
   */
  const handleToggleGenericOptions = useCallback(
    () =>
      selectedTypesGeneric.length > 0
        ? onChange({
            ...options,
            types: selectedTypesAnimals,
          })
        : onChange({
            ...options,
            types: [...selectedTypesAnimals, ...markerTypesGeneric],
          }),
    [
      markerTypesGeneric,
      onChange,
      options,
      selectedTypesAnimals,
      selectedTypesGeneric.length,
    ],
  );

  /**
   * Handle toggling individual filter types on or off
   */
  const handleToggleType = useCallback(
    (type: MarkerType, selected: boolean) => {
      if (!onChange) {
        return;
      }

      // Update list of enabled types
      const types = selected
        ? [...new Set(options.types).add(type)]
        : options.types.filter(marker => marker !== type);

      onChange({
        ...options,
        types: types,
      });
    },
    [options, onChange],
  );

  /**
   * Handle toggling filter visibility
   */
  const handleToggleVisibility = useCallback(
    () => setMenuVisible(current => !current),
    [],
  );

  /**
   * Handle pressing keyboard keys
   */
  const handleDocumentKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'r' && !event.ctrlKey) {
        handleToggleVisibility();
      }
    },
    [handleToggleVisibility],
  );

  /**
   * Render generic options
   *
   * @param options Map of option types and names to render
   */
  const renderOptions = useCallback(
    (
      types: Array<MarkerType>,
      nameMap: Map<MarkerType, string>,
      large: boolean,
    ) => (
      <>
        {types
          .map(type => ({ name: nameMap.get(type) ?? '', type }))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, type }) => (
            <HuntingMapFilterItem
              key={type}
              large={large}
              selected={options.types.includes(type)}
              type={type}
              onToggle={handleToggleType}
            >
              {name}
            </HuntingMapFilterItem>
          ))}
      </>
    ),
    [handleToggleType, options],
  );

  // Render animal options
  const renderedAnimalOptions = useMemo(
    () =>
      markerTypesAnimals.length ? (
        <>
          <SectionHeader
            className={styles.HuntingMapFilterSectionHeader}
            onClick={handleToggleAnimalOptions}
          >
            Animals
          </SectionHeader>
          {renderOptions(markerTypesAnimals, animalNameMap, true)}
        </>
      ) : null,
    [handleToggleAnimalOptions, markerTypesAnimals, renderOptions],
  );

  // Render generic options
  const renderedGenericOptions = useMemo(
    () =>
      markerTypesGeneric.length ? (
        <>
          <SectionHeader
            className={styles.HuntingMapFilterSectionHeader}
            onClick={handleToggleGenericOptions}
          >
            General
          </SectionHeader>
          {renderOptions(markerTypesGeneric, genericNameMap, false)}
        </>
      ) : null,
    [handleToggleGenericOptions, markerTypesGeneric, renderOptions],
  );

  // List of sidebar action buttons
  const sidebarActions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: 'Clear',
        className: styles.HuntingMapFilterActionClear,
        disabled: !options.types.length,
        onClick: handleClearFilters,
      },
    ],
    [handleClearFilters, options.types.length],
  );

  // Monitor clicks outside the current marker and hide zones when needed
  useEffect(() => {
    document.addEventListener('keypress', handleDocumentKeyPress);

    return () => {
      document.removeEventListener('keypress', handleDocumentKeyPress);
    };
  }, [handleDocumentKeyPress]);

  return (
    <>
      <IconButton
        className={styles.HuntingMapFilterToggle}
        highlighted={!!options.types.length}
        ref={buttonRef}
        onClick={handleToggleVisibility}
      >
        <BsEyeFill />
      </IconButton>

      <SidePanel
        actions={sidebarActions}
        className={styles.HuntingMapFilter}
        side="left"
        visible={menuVisible}
        title="Filters"
        onClose={handleToggleVisibility}
      >
        <ul className={styles.HuntingMapFilterMenu} ref={menuRef}>
          {renderedGenericOptions}
          {renderedAnimalOptions}
        </ul>
      </SidePanel>
    </>
  );
};
