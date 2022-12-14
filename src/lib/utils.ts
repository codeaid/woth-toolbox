import colors from 'color';
import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import { ColorResult } from 'react-color';
import { dateLocaleMap } from 'config/date';

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
 * @param locale Locale to use when formatting the number
 */
export const formatNumber = (
  value: number,
  locale: Optional<string> = undefined,
) =>
  Intl.NumberFormat(locale, {
    useGrouping: true,
  }).format(value);

/**
 * Get the distance between the given date and now in words
 *
 * @param value Timestamp value to convert
 * @param locale Locale to use when formatting the date
 */
export const formatTimestampDistance = (
  value?: number,
  locale: Optional<string> = undefined,
) => {
  if (!value) {
    return;
  }

  // Pick date locale configuration object
  const dateLocale = locale ? dateLocaleMap.get(locale) : undefined;

  return formatDistanceToNowStrict(fromUnixTime(value / 1000), {
    addSuffix: true,
    locale: dateLocale,
  });
};

/**
 * Round a number down to the nearest base 10 value
 *
 * @param value Value to round down
 */
export const floorNearestFloor10 = (value: number) =>
  Math.min(1000, Math.pow(10, Math.floor(Math.log10(value))));

/**
 * Get map scale's step for the current distance
 *
 * @param value Target distance
 * @param mapStep10000m Map step at 10,000 metres and more
 * @param mapStep1000m Map step at 1,000 metres and more
 * @param mapStep100m Map step at 100 metres and more
 * @param mapStep10m Map step at 10 metres and more
 */
export const getMapScaleStep = (
  value: number,
  mapStep10000m: number,
  mapStep1000m: number,
  mapStep100m: number,
  mapStep10m: number,
) => {
  if (value > 10000) {
    return mapStep10000m;
  } else if (value > 1000) {
    return mapStep1000m;
  } else if (value > 100) {
    return mapStep100m;
  } else if (value > 10) {
    return mapStep10m;
  }

  return 1;
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
