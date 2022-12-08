import { useCallback, useMemo } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { getIconComponent } from 'lib/icons';
import { getHexColor } from 'lib/utils';
import { AnimalEditorColorPickerProps } from './types';
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

  /**
   * Handle changes to the color
   */
  const handleChange = useCallback(
    (color: ColorResult) =>
      onChange({
        ...data,
        color: getHexColor(color),
      }),
    [data, onChange],
  );

  return (
    <>
      <ChromePicker
        color={data.color ?? defaultIconColor}
        disableAlpha={true}
        styles={{
          default: {
            picker: {
              backgroundColor: '#121212',
              boxShadow: 'unset',
              fontFamily: '"Fira Sans", sans-serif',
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
            color: data.color ?? defaultIconColor,
          }}
        />
      </div>
    </>
  );
};
