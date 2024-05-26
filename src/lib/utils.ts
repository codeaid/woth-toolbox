import colors from 'color';
import type { ColorResult } from 'react-color';
import type { TypeOptions as ToastType } from 'react-toastify';
import { toast } from 'react-toastify';
import type { ToastContent, ToastOptions } from 'components/Notifications';

/**
 * Decode a base64 encoded string
 *
 * @param value Value to decode
 */
export const base64Decode = (value: string) =>
  decodeURIComponent(window.atob(value));

/**
 * Encode a string using base64 format
 *
 * @param value Value to encode
 */
export const base64Encode = (value: string) =>
  window.btoa(encodeURIComponent(value));

/**
 * Split an array into multiple partitions
 *
 * @param array Source array to split
 * @param partitionSize Number of elements in each partition
 */
export const partitionArray = <T>(
  array: Array<T>,
  partitionSize: number,
): Array<Array<T>> =>
  Array.from({ length: Math.ceil(array.length / partitionSize) }, (_, index) =>
    array.slice(index * partitionSize, (index + 1) * partitionSize),
  );

/**
 * Get the distance between the given date and now in words
 *
 * @param value Timestamp value to convert
 * @param locale Locale to use when formatting the date
 */
export const formatDateTime = (value?: Date | number, locale?: string) => {
  if (!value) {
    return;
  }

  if (typeof value === 'number') {
    value = new Date(value);
  }

  locale ??= getBrowserLocale();

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value);
};

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
 * Round a number down to the nearest base 10 value
 *
 * @param value Value to round down
 */
export const floorNearestFloor10 = (value: number) =>
  Math.min(1000, Math.pow(10, Math.floor(Math.log10(value))));

/**
 * Detect current locale used by the browser
 */
const getBrowserLocale = () =>
  new Intl.DateTimeFormat().resolvedOptions().locale;

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
 * Check if application is running in development mode
 */
export const isDevelopmentMode = () => process.env.NODE_ENV === 'development';

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
 * Show a notification
 *
 * @param content Notification content
 * @param type Toast type
 * @param options Notification options
 */
export const showNotification = <TData>(
  content: ToastContent<TData>,
  type?: ToastType,
  options?: ToastOptions<TData> | undefined,
) => toast(content, { type, ...options });

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
