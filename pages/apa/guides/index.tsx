import { createPage } from '../../../global/utils/pages';
// import Guidelines from '../../../components/pages/apa/guidelines';
import Guidelines from '@/components/pages/apa/guidelines';

const GuidelinesPage = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <Guidelines />;
});

export default GuidelinesPage;
