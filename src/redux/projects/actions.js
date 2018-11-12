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
				const data = [];
				snapshot.forEach(function(doc) {
					const record = doc.data();
					record.id = doc.id;
					data.push(record);
				});
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
