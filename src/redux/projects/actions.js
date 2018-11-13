import lodashMap from 'lodash/map';

import * as TYPES from './action-types';
import history from '../../app/history';
import {toastActions} from '../toast';
import * as routes from '../../app/routes';
import {apiProjects} from '../../api/projects';

// ********* GET *********

export const getProjects = () => {
	return dispatch => {
		dispatch(getProjectsStart());
		apiProjects
			.getProjects()
			.then(snapshot => {
				const data = extractDataFromSnapshot(snapshot);
				dispatch(getProjectsSuccess(data));
			})
			.catch(err => {
				dispatch(getProjectsError(err));
			});
	};
};

export const getProjectsStart = () => {
	return {
		type: TYPES.GET_PROJECTS_START,
	};
};

export function getProjectsSuccess(data) {
	return {
		type: TYPES.GET_PROJECTS_SUCCESS,
		payload: data,
	};
}

export function getProjectsError(error) {
	return {
		type: TYPES.GET_PROJECTS_ERROR,
		payload: error,
	};
}

// ********* GET USER PROJECTS *********

export const getUserProjects = userId => {
	return dispatch => {
		dispatch(getUserProjectsStart());
		apiProjects
			.getUserProjects(userId)
			.then(snapshot => {
				const data = extractDataFromSnapshot(snapshot);
				dispatch(getUserProjectsSuccess(data));
			})
			.catch(err => {
				dispatch(getUserProjectsError(err));
			});
	};
};

export const getUserProjectsStart = () => {
	return {
		type: TYPES.GET_USER_PROJECTS_START,
	};
};

export function getUserProjectsSuccess(data) {
	return {
		type: TYPES.GET_USER_PROJECTS_SUCCESS,
		payload: data,
	};
}

export function getUserProjectsError(error) {
	return {
		type: TYPES.GET_USER_PROJECTS_ERROR,
		payload: error,
	};
}

// ********* GET PROJECT BY ID *********

export const getProjectById = projectId => {
	return dispatch => {
		dispatch(getProjectByIdStart());
		apiProjects
			.getProjectById(projectId)
			.then(doc => {
				const record = doc.data();
				record.id = doc.id;
				dispatch(getProjectByIdSuccess(record));
			})
			.catch(err => {
				dispatch(getProjectByIdError(err));
			});
	};
};

export const getProjectByIdStart = () => {
	return {
		type: TYPES.GET_PROJECT_BY_ID_START,
	};
};

export function getProjectByIdSuccess(data) {
	return {
		type: TYPES.GET_PROJECT_BY_ID_SUCCESS,
		payload: data,
	};
}

export function getProjectByIdError(error) {
	return {
		type: TYPES.GET_PROJECT_BY_ID_ERROR,
		payload: error,
	};
}

// ********* CREATE *********

export const createProject = payload => {
	return dispatch => {
		dispatch(createProjectStart());
		apiProjects
			.createProject(payload)
			.then(snapshot => {
				dispatch(createProjectSuccess(snapshot));
			})
			.catch(err => {
				dispatch(createProjectError(err));
			});
	};
};

export const createProjectStart = () => {
	return {
		type: TYPES.CREATE_PROJECT_START,
	};
};

export function createProjectSuccess(data) {
	const projectId = data.id;
	history.push(routes.projectDetails(projectId));
	return {
		type: TYPES.CREATE_PROJECT_SUCCESS,
	};
}

export function createProjectError(error) {
	return dispatch => {
		dispatch(toastActions.addToast('Publishing project failed. Please try again!'));
		dispatch({
			type: TYPES.CREATE_PROJECT_ERROR,
			payload: error,
		});
	};
}

// ********* DELETE *********

export const deleteProject = payload => {
	return dispatch => {
		dispatch(deleteProjectStart());
		apiProjects
			.deleteProject(payload)
			.then(() => {
				dispatch(deleteProjectSuccess());
			})
			.catch(err => {
				dispatch(deleteProjectError(err));
			});
	};
};

export const deleteProjectStart = () => {
	return {
		type: TYPES.DELETE_PROJECT_START,
	};
};

export function deleteProjectSuccess() {
	return dispatch => {
		history.push(routes.HOME);
		dispatch(toastActions.addToast('Project Deleted!'));
		dispatch({
			type: TYPES.DELETE_PROJECT_SUCCESS,
		});
	};
}

export function deleteProjectError(error) {
	return dispatch => {
		dispatch(toastActions.addToast('Deleting project failed. Please try again!'));
		dispatch({
			type: TYPES.DELETE_PROJECT_ERROR,
			payload: error,
		});
	};
}

// ********* UPDATE *********

export const updateProject = (projectId, payload) => {
	return dispatch => {
		dispatch(updateProjectStart());
		apiProjects
			.updateProject(projectId, payload)
			.then(() => {
				dispatch(updateProjectSuccess(projectId));
			})
			.catch(err => {
				dispatch(updateProjectError(err));
			});
	};
};

export const updateProjectStart = () => {
	return {
		type: TYPES.UPDATE_PROJECT_START,
	};
};

export function updateProjectSuccess(projectId) {
	return dispatch => {
		history.push(routes.projectDetails(projectId));
		dispatch(toastActions.addToast('Project Updated!'));
		dispatch({
			type: TYPES.UPDATE_PROJECT_SUCCESS,
		});
	};
}

export function updateProjectError(error) {
	return dispatch => {
		dispatch(toastActions.addToast('Updating project failed. Please try again!'));
		dispatch({
			type: TYPES.UPDATE_PROJECT_ERROR,
			payload: error,
		});
	};
}

// ********* HELPERS *********

const extractDataFromSnapshot = snapshot => {
	const data = [];
	snapshot.forEach(function(doc) {
		const record = doc.data();
		record.id = doc.id;
		data.push(record);
	});

	return data;
};
