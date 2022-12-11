import colors from 'color';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';
import { ColorResult } from 'react-color';

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
 * Get the distance between the given date and now in words
 *
 * @param value Timestamp value to convert
 */
export const formatTimestampDistance = (value?: number) => {
  if (!value) {
    return;
  }

  return formatDistanceToNow(fromUnixTime(value / 1000), {
    addSuffix: true,
    includeSeconds: true,
  });
};

/**
 * Convert a color result to a HEX string
 *
 * @param color Source color object
 */
export const getHexColor = (color: ColorResult) =>
  colors.rgb(color.rgb.r, color.rgb.g, color.rgb.b).hex().toLowerCase();

/**
 * Check if a list includes the specified value (or is empty)
 *
 * @param value Value to lookup
 * @param list Source value list
 */
export const hasListValue = <TValue>(value: TValue, list?: Array<TValue>) =>
  !list || !list.length || list.includes(value);

/**
 * Determine if the specified value is not empty (not "undefined" or "null")
 *
 * @param value Value to check
 */
export const isNotEmpty = <TValue>(value: Maybe<TValue>): value is TValue =>
  value !== null && typeof value !== 'undefined';

/**
 * Round number to the specified number of decimal places
 *
 * @param value Value to round
 * @param decimals Number of decimal places
 */
export const roundNumber = (value: number, decimals = 2) =>
  Math.round((value + Number.EPSILON) * Math.pow(10, decimals)) /
  Math.pow(10, decimals);

/**
 * Repeat the specified function N number of times
 *
 * @param count Number of times to repeat the callback
 * @param callback Callback to invoke for each iteration
 */
export const times = <TResult>(
  count: number,
  callback: (index: number) => TResult,
) => Array.from(Array(count).keys()).map(callback);
