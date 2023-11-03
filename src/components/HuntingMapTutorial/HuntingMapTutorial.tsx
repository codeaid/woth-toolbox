import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ButtonProps } from 'components/Button';
import { Modal } from 'components/Modal';
import { HuntingMapTutorialEditor } from './HuntingMapTutorialEditor';
import { HuntingMapTutorialFilters } from './HuntingMapTutorialFilters';
import { HuntingMapTutorialGeneral } from './HuntingMapTutorialGeneral';
import { HuntingMapTutorialMarkers } from './HuntingMapTutorialMarkers';
import { HuntingMapTutorialOther } from './HuntingMapTutorialOther';
import { HuntingMapTutorialSettings } from './HuntingMapTutorialSettings';
import { HuntingMapTutorialWelcome } from './HuntingMapTutorialWelcome';
import type { HuntingMapTutorialProps } from './types';
import styles from './HuntingMapTutorial.module.css';

// List of pages shown in the tutorial
const pages = [
  <HuntingMapTutorialWelcome key="welcome" />,
  <HuntingMapTutorialGeneral key="general" />,
  <HuntingMapTutorialMarkers key="markers" />,
  <HuntingMapTutorialFilters key="filters" />,
  <HuntingMapTutorialEditor key="editor" />,
  <HuntingMapTutorialSettings key="settings" />,
  <HuntingMapTutorialOther key="other" />,
];

export const HuntingMapTutorial = (props: HuntingMapTutorialProps) => {
  const { defaultPageIndex = 0, visible = false, onClose, onComplete } = props;

  // Index of the currently active page
  const [pageIndex, setPageIndex] = useState(defaultPageIndex);

  /**
   * Handle displaying the next page
   */
  const handlePageNext = useCallback(
    () => setPageIndex(current => Math.min(pages.length - 1, current + 1)),
    [],
  );

  /**
   * Handle displaying the previous page
   */
  const handlePagePrev = useCallback(
    () => setPageIndex(current => Math.max(0, current - 1)),
    [],
  );

  // Modal actions
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: 'Previous',
        disabled: pageIndex === defaultPageIndex,
        onClick: handlePagePrev,
      },
      pageIndex < pages.length - 1
        ? {
            children: 'Next',
            className: styles.HuntingMapTutorialNext,
            onClick: handlePageNext,
          }
        : {
            children: 'Complete',
            className: styles.HuntingMapTutorialNext,
            onClick: onComplete,
          },
    ],
    [defaultPageIndex, handlePageNext, handlePagePrev, onComplete, pageIndex],
  );

  // Reset tutorial when opening it
  useEffect(() => {
    if (visible) {
      setPageIndex(0);
    }
  }, [visible]);

  // Change current page index if required
  useEffect(() => setPageIndex(defaultPageIndex), [defaultPageIndex]);

  return (
    <Modal
      actions={actions}
      className={styles.HuntingMapTutorial}
      header="Tutorial"
      visible={visible}
      onClose={onClose}
    >
      {pages[pageIndex]}
    </Modal>
  );
};
