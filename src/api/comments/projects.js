import {firebaseDb} from '../../firebase';

export const projectsRef = firebaseDb.collection('projects');

export const getProjects = () => {
	return projectsRef.get();
};

export const getUserProjects = (userId) => {
	return projectsRef.where("uid", "==", userId).get();
};

export const getProjectById = (projectId) => {
	return projectsRef.doc(projectId).get();
};

export const createProject = payload => {
	return projectsRef.add(payload);
};

export const updateProject = (project, payload) => {
	return projectsRef.doc(project).update(payload);
};

export const deleteProject = project => {
	return projectsRef.doc(project).delete();
};
