import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { AnimalActivityGrid } from 'components/AnimalActivityGrid';
import { PageContent } from 'components/PageContent';
import { animals, birds } from 'config/animals';
import { useTranslator } from 'hooks';

const AnimalLifeCyclesPage = () => {
  // Retrieve application translator
  const translate = useTranslator();

  return (
    <>
      <Head>
        <title>{translate('UI:LIFE_CYCLE')} - Way Of The Hunter</title>
      </Head>

      <PageContent>
        <AnimalActivityGrid animals={[...animals, ...birds]} />
      </PageContent>
    </>
  );
};

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});

export default AnimalLifeCyclesPage;
