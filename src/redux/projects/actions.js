import * as TYPES from './action-types';
// import {toastActions} from '../toast';
import {apiProjects} from '../../api/projects';

// ********* GET *********

export const getProjects = () => {
	return dispatch => {
		dispatch(getProjectsStart());
		apiProjects
			.getProjects()
			.then(snapshot => {
				dispatch(getProjectsSuccess(snapshot.docs));
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
		payload: {
			projects: data,
			user_projects: null
		},
	};
}

export function getProjectsError(error) {
	return {
		type: TYPES.GET_PROJECTS_ERROR,
		payload: error,
	};
}
