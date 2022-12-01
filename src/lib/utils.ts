import colors from 'color';
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
