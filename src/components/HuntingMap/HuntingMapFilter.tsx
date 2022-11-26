import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { SectionHeader } from 'components/SectionHeader';
import { animalNameMap } from 'config/animals';
import { genericMarkerNameMap } from 'config/markers';
import { isMarkerEnabled } from 'lib/markers';
import { MarkerType } from 'types/markers';
import { HuntingMapFilterItem } from './HuntingMapFilterItem';
import { HuntingMapFilterProps } from './types';
import buttonStyles from './HuntingMapButton.module.css';
import styles from './HuntingMapFilter.module.css';

export const HuntingMapFilter = (props: HuntingMapFilterProps) => {
  const { enabledTypes, markerFilter, onChange } = props;

  // Flag indicating whether the filter menu is currently visible
  const [menuVisible, setMenuVisible] = useState(false);

  // References to component elements
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Filter animal name map to only include enabled markers
  const enabledAnimalNames = useMemo(
    () =>
      new Map(
        [...animalNameMap.entries()].filter(([type]) =>
          isMarkerEnabled(type, enabledTypes),
        ),
      ),
    [enabledTypes],
  );

  // Filter generic name map to only include enabled markers
  const enabledGenericNames = useMemo(
    () =>
      new Map(
        [...genericMarkerNameMap.entries()].filter(([type]) =>
          isMarkerEnabled(type, enabledTypes),
        ),
      ),
    [enabledTypes],
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
   * Handle toggling individual filter types on or off
   */
  const handleToggleType = useCallback(
    (type: MarkerType, selected: boolean) => {
      if (!onChange) {
        return;
      }

      // Update list of enabled types
      const types = selected
        ? [...new Set(markerFilter).add(type)]
        : markerFilter.filter(marker => marker !== type);

      onChange(types);
    },
    [markerFilter, onChange],
  );

  /**
   * Render generic options
   *
   * @param options Map of option types and names to render
   */
  const renderOptions = useCallback(
    (options: Map<MarkerType, string>) => (
      <>
        {[...options.entries()]
          .filter(([type]) => isMarkerEnabled(type, enabledTypes))
          .sort(([, nameA], [nameB]) => nameA.localeCompare(nameB))
          .map(([type, name]) => (
            <HuntingMapFilterItem
              key={type}
              selected={markerFilter.includes(type)}
              type={type}
              onToggle={handleToggleType}
            >
              {name}
            </HuntingMapFilterItem>
          ))}
      </>
    ),
    [enabledTypes, handleToggleType, markerFilter],
  );

  // Render animal options
  const renderedAnimalOptions = useMemo(
    () =>
      enabledAnimalNames.size && (
        <>
          <SectionHeader>Animals</SectionHeader>
          {renderOptions(enabledAnimalNames)}
        </>
      ),
    [enabledAnimalNames, renderOptions],
  );

  // Render generic options
  const renderedGenericOptions = useMemo(
    () =>
      enabledGenericNames.size && (
        <>
          <SectionHeader>General</SectionHeader>
          {renderOptions(enabledGenericNames)}
        </>
      ),
    [enabledGenericNames, renderOptions],
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

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <>
      <div className={styles.HuntingMapFilter}>
        <button
          className={buttonStyles.HuntingMapButton}
          ref={buttonRef}
          onClick={handleButtonClick}
        >
          <BsEyeFill />
        </button>
      </div>
      {renderedFilterMenu}
    </>
  );
};
