import Head from 'next/head';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'components/Modal';
import { useHuntingMapType, useTranslator, useTutorial } from 'hooks';
import styles from './styles.module.css';

const AfricaPage = () => {
  // Retrieve map type switcher
  const { onSetMapType } = useHuntingMapType();

  // Render map tutorial dialog
  const { component: tutorial } = useTutorial(true);

  // Retrieve application translator
  const translate = useTranslator();

  // Toggle currently active map type on page load and unload
  useEffect(() => {
    onSetMapType('africa');
    return () => onSetMapType();
  }, [onSetMapType]);

  return (
    <>
      <Head>
        <title>
          {`${translate('POI:MAP_NAME_AFRICA')} - ${translate(
            'UI:GAME_TITLE',
          )}`}
        </title>
      </Head>

      <Modal blur={false} canClose={false} header="Notice">
        <div className={styles.AfricaPageNotice}>
          {translate('POI:MAP_NAME_AFRICA')} will be unlocked on Monday, 21
          August
        </div>
      </Modal>

      {createPortal(tutorial, document.body)}
    </>
  );
};

export default AfricaPage;
