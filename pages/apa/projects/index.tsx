import { createPage } from '../../../global/utils/pages';
import Projects from '../../../components/pages/apa/projects';

const ProjectsPage = createPage({
	getInitialProps: async () => null,
	isPublic: true,
})(() => {
	return <Projects />;
});

export default ProjectsPage;
