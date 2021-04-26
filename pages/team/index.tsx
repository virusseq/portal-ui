import React from 'react';
import Team from '../../components/pages/team';
import { createPage } from '../../global/utils/pages';

const TeamPage = createPage({
  getInitialProps: async ({ query, egoJwt }) => {
    return { query, egoJwt };
  },
  isPublic: true,
})(() => {
  return <Team />;
});

export default TeamPage;
