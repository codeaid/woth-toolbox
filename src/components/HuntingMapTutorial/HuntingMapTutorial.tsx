import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonProps } from 'components/Button';
import { Modal } from 'components/Modal';
import { HuntingMapTutorialFilters } from './HuntingMapTutorialFilters';
import { HuntingMapTutorialGeneral } from './HuntingMapTutorialGeneral';
import { HuntingMapTutorialMarkers } from './HuntingMapTutorialMarkers';
import { HuntingMapTutorialWelcome } from './HuntingMapTutorialWelcome';
import styles from './HuntingMapTutorial.module.css';

const pages = [
  <HuntingMapTutorialWelcome key="welcome" />,
  <HuntingMapTutorialGeneral key="general" />,
  <HuntingMapTutorialFilters key="filters" />,
  <HuntingMapTutorialMarkers key="markers" />,
];

export const HuntingMapTutorial = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  /**
   * Handle closing modal
   */
  const handleClose = useCallback(() => setVisible(false), []);

  const handlePageNext = useCallback(
    () => setPageIndex(current => Math.min(pages.length - 1, current + 1)),
    [],
  );

  const handlePagePrev = useCallback(
    () => setPageIndex(current => Math.max(0, current - 1)),
    [],
  );

  // Modal actions
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: 'Previous',
        disabled: pageIndex === 0,
        onClick: handlePagePrev,
      },
      {
        children: pageIndex < pages.length - 1 ? 'Next' : 'Complete',
        className: styles.HuntingMapTutorialNext,
        disabled: pageIndex >= pages.length,
        onClick: handlePageNext,
      },
    ],
    [handlePageNext, handlePagePrev, pageIndex],
  );

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Modal
      actions={actions}
      className={styles.HuntingMapTutorial}
      header="Tutorial"
      key={pageIndex}
      visible={visible}
      onClose={handleClose}
    >
      {pages[pageIndex]}
    </Modal>
  );
};
