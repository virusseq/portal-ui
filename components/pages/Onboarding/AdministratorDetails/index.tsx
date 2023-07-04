/*
 *
 *
 */

import { ReactElement } from 'react';

import AdministratorDetailsForm from '@/components/Onboarding/AdministratorDetailsForm';
import PageLayout from '../../../PageLayout';

const AdministratorDetails = (): ReactElement => (
  <PageLayout>
    <AdministratorDetailsForm />
  </PageLayout>
);

export default AdministratorDetails;