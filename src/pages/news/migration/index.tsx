import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStorage, useTranslator } from 'hooks';
import { Emphasis } from 'components/Emphasis';
import { Heading } from 'components/Heading';
import { Textarea } from 'components/Textarea';
import { PageContent } from 'components/PageContent';
import { migrateLegacyMarkers } from 'lib/migration';
import { hasLegacyMarkerStorageKeys } from 'lib/storage';
import { MigrationResult } from 'types/migration';
import styles from './page.module.css';

const MigrationsPage = () => {
  const [result, setResult] = useState<MigrationResult>({ code: '', count: 0 });

  // Retrieve application router and storage manager
  const router = useRouter();
  const storage = useStorage();

  // Retrieve application translator
  const translate = useTranslator();

  // Redirect users to the home page if they don't have any legacy markers
  // in their local storage
  useEffect(() => {
    if (!storage) {
      return;
    }

    if (
      router.pathname === '/news/migration' &&
      !hasLegacyMarkerStorageKeys(storage)
    ) {
      // noinspection JSIgnoredPromiseFromCall
      router.replace('/');
    }
  }, [router, storage]);

  useEffect(() => {
    if (!storage) {
      return;
    }

    setResult(migrateLegacyMarkers(storage));
  }, [storage]);

  return (
    <>
      <Head>
        <title>{translate('UI:GAME_TITLE')}</title>
      </Head>
      <PageContent>
        <main className={styles.MigrationsPageContent}>
          <div className={styles.MigrationsPageBanner}>
            Please read information on this page carefully because it will not
            be shown to you again!
          </div>

          <Heading size={1}>Update</Heading>
          <p className={styles.MigrationsPageContentParagraph}>
            We are excited to let you know that we have just completed a major
            update to all our maps, which now feature{' '}
            <Emphasis>
              official marker data supplied by THQ Nordic and Nine Rocks Games
            </Emphasis>
            !
          </p>
          <p className={styles.MigrationsPageContentParagraph}>
            Read on to learn more about it.
          </p>

          <Heading size={3}>Changes</Heading>
          <p className={styles.MigrationsPageContentParagraph}>
            As you may be aware, previously marker placement was done manually,
            which was a time-consuming process that required a great deal of
            manual work from Toolbox developers and resulted in delays in
            delivering updates to our users. This also sometimes lead to slight
            discrepancies between marker locations in-game and on the map.
          </p>
          <p className={styles.MigrationsPageContentParagraph}>
            With the new marker data, we are now using actual in-game
            coordinates to display the markers, allowing us to provide you with
            the most precise maps possible. While you may notice some slight
            changes to the locations of animal and need zone markers, these
            changes should be unnoticeable to most users.
          </p>

          <Heading size={3}>Technical Details</Heading>
          <p className={styles.MigrationsPageContentParagraph}>
            The data supplied by THQ and Nine Rocks Games has resulted in
            changes to the identifiers of all animal and need zone markers. As a
            result, we had to migrate all customizations you had previously made
            to animal markers to a new storage format.
          </p>
          <p className={styles.MigrationsPageContentParagraph}>
            This step was necessary to ensure that all Toolbox markers are
            identified using in-game keys, rather than custom-generated ones.
            This will allow us to update markers much faster in the future when
            animal or need zone locations change in the game, or when new Way Of
            The Hunter maps are released. By updating to this new format, we can
            deliver future updates faster and without requiring any manual
            labor.
          </p>

          <Heading size={3}>Result</Heading>
          <p className={styles.MigrationsPageContentParagraph}>
            We are pleased to inform you that we have successfully migrated{' '}
            <Emphasis>{result.count}</Emphasis> markers that you had previously
            customized across all of the maps to the new format. If you would
            like to create a backup of this migration though, you may copy the
            migration code below to a safe place. This code can be imported to
            trigger the migration process again in the future, should the need
            arise.
          </p>
          <p className={styles.MigrationsPageContentParagraph}>
            Please visit the official Discord server by clicking on the icon
            located in the top right corner of this page if you require any
            help.
          </p>
          {result.count > 0 && (
            <Textarea
              className={styles.MigrationsPageCode}
              readOnly={true}
              rows={10}
              value={result.code}
            ></Textarea>
          )}
        </main>
      </PageContent>
    </>
  );
};

export default MigrationsPage;
