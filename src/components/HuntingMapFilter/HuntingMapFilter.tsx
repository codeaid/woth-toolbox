import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { SectionHeader } from 'components/SectionHeader';
import { animalNameMap, genericNameMap } from 'config/names';
import { IconButton } from 'components/IconButton';
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

  /**
   * Handle clicking on the filter button
   */
  const handleButtonClick = useCallback(
    () => setMenuVisible(current => !current),
    [],
  );

  /**
   * Handle clicking on the trigger icon
   */
  const handleDocumentClick = useCallback((event: Event) => {
    const clickOnButton = buttonRef.current
      ? buttonRef.current.contains(event.target as Node)
      : false;
    const clickOnMenu = menuRef.current
      ? menuRef.current.contains(event.target as Node)
      : false;

    // Ignore clicks on the filter button and menu elements
    if (clickOnButton || clickOnMenu) {
      return;
    }

    setMenuVisible(false);
  }, []);

  /**
   * Handle pressing keyboard keys
   */
  const handleDocumentKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'r') {
        handleButtonClick();
      }
    },
    [handleButtonClick],
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
        ? [...new Set(options.selectedTypes).add(type)]
        : options.selectedTypes.filter(marker => marker !== type);

      onChange({
        ...options,
        selectedTypes: types,
      });
    },
    [options, onChange],
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
              selected={options.selectedTypes.includes(type)}
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
      markerTypesAnimals.length && (
        <>
          <SectionHeader>Animals</SectionHeader>
          {renderOptions(markerTypesAnimals, animalNameMap, true)}
        </>
      ),
    [markerTypesAnimals, renderOptions],
  );

  // Render generic options
  const renderedGenericOptions = useMemo(
    () =>
      markerTypesGeneric.length && (
        <>
          <SectionHeader>General</SectionHeader>
          {renderOptions(markerTypesGeneric, genericNameMap, false)}
        </>
      ),
    [markerTypesGeneric, renderOptions],
  );

  // Filter options list
  const renderedFilterMenu = useMemo(
    () =>
      menuVisible && (
        <ul className={styles.HuntingMapFilterMenu} ref={menuRef}>
          {renderedGenericOptions}
          {renderedAnimalOptions}
        </ul>
      ),
    [menuVisible, renderedAnimalOptions, renderedGenericOptions],
  );

  // Position menu just below the filter button
  useEffect(() => {
    const buttonElement = buttonRef.current;
    const menuElement = menuRef.current;

    // Ensure all required elements are present
    if (!buttonElement || !menuElement) {
      return;
    }

    const { height } = buttonElement.getBoundingClientRect();
    menuElement.style.top = `calc(${height}px + 1em)`;
  }, [menuVisible]);

  // Monitor clicks outside the current marker and hide zones when needed
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keypress', handleDocumentKeyPress);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keypress', handleDocumentKeyPress);
    };
  }, [handleDocumentClick, handleDocumentKeyPress]);

  return (
    <>
      <div className={styles.HuntingMapFilter}>
        <IconButton
          highlighted={!!options.selectedTypes.length}
          ref={buttonRef}
          onClick={handleButtonClick}
        >
          <BsEyeFill />
        </IconButton>
      </div>
      {renderedFilterMenu}
    </>
  );
};
