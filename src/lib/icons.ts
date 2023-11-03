import { DefaultIcon } from 'components/Icon';
import { iconComponentMap } from 'config/icons';
import type { MarkerType } from 'types/markers';

/**
 * Get icon component associated with the specified marker type
 *
 * @param type Target marker type
 */
export const getIconComponent = (type?: MarkerType) =>
  type ? iconComponentMap.get(type) ?? DefaultIcon : DefaultIcon;
