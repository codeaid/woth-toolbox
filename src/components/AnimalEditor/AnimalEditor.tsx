import classnames from 'classnames';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ColorResult, SliderPicker } from 'react-color';
import { ButtonProps } from 'components/Button';
import { Icon } from 'components/Icon';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { Textarea } from 'components/Textarea';
import { animalNameMap } from 'config/names';
import {
  clearAnimalMarkerData,
  getAnimalMarkerData,
  getStorage,
  setAnimalMarkerData,
} from 'lib/storage';
import { formatTimestampDistance, getHexColor } from 'lib/utils';
import { AnimalMarkerData } from 'types/markers';
import { AnimalEditorProps } from './types';
import styles from './AnimalEditor.module.css';

export const AnimalEditor = (props: AnimalEditorProps) => {
  const { animal, defaultIconColor = '#ffffff', onChange, onClose } = props;

  // Animal comment
  const [data, setData] = useState<AnimalMarkerData>({});

  // Storage manager
  const [storage] = useState(getStorage);

  // Retrieve animal name
  const animalName = useMemo(
    () => (animal ? animalNameMap.get(animal.type)! : 'Unknown'),
    [animal],
  );

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
   * Handle clearing animal data from the storage
   */
  const handleDataClear = useCallback(() => {
    if (!animal) {
      return;
    }

    clearAnimalMarkerData(storage, animal);
    onChange(animal.id, undefined);
    handleClose();
  }, [animal, handleClose, onChange, storage]);

  /**
   * Handle persisting animal data to the storage
   */
  const handleDataPersist = useCallback(() => {
    if (!animal) {
      return;
    }

    // Notify consumer about data having been changed
    const key = setAnimalMarkerData(storage, animal, {
      ...data,
      created: data.created ?? Date.now(),
      updated: Date.now(),
    });
    if (key && onChange) {
      onChange(key, data);
    }

    handleClose();
  }, [animal, data, handleClose, onChange, storage]);

  /**
   * Clear existing values
   */
  const handleReset = useCallback(() => {
    if (!animal) {
      return;
    }

    setData({});
  }, [animal]);

  // List of sidebar action button properties
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: 'Save details',
        className: classnames(
          styles.AnimalEditorAction,
          styles.AnimalEditorActionSave,
        ),
        disabled: false,
        onClick: handleDataPersist,
      },
      {
        children: 'Clear',
        className: classnames(
          styles.AnimalEditorAction,
          styles.AnimalEditorActionReset,
        ),
        disabled: false,
        onClick: handleDataClear,
      },
    ],
    [handleDataClear, handleDataPersist],
  );

  // Creation and last updated date of existing data entries
  const dates = useMemo(() => {
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

  // Rendered side panel content
  const renderedContent = animal && (
    <>
      {dates}

      <Label>Comment</Label>
      <Textarea rows={8} value={data.comment} onChange={handleCommentChange} />

      <Label>Icon Color</Label>
      <SliderPicker
        color={data.color ?? defaultIconColor}
        onChange={handleColorChange}
      />
      <div className={styles.AnimalEditorIconPreview}>
        <Icon
          size={80}
          style={{
            color: data.color ?? defaultIconColor,
          }}
          type={animal?.type!}
        />
      </div>
    </>
  );

  // Load animal details on mount
  useEffect(() => {
    // Clear existing values
    handleReset();

    if (!animal) {
      return;
    }

    // Read data from local storage
    const data = getAnimalMarkerData(storage, animal);
    setData(data ?? {});
  }, [animal, handleReset, storage]);

  return (
    <SidePanel
      actions={actions}
      title={animalName}
      visible={!!animal}
      onClose={handleClose}
    >
      {renderedContent}
    </SidePanel>
  );
};
