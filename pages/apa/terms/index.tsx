import { createPage } from '../../../global/utils/pages';
// import Guidelines from '../../../components/pages/apa/guidelines';
import TermsAndConditions from '@/components/pages/apa/terms';

const TermsAndConditionsPage = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <TermsAndConditions />;
});

export default TermsAndConditionsPage;