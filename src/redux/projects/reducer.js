import {Record} from 'immutable';
import * as TYPES from './action-types';

export const ProjectsState = new Record({
	projects: null,
	error: null,
	loading: false,
	working: false,
});

export function projectsReducer(state = new ProjectsState(), {payload, type}) {
	switch (type) {
		case TYPES.CREATE_PROJECT_START:
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

		case TYPES.CREATE_PROJECT_ERROR:
		case TYPES.GET_PROJECTS_ERROR:
			return state.merge({
				error: payload,
				projects: null,
				loading: false,
				working: false,
			});

		case TYPES.CREATE_PROJECT_SUCCESS:
			return state.merge({
				working: false
			});

		default:
			return state;
	}
}
