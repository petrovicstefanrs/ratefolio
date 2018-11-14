import lodashSortBy from 'lodash/sortBy';

export const getProjectsList = state => {
	const data = state.projects.toJS();
	const {projects} = data;
	const sortedProjects = sortProjects(projects);
	return sortedProjects;
};

export const getUserProjectsList = state => {
	const data = state.projects.toJS();
	const {user_projects} = data;
	const sortedProjects = sortProjects(user_projects);
	return sortedProjects;
};

export const getOpenedProject = state => {
	const data = state.projects.toJS();
	const {opened_project} = data;

	return opened_project;
};

export const isGettingProjects = state => {
	const data = state.projects.toJS();
	const {loading} = data;

	return loading;
};

export const isWorkingOnProject = state => {
	const data = state.projects.toJS();
	const {working} = data;

	return working;
};

// ********** HELPERS ************

const sortProjects = productList => {
	const sortedProjects = lodashSortBy(productList, project => {
		const updatedAt = project.updated_at ? project.updated_at.toDate() : null;
		return updatedAt;
	});
	return sortedProjects.reverse();
};
