import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { useLocale, useTranslator } from 'hooks';
import { getAnimalTypeKey } from 'lib/i18n';
import { isEmptyAnimalMarker } from 'lib/markers';
import { sendGoogleEvent } from 'lib/tracking';
import { formatDateTime, showNotification } from 'lib/utils';
import type { AnimalMarkerRecord } from 'types/markers';
import { AnimalEditorColorPicker } from './AnimalEditorColorPicker';
import { AnimalEditorDescription } from './AnimalEditorDescription';
import { AnimalEditorGroupBuilder } from './AnimalEditorGroupBuilder';
import type { AnimalEditorProps } from './types';
import styles from './AnimalEditor.module.css';

export const AnimalEditor = (props: AnimalEditorProps) => {
  const {
    defaultIconColor = '#ffffff',
    marker,
    record,
    onClose,
    onCreateRecordAsync,
    onDeleteRecordAsync,
    onUpdateRecordAsync,
  } = props;

  // Internal animal marker record to edit
  const [pendingRecord, setPendingRecord] = useState<AnimalMarkerRecord>();

  // Formatted created and updated date/times
  const [dateCreated, setDateCreated] = useState<string>();
  const [dateUpdated, setDateUpdated] = useState<string>();

  // Retrieve application locale and translator
  const locale = useLocale();
  const translate = useTranslator();

  // Retrieve animal name
  const animalName = useMemo(
    () => (marker ? translate(getAnimalTypeKey(marker.type)) : ''),
    [marker, translate],
  );

  /**
   * Handle changes to pending record data
   */
  const handleChange = useCallback(
    (patch: Partial<AnimalMarkerRecord>) => {
      if (!marker) {
        return;
      }

      // Trim comments to 10000 characters
      if (patch.comment) {
        patch.comment = patch.comment.substring(0, 10000);
      }

      setPendingRecord(current => ({
        id: marker.id,
        ...record,
        ...current,
        ...patch,
      }));
    },
    [marker, record],
  );

  /**
   * Refresh created and update date strings
   */
  const handleRefreshDates = useCallback(() => {
    // Update formatted creation date
    if (pendingRecord && pendingRecord.createdAt) {
      setDateCreated(formatDateTime(pendingRecord.createdAt, locale));
    }

    // Update formatted update date
    if (pendingRecord && pendingRecord.updatedAt) {
      setDateUpdated(formatDateTime(pendingRecord.updatedAt, locale));
    }
  }, [pendingRecord, locale]);

  // Create marker update mutator
  const { isPending: isPersisting, mutate: handlePersist } = useMutation({
    mutationKey: ['firestore', 'record', 'set', marker?.id],
    mutationFn: async () => {
      // Ensure a valid marker is present before continuing
      if (!marker || !pendingRecord) {
        return;
      }

      // Send custom Google Analytics event
      sendGoogleEvent('marker_save', { id: marker.id });

      // Persist changes and close the editor
      if (record) {
        // Update existing record if it existed
        await onUpdateRecordAsync({ ...record, ...pendingRecord });
      } else {
        // Create a new record if it didn't exist
        await onCreateRecordAsync({ ...pendingRecord, id: marker.id });
      }

      onClose();

      // Show notification about a successful operation
      showNotification(translate('TOOLBOX:DATA_SAVED'), 'info');
    },
  });

  // Create marker delete mutator
  const { isPending: isDeleting, mutate: handleDelete } = useMutation({
    mutationKey: ['firestore', 'record', 'delete', marker?.id],
    mutationFn: async () => {
      // Ensure a valid marker is present before continuing
      if (!marker) {
        return;
      }

      // Send custom Google Analytics event
      sendGoogleEvent('marker_reset', { id: marker.id });

      // Persist changes and close the editor
      await onDeleteRecordAsync(marker);
      onClose();

      // Show notification about a successful operation
      showNotification(translate('TOOLBOX:DATA_CLEARED'), 'info');
    },
  });

  // List of sidebar action button properties
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: translate('UI:OK'),
        className: clsx(styles.AnimalEditorActionSave),
        disabled:
          !marker ||
          !pendingRecord ||
          isEmptyAnimalMarker(pendingRecord) ||
          isPersisting ||
          isDeleting,
        onClick: () => handlePersist(),
      },
      {
        children: translate('UI:CLEAR'),
        className: clsx(styles.AnimalEditorActionReset),
        disabled: !marker || !record || isPersisting || isDeleting,
        onClick: () => handleDelete(),
      },
    ],
    [
      handleDelete,
      handlePersist,
      isDeleting,
      isPersisting,
      marker,
      pendingRecord,
      record,
      translate,
    ],
  );

  // Creation and last updated date of existing data entries
  const renderedDates = useMemo(() => {
    // Ensure both dates are present before continuing
    if (!pendingRecord?.createdAt || !pendingRecord?.updatedAt) {
      return;
    }

    return (
      <div className={styles.AnimalEditorDates}>
        <div>
          <Label>{translate('TOOLBOX:CREATED')}</Label>
          <div className={styles.AnimalEditorText}>{dateCreated}</div>
        </div>
        <div>
          <Label>{translate('TOOLBOX:LAST_MODIFIED')}</Label>
          <div className={styles.AnimalEditorText}>{dateUpdated}</div>
        </div>
      </div>
    );
  }, [
    pendingRecord?.createdAt,
    pendingRecord?.updatedAt,
    dateCreated,
    dateUpdated,
    translate,
  ]);

  // Refresh dates when data changes
  useEffect(() => handleRefreshDates(), [pendingRecord, handleRefreshDates]);

  // Update editor data when marker record is changed externally
  useEffect(() => setPendingRecord(record), [record]);

  return (
    <SidePanel
      actions={actions}
      canClose={!isPersisting && !isDeleting}
      title={animalName}
      visible={!!marker}
      onClose={onClose}
    >
      <div className={styles.AnimalEditorContent}>
        {renderedDates}

        <Label>{translate('UI:DESCRIPTION')}</Label>
        <AnimalEditorDescription data={pendingRecord} onChange={handleChange} />

        <Label>{translate('UI:SECTION_ANIMALS')}</Label>
        <AnimalEditorGroupBuilder
          data={pendingRecord}
          onChange={handleChange}
        />

        <Label>{translate('UI:HL_COLOR')}</Label>
        <AnimalEditorColorPicker
          data={pendingRecord}
          defaultIconColor={defaultIconColor}
          marker={marker}
          onChange={handleChange}
        />
      </div>
    </SidePanel>
  );
};
