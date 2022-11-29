export interface HuntingMapLabelOptions {
  habitat: string;
  left: number;
  name: string;
  top: number;
}

export interface HuntingMapLabelProps extends HuntingMapLabelOptions {
  mapScale: number;
  maxMapScale: number;
  minMapScale: number;
}
