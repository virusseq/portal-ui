import { createPage } from '../../../global/utils/pages';
// import FAQ from '../../../components/pages/apa/faq';
import FAQ from '@/components/pages/apa/faq';

const FAQPage = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <FAQ />;
});

export default FAQPage;
