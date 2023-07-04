/*
 *
 *
 */

import { ReactElement } from 'react';

import RequestSubmittedForm from '@/components/Onboarding/RequestSubmittedForm';
import PageLayout from '../../../PageLayout';

const RequestSubmitted = (): ReactElement => (
  <PageLayout>
    <RequestSubmittedForm />
  </PageLayout>
);

export default RequestSubmitted;