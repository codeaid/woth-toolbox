import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AnimalDetails } from 'components/AnimalDetails';
import { AnimalList } from 'components/AnimalList';
import { Card } from 'components/Card';
import { PageContent } from 'components/PageContent';
import { Sidebar } from 'components/Sidebar';
import { WeaponGrid } from 'components/WeaponGrid';
import { animals } from 'config/animals';
import { weapons } from 'config/weapons';
import { Animal } from 'types/animals';
import styles from './styles.module.css';

const WeaponSelectorPage = () => {
  // Extract route parameters
  const router = useRouter();
  const { animal: animalId } = router.query;

  // Find animal specified in the URL parameter
  const selectedAnimal = useMemo(
    () => animals.find(a => a.id === animalId),
    [animalId],
  );

  /**
   * Handle selecting individual animals
   */
  const handleAnimalClick = useCallback(
    (animal: Animal) =>
      router.push(`/weapon-selector?animal=${encodeURIComponent(animal.id)}`),
    [router],
  );

  /**
   * Render details of an animal and weapons
   */
  const renderDetails = () => {
    if (animalId && !selectedAnimal) {
      return (
        <div className={styles.WeaponSelectorPageNotification}>
          <Card>Invalid animal identifier</Card>
        </div>
      );
    }

    if (!selectedAnimal) {
      return (
        <div className={styles.WeaponSelectorPageNotification}>
          <Card>Please select an animal to start</Card>
        </div>
      );
    }

    return (
      <>
        <AnimalDetails animal={selectedAnimal} />
        <hr className={styles.WeaponSelectorPageSeparator} />
        <WeaponGrid animal={selectedAnimal} weapons={weapons} />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Weapon Selector - Way Of The Hunter</title>
      </Head>

      <div className={styles.WeaponSelectorPage}>
        <Sidebar>
          <AnimalList
            animals={animals}
            selected={selectedAnimal}
            onAnimalClick={handleAnimalClick}
          />
        </Sidebar>
        <PageContent>{renderDetails()}</PageContent>
      </div>
    </>
  );
};

export default WeaponSelectorPage;
