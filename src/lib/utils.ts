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
