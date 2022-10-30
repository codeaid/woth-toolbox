/**
 * Format a number according to the current locale
 *
 * @param value Value to format
 */
export const formatNumber = (value: number) =>
  Intl.NumberFormat(undefined, {
    useGrouping: true,
  }).format(value);
