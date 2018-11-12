export const getProjectsList = state => {
	const data = state.projects.toJS();
	const {projects} = data;

	return projects;
};

export const isGettingProjects = state => {
	const data = state.projects.toJS();
	const {loading} = data;

	return loading;
};
