import { ReactElement } from 'react';

import PageLayout from '#components/PageLayout';

import PageContent from './PageContent';

const ManageStudies = (): ReactElement => (
	<PageLayout subtitle="Manage Studies">
		<PageContent />
	</PageLayout>
);
export default ManageStudies;
