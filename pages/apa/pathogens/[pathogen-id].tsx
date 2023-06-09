/*import App from '../../components/pages/apa';

export default App;*/

import { createPage } from '../../../global/utils/pages';
import Pathogen from '../../../components/pages/apa/pathogen';

const ApaHome = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <Pathogen />;
});

export default ApaHome;
