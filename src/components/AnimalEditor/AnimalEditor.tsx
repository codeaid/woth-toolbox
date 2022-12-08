import classnames from 'classnames';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { Textarea } from 'components/Textarea';
import { getAnimalName } from 'lib/animals';
import { getIconComponent } from 'lib/icons';
import { formatTimestampDistance, getHexColor } from 'lib/utils';
import { AnimalMarkerData } from 'types/markers';
import { AnimalEditorProps } from './types';
import styles from './AnimalEditor.module.css';

export const AnimalEditor = (props: AnimalEditorProps) => {
  const {
    defaultIconColor = '#ffffff',
    marker,
    onClose,
    onDataClear,
    onDataRead,
    onDataWrite,
  } = props;

  // Internal animal marker data to edit
  const [data, setData] = useState<AnimalMarkerData>({});

  // Retrieve animal name
  const animalName = useMemo(() => getAnimalName(marker?.type), [marker]);

  /**
   * Handle closing the editor
   */
  const handleClose = useCallback(() => {
    setData({});
    onClose();
  }, [onClose]);

  /**
   * Handle changes to the color
   */
  const handleColorChange = useCallback(
    (color: ColorResult) =>
      setData(current => ({
        ...current,
        color: getHexColor(color),
      })),
    [],
  );

  /**
   * Handle changes to the comment text
   */
  const handleCommentChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setData(current => ({
        ...current,
        comment: event.target.value,
      }));
    },
    [],
  );

  /**
   * Handle persisting current marker's data from the storage
   */
  const handleDataClear = useCallback(() => {
    // Ensure a valid marker is present before continuing
    if (!marker) {
      return;
    }

    // Persist changes and close the editor
    onDataClear(marker);
    handleClose();
  }, [handleClose, marker, onDataClear]);

  /**
   * Handle persisting current changes to the storage
   */
  const handleDataWrite = useCallback(() => {
    // Ensure a valid marker is present before continuing
    if (!marker) {
      return;
    }

    // Persist changes and close the editor
    onDataWrite(marker, data);
    handleClose();
  }, [data, handleClose, marker, onDataWrite]);

  // List of sidebar action button properties
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: 'Save',
        className: classnames(styles.AnimalEditorActionSave),
        onClick: handleDataWrite,
      },
      {
        children: 'Delete',
        className: classnames(styles.AnimalEditorActionReset),
        onClick: handleDataClear,
      },
    ],
    [handleDataClear, handleDataWrite],
  );

  // Creation and last updated date of existing data entries
  const renderedDates = useMemo(() => {
    // Ensure both dates are present before continuing
    if (!data.created || !data.updated) {
      return;
    }

    // Format both dates
    const created = formatTimestampDistance(data.created);
    const updated = formatTimestampDistance(data.updated);

    return (
      <div className={styles.AnimalEditorDates}>
        <div>
          <Label>Created</Label>
          <div className={styles.AnimalEditorText}>{created}</div>
        </div>
        <div>
          <Label>Last Updated</Label>
          <div className={styles.AnimalEditorText}>{updated}</div>
        </div>
      </div>
    );
  }, [data.created, data.updated]);

  // Preview icon component
  const IconComponent = useMemo(
    () => getIconComponent(marker?.type),
    [marker?.type],
  );

  // Load animal details on mount
  useEffect(() => {
    // Ensure a valid marker is present before continuing
    if (!marker) {
      return;
    }

    // Read data from the storage and store it locally for editing
    const data = onDataRead(marker);
    setData(data ?? {});
  }, [marker, onDataRead]);

  return (
    <SidePanel
      actions={actions}
      title={animalName}
      visible={!!marker}
      onClose={handleClose}
    >
      <div className={styles.AnimalEditorContent}>
        {renderedDates}

        <Label>Comment</Label>
        <Textarea
          rows={8}
          value={data.comment}
          onChange={handleCommentChange}
        />

        <Label>Icon Color</Label>
        <ChromePicker
          color={data.color ?? defaultIconColor}
          disableAlpha={true}
          styles={{
            default: {
              picker: {
                backgroundColor: '#121212',
                boxShadow: 'unset',
                userSelect: 'none',
                width: 'auto',
              },
              swatch: {
                transform: 'scale(1.5)',
              },
            },
          }}
          onChange={handleColorChange}
        />
        <div className={styles.AnimalEditorIconPreview}>
          <IconComponent
            size={80}
            style={{
              color: data.color ?? defaultIconColor,
            }}
          />
        </div>
      </div>
    </SidePanel>
  );
};
