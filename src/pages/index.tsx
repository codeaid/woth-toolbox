import { useState } from 'react';
import { AnimalDetails } from 'components/AnimalDetails';
import { Background } from 'components/Background';
import { Content } from 'components/Content';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { Sidebar } from 'components/Sidebar';
import { WeaponGrid } from 'components/WeaponGrid';
import { animals } from 'config/animals';
import { weapons } from 'config/weapons';
import { Animal } from 'types/animals';

const Home = () => {
  // Preselect the very first animal on page load
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | undefined>(
    () => animals[0],
  );

  /**
   * Render details of an animal
   */
  const renderAnimalDetails = () =>
    selectedAnimal ? <AnimalDetails animal={selectedAnimal} /> : null;

  /**
   * Render list of weapons and their matches for the selected animal
   */
  const renderWeaponGrid = () =>
    selectedAnimal ? (
      <WeaponGrid animal={selectedAnimal} weapons={weapons} />
    ) : null;

  return (
    <Layout>
      <Background />
      <Header>Weapon Energy Calculator</Header>
      <Sidebar
        animals={animals}
        selected={selectedAnimal}
        onAnimalClick={setSelectedAnimal}
      />
      <Content>
        {renderAnimalDetails()}
        {renderWeaponGrid()}
      </Content>
    </Layout>
  );
};

export default Home;
