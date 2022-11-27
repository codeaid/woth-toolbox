/**
 * Format hour value
 *
 * @param hour Value to format
 */
export const formatHour = (hour: number) =>
  `${hour.toString().padStart(2, '0')}:00`;

/**
 * Format a number according to the current locale
 *
 * @param value Value to format
 */
export const formatNumber = (value: number) =>
  Intl.NumberFormat(undefined, {
    useGrouping: true,
  }).format(value);

/**
 * Check if a list includes the specified value (or is empty)
 *
 * @param value Value to lookup
 * @param list Source value list
 */
export const hasListValue = <TValue>(value: TValue, list?: Array<TValue>) =>
  !list || !list.length || list.includes(value);
