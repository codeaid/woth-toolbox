import { memo } from 'react';
import { HuntingMapLabel as BaseHuntingMapLabel } from './HuntingMapLabel';

export type { HuntingMapLabelOptions } from './types';
export const HuntingMapLabel = memo(BaseHuntingMapLabel);
