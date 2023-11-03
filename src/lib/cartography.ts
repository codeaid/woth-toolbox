import { roundNumber } from 'lib/utils';
import type { MapOptions, MapZoomOptions } from 'types/cartography';
import type { Point } from 'types/generic';

/**
 * Get position of an element relative to the page
 *
 * @param element Target element
 */
const getElementOffset = (element: HTMLElement): Point => {
  const { left: offsetX, top: offsetY } = element.getBoundingClientRect();
  return [offsetX, offsetY];
};

/**
 * Get position of the mouse cursor over an element
 *
 * @param pageX Horizontal mouse position in relation to the page
 * @param pageY Vertical mouse position in relation to the page
 * @param element Target element
 */
const getElementMouseOffset = (
  pageX: number,
  pageY: number,
  element: HTMLElement,
): Point => {
  // Get position of the element relative ot the page
  const [elementLeft, elementTop] = getElementOffset(element);

  return [pageX - elementLeft, pageY - elementTop];
};

/**
 * Get mouse position relative to the map image
 *
 * @param pageX Horizontal mouse position in relation to the page
 * @param pageY Vertical mouse position in relation to the page
 * @param container Map container element
 * @param image Map image element
 * @param mapLeft Current left offset of the map in relation to the container
 * @param mapTop Current top offset of the map in relation to the container
 */
const getMapMouseOffset = (
  pageX: number,
  pageY: number,
  container: HTMLElement,
  image: HTMLElement,
  mapLeft: number,
  mapTop: number,
): Point => {
  // Calculate mouse position on the container element
  const [mouseContainerX, mouseContainerY] = getElementMouseOffset(
    pageX,
    pageY,
    container,
  );

  // Calculate mouse position over the map image element
  const mouseImageX = mouseContainerX - mapLeft;
  const mouseImageY = mouseContainerY - mapTop;

  return [mouseImageX, mouseImageY];
};

/**
 * Get mouse position relative to the map image as a percentage
 *
 * @param pageX Horizontal mouse position in relation to the page
 * @param pageY Vertical mouse position in relation to the page
 * @param container Map container element
 * @param image Map image element
 * @param mapOptions Map options
 */
export const getMapMouseOffsetRatio = (
  pageX: number,
  pageY: number,
  container: HTMLElement,
  image: HTMLElement,
  mapOptions: MapOptions,
): Point => {
  const { mapHeight, mapLeft, mapTop, mapWidth } = mapOptions;

  // Get mouse position relative to the map image
  const [mouseImageX, mouseImageY] = getMapMouseOffset(
    pageX,
    pageY,
    container,
    image,
    mapLeft,
    mapTop,
  );

  return [
    roundNumber(mouseImageX / mapWidth, 10),
    roundNumber(mouseImageY / mapHeight, 10),
  ];
};

/**
 * Get map dimensions at the specified zoom
 *
 * @param imageWidth Original map image width
 * @param imageHeight Original map image height
 * @param zoomValue Target zoom value
 */
export const getMapDimensions = (
  imageWidth: number,
  imageHeight: number,
  zoomValue: number,
): Point => [
  getMapSize(imageWidth, zoomValue),
  getMapSize(imageHeight, zoomValue),
];

/**
 * Get map height or width at the specified zoom
 *
 * @param sizeValue Map image height or width value
 * @param zoomValue Target zoom multiplier
 */
export const getMapSize = (sizeValue: number, zoomValue: number) =>
  sizeValue * zoomValue;

/**
 * Calculate how much the map needs to be moved by vertically and horizontally
 * based on the position of the mouse on it to ensure zoom in and out is
 * pivoted around the mouse cursor
 *
 * @param mapWidth Map width
 * @param mapHeight Map height
 * @param mapLeft Current left offset of the map in relation to the container
 * @param mapTop Current top offset of the map in relation to the container
 * @param nextWidth Width map is being changed to
 * @param nextHeight Height map is being changed to
 * @param mouseRatioX Horizontal position of the mouse over the map (percentage)
 * @param mouseRatioY Vertical position of the mouse over the map (percentage)
 */
const getNextMapOffset = (
  mapWidth: number,
  mapHeight: number,
  mapLeft: number,
  mapTop: number,
  nextWidth: number,
  nextHeight: number,
  mouseRatioX: number,
  mouseRatioY: number,
): Point => {
  // Calculate difference in height and width after zooming in or out
  const shiftLeft = (nextWidth - mapWidth) * mouseRatioX;
  const shiftTop = (nextHeight - mapHeight) * mouseRatioY;

  // Calculate updated map dimensions
  const nextLeft = mapLeft - shiftLeft;
  const nextTop = mapTop - shiftTop;

  return [nextLeft, nextTop];
};

/**
 * Get map options with offsets ensuring map is centered inside container
 *
 * @param options Source map options
 */
export const getCenteredMapOptions = (options: MapOptions): MapOptions => {
  // Extract current map options
  const { containerHeight, containerWidth, mapHeight, mapWidth } = options;

  // Adjust left and top offsets to move map to the center
  const shiftLeft = (containerWidth - mapWidth) / 2;
  const shiftTop = (containerHeight - mapHeight) / 2;

  return {
    ...options,
    mapLeft: shiftLeft,
    mapTop: shiftTop,
  };
};

/**
 * Get map options ensuring that the image is not outside container boundaries
 *
 * @param options Target map options
 */
