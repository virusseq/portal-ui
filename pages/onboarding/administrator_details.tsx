/*
 *
 *
 */

import React from 'react';
// import RegisterPage from '@/components/Onboarding/RegisterPage';
import AdministratorDetails from '@/components/pages/Onboarding/AdministratorDetails';
import { createPage } from '../../global/utils/pages';

const AdministratorDetailsPage = createPage({
  getInitialProps: async ({ query, egoJwt }) => {
    return { query, egoJwt };
  },
  isPublic: true,
})(() => {
  return <AdministratorDetails />;
});

export default AdministratorDetailsPage;