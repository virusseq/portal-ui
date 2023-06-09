/*import App from '../../components/pages/apa';

export default App;*/

import { createPage } from '../../global/utils/pages';
import App from '../../components/pages/apa';
import Home from '../../components/pages/apa/home';
import useAuthContext from '../../global/hooks/useAuthContext';

const ApaHome = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	const { token } = useAuthContext();

	if (token === undefined) {
		return <App />;
	} else {
		return <Home />;
	}
});

export default ApaHome;
