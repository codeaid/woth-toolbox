import classnames from 'classnames';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { Textarea } from 'components/Textarea';
import { animalNameMap } from 'config/names';
import {
  clearMarkerData,
  getMarkerData,
  getStorage,
  setMarkerData,
} from 'lib/storage';
import { AnimalMarkerData } from 'types/markers';
import { AnimalEditorProps } from './types';
import styles from './AnimalEditor.module.css';

export const AnimalEditor = (props: AnimalEditorProps) => {
  const { animal, onClose } = props;

  // Animal comment
  const [data, setData] = useState<AnimalMarkerData>({});

  // Storage manager
  const [storage] = useState(getStorage());

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

    clearMarkerData(storage, animal);
    handleClose();
  }, [animal, handleClose, storage]);

  /**
   * Handle persisting animal data to the storage
   */
  const handleDataPersist = useCallback(() => {
    if (!animal) {
      return;
    }

    setMarkerData(storage, animal, data);
    handleClose();
  }, [animal, data, handleClose, storage]);

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

  // Load animal details on mount
  useEffect(() => {
    // Clear existing values
    handleReset();

    if (!animal) {
      return;
    }

    // Read data from local storage
    const data = getMarkerData(storage, animal);
    setData(data ?? {});
  }, [animal, handleReset, storage]);

  return (
    <SidePanel
      actions={actions}
      title={animalName}
      visible={!!animal}
      onClose={handleClose}
    >
      <Label>Comment</Label>
      <Textarea rows={8} value={data.comment} onChange={handleCommentChange} />
    </SidePanel>
  );
};
