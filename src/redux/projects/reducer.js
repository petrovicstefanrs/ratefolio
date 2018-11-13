import {Record} from 'immutable';
import * as TYPES from './action-types';

export const ProjectsState = new Record({
	projects: null,
	user_projects: null,
	opened_project: null,
	error: null,
	loading: false,
	working: false,
});

export function projectsReducer(state = new ProjectsState(), {payload, type}) {
	switch (type) {
		case TYPES.CREATE_PROJECT_START:
		case TYPES.DELETE_PROJECT_START:
		case TYPES.UPDATE_PROJECT_START:
		case TYPES.GET_PROJECT_BY_ID_START:
		case TYPES.GET_USER_PROJECTS_START:
		case TYPES.GET_PROJECTS_START:
			return state.merge({
				error: null,
				loading: true,
				working: true,
			});

		case TYPES.GET_PROJECTS_SUCCESS:
			return state.merge({
				projects: payload,
				error: null,
				loading: false,
				working: false,
			});

		case TYPES.GET_USER_PROJECTS_SUCCESS:
			return state.merge({
				user_projects: payload,
				error: null,
				loading: false,
				working: false,
			});

		case TYPES.GET_PROJECT_BY_ID_SUCCESS:
			return state.merge({
				opened_project: payload,
				error: null,
				loading: false,
				working: false,
			});

		case TYPES.CREATE_PROJECT_ERROR:
		case TYPES.DELETE_PROJECT_ERROR:
		case TYPES.UPDATE_PROJECT_ERROR:
		case TYPES.GET_PROJECT_BY_ID_ERROR:
		case TYPES.GET_USER_PROJECTS_ERROR:
		case TYPES.GET_PROJECTS_ERROR:
			return state.merge({
				error: payload,
				projects: null,
				loading: false,
				working: false,
			});

		case TYPES.CREATE_PROJECT_SUCCESS:
		case TYPES.DELETE_PROJECT_SUCCESS:
		case TYPES.UPDATE_PROJECT_SUCCESS:
			return state.merge({
				working: false
			});

		default:
			return state;
	}
}
