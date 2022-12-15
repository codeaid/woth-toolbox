import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { useLocale, useTranslator } from 'hooks';
import { getAnimalTypeKey } from 'lib/i18n';
import { formatTimestampDistance } from 'lib/utils';
import { MarkerStorageRecordAnimal } from 'types/markers';
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
  const [data, setData] = useState<MarkerStorageRecordAnimal>();

  // Formatted created and updated date/times
  const [dateCreated, setDateCreated] = useState<string>();
  const [dateUpdated, setDateUpdated] = useState<string>();

  // Flag indicating if data existed when the editor was opened
  const [hadData, setHadData] = useState(false);

  // Flag indicating whether side panel's loading overlay should be visible
  const [loading, setLoading] = useState(true);

  // Flag indicating whether side panel is visible or not
  const [visible, setVisible] = useState(false);

  // Retrieve application locale and translator
  const locale = useLocale();
  const translate = useTranslator();

  // Retrieve animal name
  const animalName = useMemo(
    () => (marker ? translate(getAnimalTypeKey(marker.type)) : ''),
    [marker, translate],
  );

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
    if (!marker || !data) {
      return;
    }

    // Persist changes and close the editor
    onDataWrite(marker, data);
    handleClose();
  }, [data, handleClose, marker, onDataWrite]);

  /**
   * Refresh created and update date strings
   */
  const handleRefreshDates = useCallback(() => {
    // Update formatted creation date
    if (data && data.created) {
      setDateCreated(formatTimestampDistance(data.created, locale));
    }

    // Update formatted update date
    if (data && data.updated) {
      setDateUpdated(formatTimestampDistance(data.updated, locale));
    }
  }, [data, locale]);

  // List of sidebar action button properties
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: translate('UI:OK'),
        className: classnames(styles.AnimalEditorActionSave),
        disabled: !data,
        onClick: handleDataWrite,
      },
      {
        children: translate('UI:CLEAR'),
        className: classnames(styles.AnimalEditorActionReset),
        disabled: !hadData,
        onClick: handleDataClear,
      },
    ],
    [data, hadData, handleDataClear, handleDataWrite, translate],
  );

  // Creation and last updated date of existing data entries
  const renderedDates = useMemo(() => {
    // Ensure both dates are present before continuing
    if (!data?.created || !data?.updated) {
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
  }, [data?.created, data?.updated, dateCreated, dateUpdated, translate]);

  // Load animal details on mount
  useEffect(() => {
    // Ensure a valid marker is present before continuing
    if (!marker || !visible) {
      return;
    }

    // Read data from the storage and store it locally for editing
    const data = onDataRead(marker);
    setData(data);
    setHadData(!!data);
  }, [marker, visible, onDataRead]);

  // Hide loading indicator if data gets loaded
  useEffect(() => {
    setLoading(false);
  }, [data]);

  // Refresh dates when data changes
  useEffect(() => {
    handleRefreshDates();
  }, [data, handleRefreshDates]);

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

  // Schedule constantly updating created and updated dates strings
  useEffect(() => {
    const interval = setInterval(handleRefreshDates, 1000);

    return () => clearInterval(interval);
  }, [handleRefreshDates]);

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

        <Label>{translate('UI:DESCRIPTION')}</Label>
        <AnimalEditorDescription data={data} onChange={setData} />

        <Label>{translate('UI:SECTION_ANIMALS')}</Label>
        <AnimalEditorGroupBuilder data={data} onChange={setData} />

        <Label>{translate('UI:HL_COLOR')}</Label>
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
