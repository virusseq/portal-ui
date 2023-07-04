/*
 *
 *
 */

import RequestSubmitted from '@/components/pages/Onboarding/RequestSubmitted';
import { createPage } from '../../global/utils/pages';

const RequestSubmittedPage = createPage({
  getInitialProps: async ({ query, egoJwt }) => {
    return { query, egoJwt };
  },
  isPublic: true,
})(() => {
  return <RequestSubmitted />;
});

export default RequestSubmittedPage;