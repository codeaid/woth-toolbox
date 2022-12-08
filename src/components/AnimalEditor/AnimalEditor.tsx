import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { getAnimalName } from 'lib/animals';
import { formatTimestampDistance } from 'lib/utils';
import { AnimalMarkerData } from 'types/markers';
import { AnimalEditorColorPicker } from './AnimalEditorColorPicker';
import { AnimalEditorDescription } from './AnimalEditorDescription';
import { AnimalEditorGroupBuilder } from './AnimalEditorGroupBuilder';
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

  // Flag indicating whether side panel's loading overlay should be visible
  const [loading, setLoading] = useState(true);

  // Flag indicating whether side panel is visible or not
  const [visible, setVisible] = useState(false);

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

  // Load animal details on mount
  useEffect(() => {
    // Ensure a valid marker is present before continuing
    if (!marker || !visible) {
      return;
    }

    // Read data from the storage and store it locally for editing
    const data = onDataRead(marker);
    setData(data ?? {});
  }, [marker, visible, onDataRead]);

  // Hide loading indicator if data gets loaded
  useEffect(() => setLoading(false), [data]);

  // Hide loading overlay after a certain amount of time
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (visible) {
      // Hide loading if no data is loaded within half a second
      timeout = setTimeout(() => setLoading(false), 500);
    } else {
      // Show loading as soon as panel disappears
      timeout = setTimeout(() => setLoading(true), 0);
    }

    return () => clearTimeout(timeout);
  }, [visible]);

  return (
    <SidePanel
      actions={actions}
      loading={loading}
      title={animalName}
      visible={!!marker}
      onClose={handleClose}
      onVisible={setVisible}
    >
      <div className={styles.AnimalEditorContent}>
        {renderedDates}

        <Label>Description</Label>
        <AnimalEditorDescription data={data} onChange={setData} />

        <Label>Group Builder</Label>
        <AnimalEditorGroupBuilder data={data} onChange={setData} />

        <Label>Icon Color</Label>
        <AnimalEditorColorPicker
          data={data}
          defaultIconColor={defaultIconColor}
          marker={marker}
          onChange={setData}
        />
      </div>
    </SidePanel>
  );
};
