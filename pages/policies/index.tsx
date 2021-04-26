import React from 'react';
import Policies from '../../components/pages/policies';
import { createPage } from '../../global/utils/pages';

const PoliciesPage = createPage({
  getInitialProps: async ({ query, egoJwt }) => {
    return { query, egoJwt };
  },
  isPublic: true,
})(() => {
  return <Policies />;
});

export default PoliciesPage;
