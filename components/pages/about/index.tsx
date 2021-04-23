import { ReactElement } from 'react';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

const AboutPage = (): ReactElement => (
  <PageLayout subtitle="About">
    <PageContent />
  </PageLayout>
);

export default AboutPage;
