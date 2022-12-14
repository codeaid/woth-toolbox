import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Error } from 'components/Error';
import { PageContent } from 'components/PageContent';

const NotFoundPage = () => (
  <>
    <PageContent>
      <Error status={404} />
    </PageContent>
  </>
);

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});

export default NotFoundPage;
