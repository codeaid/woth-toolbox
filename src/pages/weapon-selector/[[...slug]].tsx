import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
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
  const { slug = [] } = router.query;
  const [animalId] = slug as unknown as Array<string>;

  // Find animal specified in the URL parameter
  const selectedAnimal = animals.find(a => a.id === animalId);

  /**
   * Handle selecting individual animals
   */
  const handleAnimalClick = useCallback(
    (animal: Animal) =>
      router.push(`/weapon-selector/${encodeURIComponent(animal.id)}`),
    [router],
  );

  /**
   * Render details of an animal and weapons
   */
  const renderDetails = () => {
    if (animalId && !selectedAnimal) {
      return <Card>Invalid animal identifier</Card>;
    }

    if (!selectedAnimal) {
      return <Card>Please select an animal to start</Card>;
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
