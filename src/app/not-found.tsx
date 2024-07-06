import { Error } from 'components/Error';
import { PageContent } from 'components/PageContent';

const NotFoundPage = () => (
  <>
    <PageContent>
      <Error status={404} />
    </PageContent>
  </>
);

export default NotFoundPage;
