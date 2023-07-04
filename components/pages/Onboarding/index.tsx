/*
 *
 *
 */

import { ReactElement } from 'react';

import RegisterPage from '@/components/Onboarding/RegisterPage';
import PageLayout from '../../PageLayout';

const OnboardingRegisterPage = (): ReactElement => (
  <PageLayout>
    <RegisterPage />
  </PageLayout>
);

export default OnboardingRegisterPage;