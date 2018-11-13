import firebase from 'firebase/app';
import 'firebase/firestore';

import {firebaseDb} from '../../firebase';

export const projectsRef = firebaseDb.collection('projects');

export const getProjects = () => {
	return projectsRef.get();
};

export const getUserProjects = userId => {
	return projectsRef.where('uid', '==', userId).get();
};

export const getProjectById = projectId => {
	return projectsRef.doc(projectId).get();
};

export const createProject = payload => {
	const preparedPayload = Object.assign({}, payload, {
		created_at: firebase.firestore.FieldValue.serverTimestamp(),
		updated_at: firebase.firestore.FieldValue.serverTimestamp(),
	});
	return projectsRef.add(preparedPayload);
};

export const updateProject = (project, payload) => {
	const preparedPayload = Object.assign({}, payload, {
		updated_at: firebase.firestore.FieldValue.serverTimestamp(),
	});
	return projectsRef.doc(project).update(preparedPayload);
};

export const deleteProject = project => {
	return projectsRef.doc(project).delete();
};
