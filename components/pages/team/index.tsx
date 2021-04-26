import { ReactElement } from 'react';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

const TeamPage = (): ReactElement => (
  <PageLayout subtitle="About the Team">
    <PageContent />
  </PageLayout>
);

export default TeamPage;
