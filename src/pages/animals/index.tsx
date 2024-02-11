import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AnimalDetails } from 'components/AnimalDetails';
import { AnimalList } from 'components/AnimalList';
import { Card } from 'components/Card';
import { Error } from 'components/Error';
import { PageContent } from 'components/PageContent';
import { PivotTable } from 'components/PivotTable';
import { Sidebar } from 'components/Sidebar';
import { WeaponName } from 'components/WeaponName';
import { fauna } from 'config/animals';
import { weapons } from 'config/weapons';
import { useTranslator } from 'hooks';
import { getWeaponGroups, isOptimal, isSuboptimal } from 'lib/weapons';
import type { Animal } from 'types/animals';
import type { Weapon, WeaponDistance } from 'types/weapons';
import styles from './styles.module.css';

const AnimalsPage = () => {
  // Extract route parameters
  const router = useRouter();
  const { q: animalId } = router.query;

  // Retrieve application translator
  const translate = useTranslator();

  // Find animal specified in the URL parameter
  const selectedAnimal = useMemo(
    () => fauna.find(a => a.slug === animalId),
    [animalId],
  );

  /**
   * Handle selecting individual animals
   */
  const handleAnimalClick = useCallback(
    (animal: Animal) =>
      router.push(`/animals?q=${encodeURIComponent(animal.slug)}`),
    [router],
  );

  /**
   * Handle building entity groups
   */
  const handleGetEntityGroups = useCallback(
    (entities: Array<Weapon>) => getWeaponGroups(entities, translate),
    [translate],
  );

  /**
   * Extract weapon hit energy
   */
  const handleGetWeaponHitEnergy = useCallback(
    (weapon: Weapon) => weapon.hitEnergy,
    [],
  );

  /**
   * Determine if weapon is optimal at the specified distance
   */
  const handleGetWeaponOptimal = useCallback(
    (weapon: Weapon, animal: Animal, distance: WeaponDistance) =>
      isOptimal(animal, weapon, distance),
    [],
  );

  /**
   * Determine if weapon is suboptimal at the specified distance
   */
  const handleGetWeaponSuboptimal = useCallback(
    (weapon: Weapon, animal: Animal, distance: WeaponDistance) =>
      isSuboptimal(animal, weapon, distance),
    [],
  );

  /**
   * Render name of the specified weapon
   */
  const handleRenderEntityName = useCallback(
    (weapon: Weapon, highlighted: boolean) => (
      <WeaponName
        highlighted={highlighted}
        responsive="mobile"
        weapon={weapon}
      />
    ),
    [],
  );

  /**
   * Pre-render page content
   */
  const pageContent = useMemo(() => {
    // Ensure router fields are updated client-side and ready for use
    if (!router.isReady) {
      return null;
    }

    if (animalId && !selectedAnimal) {
      return <Error status={404} />;
    }

    if (!selectedAnimal) {
      return (
        <div className={styles.WeaponSelectorPageNotification}>
          <Card>{translate('TOOLBOX:SELECT_ANIMAL')}</Card>
        </div>
      );
    }

    return (
      <>
        <AnimalDetails animal={selectedAnimal} />
        <hr className={styles.WeaponSelectorPageSeparator} />
        <PivotTable
          entities={weapons}
          pivot={selectedAnimal}
          onGetEntityGroups={handleGetEntityGroups}
          onGetWeaponHitEnergy={handleGetWeaponHitEnergy}
          onGetWeaponOptimal={handleGetWeaponOptimal}
          onGetWeaponSuboptimal={handleGetWeaponSuboptimal}
          onRenderEntityName={handleRenderEntityName}
        />
      </>
    );
  }, [
    animalId,
    handleGetEntityGroups,
    handleGetWeaponHitEnergy,
    handleGetWeaponOptimal,
    handleGetWeaponSuboptimal,
    handleRenderEntityName,
    router.isReady,
    selectedAnimal,
    translate,
  ]);

  return (
    <>
      <Head>
        <title>
          {`${translate('UI:SECTION_ANIMALS')} - ${translate('UI:GAME_TITLE')}`}
        </title>
      </Head>

      <div className={styles.WeaponSelectorPage}>
        <Sidebar>
          <AnimalList
            animals={fauna}
            selected={selectedAnimal}
            onAnimalClick={handleAnimalClick}
          />
        </Sidebar>
        <PageContent>{pageContent}</PageContent>
      </div>
    </>
  );
};

export default AnimalsPage;
