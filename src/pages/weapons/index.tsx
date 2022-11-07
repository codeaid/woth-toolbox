import Head from 'next/head';
import { useState } from 'react';
import { AnimalDetails } from 'components/AnimalDetails';
import { Content } from 'components/Content';
import { Sidebar } from 'components/Sidebar';
import { WeaponGrid } from 'components/WeaponGrid';
import { animals } from 'config/animals';
import { weapons } from 'config/weapons';
import { Animal } from 'types/animals';
import styles from './styles.module.css';

const WeaponsPage = () => {
  // Preselect the very first animal on page load
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | undefined>(
    () => animals[0],
  );

  /**
   * Render details of an animal and weapons
   */
  const renderDetails = () =>
    selectedAnimal ? (
      <>
        <AnimalDetails animal={selectedAnimal} />
        <WeaponGrid animal={selectedAnimal} weapons={weapons} />
      </>
    ) : null;

  return (
    <>
      <Head>
        <title>Weapons - Way Of The Hunter</title>
      </Head>
      <div className={styles.WeaponsPage}>
        <Sidebar
          animals={animals}
          selected={selectedAnimal}
          onAnimalClick={setSelectedAnimal}
        />
        <Content>{renderDetails()}</Content>
      </div>
    </>
  );
};

export default WeaponsPage;
