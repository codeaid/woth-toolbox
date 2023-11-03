import type { MapFilterOptions } from 'types/cartography';

/**
 * Check if specified filter options contain any selection
 *
 * @param options Option to validate
 */
export const hasSelectedFilters = (options: MapFilterOptions) =>
  options.types.length > 0 ||
  options.hideUnedited ||
  !options.showExplorationMarkers ||
  !options.showLabels ||
  !options.showTrackingMarkers;
