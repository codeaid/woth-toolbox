import Head from 'next/head';
import { AnimalActivityGrid } from 'components/AnimalActivityGrid';
import { PageContent } from 'components/PageContent';
import { fauna } from 'config/animals';
import { useTranslator } from 'hooks';

const LifeCyclePage = () => {
  // Retrieve application translator
  const translate = useTranslator();

  return (
    <>
      <Head>
        <title>
          {`${translate('UI:LIFE_CYCLE')} - ${translate('UI:GAME_TITLE')}`}
        </title>
      </Head>

      <PageContent>
        <AnimalActivityGrid animals={fauna} />
      </PageContent>
    </>
  );
};

export default LifeCyclePage;
