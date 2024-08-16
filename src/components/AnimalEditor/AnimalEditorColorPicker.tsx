import { useCallback, useMemo } from 'react';
import type { ColorResult } from 'react-color';
import { ChromePicker } from 'react-color';
import { ColorSelector } from 'components/ColorSelector';
import { getIconComponent } from 'lib/icons';
import { getHexColor } from 'lib/utils';
import type { AnimalEditorColorPickerProps } from './types';
import styles from './AnimalEditorColorPicker.module.css';

export const AnimalEditorColorPicker = (
  props: AnimalEditorColorPickerProps,
) => {
  const { data, defaultIconColor, marker, onChange } = props;

  // Preview icon component
  const IconComponent = useMemo(
    () => getIconComponent(marker?.type),
    [marker?.type],
  );

  // Determine currently selected color
  const color = useMemo(
    () => data?.color ?? defaultIconColor,
    [data, defaultIconColor],
  );

  /**
   * Handle changes to the color
   */
  const handleChange = useCallback(
    (color: ColorResult) => onChange({ color: getHexColor(color) }),
    [onChange],
  );

  /**
   * Handle changes to the color
   */
  const handleColorSelectorChange = useCallback(
    (color: string) => onChange({ color }),
    [onChange],
  );

  return (
    <>
      <ColorSelector color={color} onChange={handleColorSelectorChange} />

      <ChromePicker
        className={styles.AnimalEditorColorPicker}
        color={color}
        disableAlpha
        styles={{
          default: {
            picker: {
              backgroundColor: '#121212',
              boxShadow: 'unset',
              fontFamily: 'var(--font-fira-sans), sans-serif',
              userSelect: 'none',
              width: 'auto',
            },
            swatch: {
              transform: 'scale(2)',
            },
          },
        }}
        onChange={handleChange}
      />

      <div className={styles.AnimalEditorColorPickerIcon}>
        <IconComponent
          size={50}
          style={{
            color: data?.color ?? defaultIconColor,
          }}
        />
      </div>
    </>
  );
};
