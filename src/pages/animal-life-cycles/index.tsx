import Head from 'next/head';
import { AnimalActivityGrid } from 'components/AnimalActivityGrid';
import { PageContent } from 'components/PageContent';
import { animals } from 'config/animals';

const AnimalLifeCyclesPage = () => (
  <>
    <Head>
      <title>Animal Life Cycles - Way Of The Hunter</title>
    </Head>

    <PageContent>
      <AnimalActivityGrid animals={animals} />
    </PageContent>
  </>
);

export default AnimalLifeCyclesPage;
