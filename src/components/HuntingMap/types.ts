type HuntingMapClickHandler = (x: number, y: number) => void;

export interface HuntingMapOffsets {
  pageX: number;
  pageY: number;
  translateX: number;
  translateY: number;
}

export interface HuntingMapOptions {
  mapHeight: number;
  mapLeft: number;
  mapScale: number;
  mapTop: number;
  mapWidth: number;
}

export interface HuntingMapProps {
  defaultScale?: number;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  maxScale?: number;
  minOverflow?: number;
  minScale?: number;
  scaleIncrement?: number;
  showButtons?: boolean;
  onClick?: HuntingMapClickHandler;
}
