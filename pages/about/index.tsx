import React from 'react';
import About from '../../components/pages/about';
import { createPage } from '../../global/utils/pages';

const AboutPage = createPage({
  getInitialProps: async ({ query, egoJwt }) => {
    return { query, egoJwt };
  },
  isPublic: true,
})(() => {
  return <About />;
});

export default AboutPage;
