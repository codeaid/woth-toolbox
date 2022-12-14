import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageContent } from 'components/PageContent';
import styles from './styles.module.css';

const NotFoundPage = () => (
  <>
    <PageContent>
      <div className={styles.NotFoundPageContent}>
        <h1 className={styles.NotFoundPageHeading}>404</h1>
      </div>
    </PageContent>
  </>
);

export const getStaticProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});

export default NotFoundPage;