const getConstrainedMapOptions = (options: MapOptions) => {
  // Extract current map options
  const {
    containerHeight,
    containerWidth,
    mapHeight,
    mapLeft,
    mapBoundary,
    mapTop,
    mapWidth,
  } = options;

  // Start with original map offsets
  let nextLeft = mapLeft;
  let nextTop = mapTop;

  if (mapLeft <= mapBoundary - mapWidth) {
    // Ensure map cannot be dragged out of the left side of container
    nextLeft = -(mapWidth - mapBoundary);
  } else if (mapLeft >= containerWidth - mapBoundary) {
    // Ensure map cannot be dragged out of the right side of container
    nextLeft = containerWidth - mapBoundary;
  }

  if (mapTop <= mapBoundary - mapHeight) {
    // Ensure map cannot be dragged out of the top edge of container
    nextTop = -(mapHeight - mapBoundary);
  } else if (mapTop >= containerHeight - mapBoundary) {
    // Ensure map cannot be dragged out of the bottom edge of container
    nextTop = containerHeight - mapBoundary;
  }

  return {
    ...options,
    mapLeft: nextLeft,
    mapTop: nextTop,
  };
};

/**
 * Build map options based on the target zoom
 *
 * @param pageX Horizontal mouse position in relation to the page
 * @param pageY Vertical mouse position in relation to the page
 * @param container Map container element
 * @param image Map image element
 * @param currentMapOptions Current map options
 * @param targetZoomOptions Target zoom options
 */
export const getNextMapOptions = (
  pageX: number,
  pageY: number,
  container: HTMLElement,
  image: HTMLElement,
  currentMapOptions: MapOptions,
  targetZoomOptions: MapZoomOptions,
): MapOptions => {
  // Extract map options
  const { imageHeight, imageWidth, mapHeight, mapLeft, mapTop, mapWidth } =
    currentMapOptions;

  // Extract zoom options
  const { zoomValue } = targetZoomOptions;

  // Get mouse position relative to the map image as a percentage
  const [mouseRatioX, mouseRatioY] = getMapMouseOffsetRatio(
    pageX,
    pageY,
    container,
    image,
    currentMapOptions,
  );

  // Calculate updated map dimensions
  const [nextWidth, nextHeight] = getMapDimensions(
    imageWidth,
    imageHeight,
    zoomValue,
  );

  // Calculate new map's offsets after zooming in or out
  const [nextLeft, nextTop] = getNextMapOffset(
    mapWidth,
    mapHeight,
    mapLeft,
    mapTop,
    nextWidth,
    nextHeight,
    mouseRatioX,
    mouseRatioY,
  );

  return {
    ...currentMapOptions,
    mapHeight: nextHeight,
    mapLeft: nextLeft,
    mapTop: nextTop,
    mapWidth: nextWidth,
  };
};

/**
 * Update map options with zoom value after zooming in or out
 *
 * @param currentZoomOptions Current zoom options
 * @param delta Zoom delta to apply
 */
export const getNextZoomOptions = (
  currentZoomOptions: MapZoomOptions,
  delta: number,
): MapZoomOptions => ({
  ...currentZoomOptions,
  zoomValue: getNextZoomValue(currentZoomOptions, delta),
});

/**
 * Calculate the next map zoom value
 *
 * @param zoomOptions Current zoom options
 * @param delta Zoom delta to apply
 */
export const getNextZoomValue = (
  zoomOptions: MapZoomOptions,
  delta: number,
) => {
  const { zoomMax, zoomMin, zoomSpeed, zoomStep, zoomValue } = zoomOptions;

  // Calculate next zoom value
  const coefficient = (delta / 25) * zoomSpeed;
  const nextZoom = zoomValue - zoomStep * zoomValue * coefficient;

  // Ensure target zoom remains within the specified boundaries
  return roundNumber(Math.max(zoomMin, Math.min(zoomMax, nextZoom)), 3);
};

/**
 * Get center coordinates of the current page if mouse cursor location is not
 * currently known
 *
 * @param document HTML document element
 */
export const getScreenCenterOffset = (document: Document): Point => {
  // Extract current document height and width
  const { height: documentHeight, width: documentWidth } =
    document.body.getBoundingClientRect();

  return [Math.round(documentWidth / 2), Math.round(documentHeight / 2)];
};

/**
 * Update position of the map image wrapper inside the container
 *
 * @param imageWrapper Reference to the image wrapper element
 * @param image Reference to the map element
 * @param options Map options
 * @param callback Callback to execute after successfully updating the map
 */
export const updateMapPosition = (
  imageWrapper: Nullable<HTMLElement>,
  image: Nullable<HTMLImageElement>,
  options: MapOptions,
  callback?: () => void,
) => {
  // Ensure map image and its container elements are available
  if (!imageWrapper || !image) {
    return;
  }

  // Ensure map remains within the specified boundaries
  const constrainedOptions = getConstrainedMapOptions(options);

  // Extract map options
  const { mapHeight, mapLeft, mapTop, mapWidth } = constrainedOptions;

  // Update image dimensions
  image.height = mapHeight;
  image.width = mapWidth;

  // Update image wrapper style to reposition the map
  imageWrapper.style.height = `${mapHeight}px`;
  imageWrapper.style.transform = `translate3d(${mapLeft}px, ${mapTop}px, 0)`;
  imageWrapper.style.width = `${mapWidth}px`;

  callback && callback();
};
