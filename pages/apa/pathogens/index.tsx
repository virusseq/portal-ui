import { createPage } from '../../../global/utils/pages';
import Pathogens from '../../../components/pages/apa/pathogens';

const PathogensPage = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <Pathogens />;
});

export default PathogensPage;
