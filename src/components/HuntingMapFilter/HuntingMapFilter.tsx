import type { MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import type { ButtonProps } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { SectionHeader } from 'components/SectionHeader';
import { SidePanel } from 'components/SidePanel';
import { useTranslator } from 'hooks';
import { hasSelectedFilters } from 'lib/filters';
import { getMarkerKey } from 'lib/i18n';
import {
  getMarkerOptionTypes,
  isAnimalMarkerType,
  isGenericMarkerType,
} from 'lib/markers';
import type {
  AnimalMarkerType,
  CustomMarkerType,
  GenericMarkerType,
  MarkerType,
} from 'types/markers';
import { HuntingMapFilterItem } from './HuntingMapFilterItem';
import { HuntingMapFilterOption } from './HuntingMapFilterOption';
import type { HuntingMapFilterProps } from './types';
import styles from './HuntingMapFilter.module.css';

export const HuntingMapFilter = (props: HuntingMapFilterProps) => {
  const { animalMarkers, genericMarkers, options, onChange } = props;

  // Flag indicating whether the filter menu is currently visible
  const [menuVisible, setMenuVisible] = useState(false);

  // Retrieve application translator
  const translate = useTranslator();

  // Extract list of types available in the options
  const markerTypes = useMemo(
    () => getMarkerOptionTypes(...animalMarkers, ...genericMarkers),
    [animalMarkers, genericMarkers],
  );

  // Extract list of types available in the options
  const markerTypesAnimals = useMemo(
    () => markerTypes.filter(isAnimalMarkerType) as Array<AnimalMarkerType>,
    [markerTypes],
  );

  // Extract list of types available in the options
  const markerTypesGeneric = useMemo(
    () => markerTypes.filter(isGenericMarkerType) as Array<GenericMarkerType>,
    [markerTypes],
  );

  // Extract list of selected animal types
  const selectedTypesAnimals = useMemo(
    () => options.types.filter(isAnimalMarkerType) as Array<AnimalMarkerType>,
    [options.types],
  );

  // Extract list of selected generic types
  const selectedTypesGeneric = useMemo(
    () => options.types.filter(isGenericMarkerType) as Array<GenericMarkerType>,
    [options.types],
  );

  /**
   * Handle clearing current filters
   */
  const handleClearFilters = useCallback(() => {
    // Clear filters and close the side panel
    onChange({
      hideUnedited: false,
      showExplorationMarkers: true,
      showLabels: true,
      showTrackingMarkers: true,
      types: [],
    });

    setMenuVisible(false);
  }, [onChange]);

  /**
   * Handle hiding filter visibility
   */
  const handleClose = useCallback(() => setMenuVisible(false), []);

  /**
   * Enable or disable all animal options at once
   */
  const handleToggleAnimalMarkers = useCallback(
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
   * Handle toggling exploration markers on or off
   */
  const handleToggleExplorationMarkers = useCallback(
    (showExplorationMarkers: boolean) =>
      onChange({ ...options, showExplorationMarkers }),
    [options, onChange],
  );

  /**
   * Enable or disable all generic options at once
   */
  const handleToggleGenericMarkers = useCallback(
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
   * Handle toggling labels on or off
   */
  const handleToggleLabels = useCallback(
    (showLabels: boolean) => onChange({ ...options, showLabels }),
    [options, onChange],
  );

  /**
   * Handle toggling tracking markers on or off
   */
  const handleToggleTrackingMarkers = useCallback(
    (showTrackingMarkers: boolean) =>
      onChange({ ...options, showTrackingMarkers }),
    [options, onChange],
  );

  /**
   * Handle toggling customized markers on or off
   *
   * @param hideUnchanged TRUE to hide unedited markers
   */
  const handleToggleUneditedMarkers = useCallback(
    (hideUnchanged: boolean) =>
      onChange({ ...options, hideUnedited: hideUnchanged }),
    [options, onChange],
  );

  /**
   * Handle toggling individual filter types on or off
   */
  const handleTypeChange = useCallback(
    (selected: boolean, type: MarkerType) => {
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
    (event?: MouseEvent<EventTarget>) => {
      event?.stopPropagation();
      setMenuVisible(current => !current);
    },
    [],
  );

  /**
   * Render generic options
   *
   * @param types List of option types to render
   * @param iconSize Size of filter item icon
   */
  const renderOptions = useCallback(
    (
      types: Array<AnimalMarkerType | CustomMarkerType | GenericMarkerType>,
      iconSize: number,
    ) => (
      <ul className={styles.HuntingMapFilterMenu}>
        {types
          .map(type => ({
            name: translate(getMarkerKey(type)),
            type,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, type }) => (
            <HuntingMapFilterItem
              iconSize={iconSize}
              key={type}
              selected={options.types.includes(type)}
              type={type}
              onChange={handleTypeChange}
            >
              {name}
            </HuntingMapFilterItem>
          ))}
      </ul>
    ),
    [handleTypeChange, options.types, translate],
  );

  // Render animal options
  const renderedAnimalOptions = useMemo(
    () =>
      markerTypesAnimals.length ? (
        <>
          <SectionHeader
            className={styles.HuntingMapFilterSectionHeader}
            onClick={handleToggleAnimalMarkers}
          >
            {translate('UI:SECTION_ANIMALS')}
          </SectionHeader>
          {renderOptions(markerTypesAnimals, 38)}
        </>
      ) : null,
    [handleToggleAnimalMarkers, markerTypesAnimals, renderOptions, translate],
  );

  // Render custom options
  const renderedCustomOptions = useMemo(
    () => (
      <>
        <SectionHeader>{translate('UI:CUSTOM')}</SectionHeader>
        <ul className={styles.HuntingMapFilterMenu}>
          <HuntingMapFilterOption
            checked={options.hideUnedited}
            onChange={handleToggleUneditedMarkers}
          >
            {translate('TOOLBOX:HIDE_UNEDITED')}
          </HuntingMapFilterOption>
        </ul>
      </>
    ),
    [handleToggleUneditedMarkers, options.hideUnedited, translate],
  );

  // Render generic options
  const renderedGenericOptions = useMemo(
    () =>
      markerTypesGeneric.length ? (
        <>
          <SectionHeader
            className={styles.HuntingMapFilterSectionHeader}
            onClick={handleToggleGenericMarkers}
          >
            {translate('UI:GENERAL')}
          </SectionHeader>
          {renderOptions(markerTypesGeneric, 28)}
        </>
      ) : null,
    [handleToggleGenericMarkers, markerTypesGeneric, renderOptions, translate],
  );

  // Render other options
  const renderedOtherOptions = useMemo(
    () => (
      <>
        <SectionHeader>{translate('UI:OTHER')}</SectionHeader>
        <ul className={styles.HuntingMapFilterMenu}>
          <HuntingMapFilterItem
            iconSize={20}
            selected={options.showLabels}
            type="marker:level area"
            onChange={handleToggleLabels}
          >
            {translate('UI:MARKER_LABELS')}
          </HuntingMapFilterItem>
          <HuntingMapFilterItem
            iconSize={20}
            selected={options.showExplorationMarkers}
            type="marker:exploration"
            onChange={handleToggleExplorationMarkers}
          >
            {translate('UI:MARKER_EXPLORATION')}
          </HuntingMapFilterItem>
          <HuntingMapFilterItem
            iconSize={20}
            selected={options.showTrackingMarkers}
            type="marker:tracking"
            onChange={handleToggleTrackingMarkers}
          >
            {translate('UI:MARKER_TRACKING')}
          </HuntingMapFilterItem>
        </ul>
      </>
    ),
    [
      handleToggleExplorationMarkers,
      handleToggleLabels,
      handleToggleTrackingMarkers,
      options.showExplorationMarkers,
      options.showLabels,
      options.showTrackingMarkers,
      translate,
    ],
  );

  // List of sidebar action buttons
  const sidebarActions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: translate('UI:RESET'),
        className: styles.HuntingMapFilterActionClear,
        disabled: !hasSelectedFilters(options),
        onClick: handleClearFilters,
      },
    ],
    [handleClearFilters, options, translate],
  );

  return (
    <>
      <IconButton
        className={styles.HuntingMapFilterToggle}
        highlighted={hasSelectedFilters(options)}
        onClick={handleToggleVisibility}
      >
        <BsEyeFill />
      </IconButton>

      <SidePanel
        actions={sidebarActions}
        className={styles.HuntingMapFilter}
        closeOnOutsideClick
        side="left"
        title={translate('UI:TOGGLE_FILTERS')}
        visible={menuVisible}
        onClose={handleClose}
      >
        {renderedGenericOptions}
        {renderedAnimalOptions}
        {renderedOtherOptions}
        {renderedCustomOptions}
      </SidePanel>
    </>
  );
};
