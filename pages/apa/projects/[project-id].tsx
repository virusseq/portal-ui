/*import App from '../../components/pages/apa';

export default App;*/

import { createPage } from '../../../global/utils/pages';
import Project from '../../../components/pages/apa/project';

const ApaHome = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <Project />;
});

export default ApaHome;
