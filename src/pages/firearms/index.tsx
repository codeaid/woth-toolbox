import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AnimalName } from 'components/AnimalName';
import { Card } from 'components/Card';
import { Error } from 'components/Error';
import { PageContent } from 'components/PageContent';
import { PivotTable } from 'components/PivotTable';
import { Sidebar } from 'components/Sidebar';
import { WeaponDetails } from 'components/WeaponDetails';
import { WeaponList } from 'components/WeaponList';
import { fauna } from 'config/animals';
import { weapons } from 'config/weapons';
import { useTranslator } from 'hooks';
import { getAnimalGroups } from 'lib/animals';
import { isOptimal, isSuboptimal } from 'lib/weapons';
import type { Animal } from 'types/animals';
import type { Weapon } from 'types/weapons';
import styles from './styles.module.css';

const FirearmsPage = () => {
  // Extract route parameters
  const router = useRouter();
  const { q: weaponId } = router.query;

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
      router.push(`/firearms?q=${encodeURIComponent(weapon.slug)}`),
    [router],
  );

  /**
   * Render details of a weapon and animals
   */
  const renderDetails = () => {
    if (weaponId && !selectedWeapon) {
      return <Error status={404} />;
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
          entities={fauna}
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

export default FirearmsPage;
