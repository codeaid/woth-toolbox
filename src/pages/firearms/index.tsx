import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AnimalName } from 'components/AnimalName';
import { Card } from 'components/Card';
import { PageContent } from 'components/PageContent';
import { PivotTable } from 'components/PivotTable';
import { Sidebar } from 'components/Sidebar';
import { WeaponDetails } from 'components/WeaponDetails';
import { WeaponList } from 'components/WeaponList';
import { animals } from 'config/animals';
import { weapons } from 'config/weapons';
import { useTranslator } from 'hooks';
import { getAnimalGroups } from 'lib/animals';
import { isOptimal, isSuboptimal } from 'lib/weapons';
import { Animal } from 'types/animals';
import { Weapon } from 'types/weapons';
import styles from './styles.module.css';

const AnimalSelectorPage = () => {
  // Extract route parameters
  const router = useRouter();
  const { weapon: weaponId } = router.query;

  // Retrieve application translator
  const translate = useTranslator();

  // Find weapon specified in the URL parameter
  const selectedWeapon = useMemo(
    () => weapons.find(w => w.slug === weaponId),
    [weaponId],
  );

  /**
   * Handle building entity groups
   */
  const handleGetEntityGroups = useCallback(
    (entities: Array<Animal>) => getAnimalGroups(entities, translate),
    [translate],
  );

  /**
   * Extract weapon hit energy
   */
  const handleGetWeaponHitEnergy = useCallback(
    (animal: Animal, weapon: Weapon) => weapon.hitEnergy,
    [],
  );

  /**
   * Render name of the specified animal
   */
  const handleRenderEntityName = useCallback(
    (animal: Animal, highlighted: boolean) => (
      <AnimalName
        animal={animal}
        highlighted={highlighted}
        responsive="mobile"
      />
    ),
    [],
  );

  /**
   * Handle selecting individual weapons
   */
  const handleWeaponClick = useCallback(
    (weapon: Weapon) =>
      router.push(`/firearms?weapon=${encodeURIComponent(weapon.slug)}`),
    [router],
  );

  /**
   * Render details of a weapon and animals
   */
  const renderDetails = () => {
    if (weaponId && !selectedWeapon) {
      return (
        <div className={styles.AnimalSelectorPageNotification}>
          <Card>Invalid weapon identifier</Card>
        </div>
      );
    }

    if (!selectedWeapon) {
      return (
        <div className={styles.AnimalSelectorPageNotification}>
          <Card>{translate('TOOLBOX:SELECT_WEAPON')}</Card>
        </div>
      );
    }

    return (
      <>
        <WeaponDetails weapon={selectedWeapon} />
        <hr className={styles.AnimalSelectorPageSeparator} />
        <PivotTable
          entities={animals}
          pivot={selectedWeapon}
          onGetEntityGroups={handleGetEntityGroups}
          onGetWeaponHitEnergy={handleGetWeaponHitEnergy}
          onGetWeaponOptimal={isOptimal}
          onGetWeaponSuboptimal={isSuboptimal}
          onRenderEntityName={handleRenderEntityName}
        />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>
          {`${translate('UI:SECTION_FIREARMS')} - ${translate(
            'UI:GAME_TITLE',
          )}`}
        </title>
      </Head>

      <div className={styles.AnimalSelectorPage}>
        <Sidebar>
          <WeaponList
            selected={selectedWeapon}
            weapons={weapons}
            onWeaponClick={handleWeaponClick}
          />
        </Sidebar>

        <PageContent>{renderDetails()}</PageContent>
      </div>
    </>
  );
};

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});

export default AnimalSelectorPage;
