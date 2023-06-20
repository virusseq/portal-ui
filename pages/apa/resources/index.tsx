import { createPage } from '../../../global/utils/pages';
import Resources from '@/components/pages/apa/resources';

const ResourcesPage = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <Resources />;
});

export default ResourcesPage;
