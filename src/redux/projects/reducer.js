import {Record} from 'immutable';
import * as TYPES from './action-types';

export const ProjectsState = new Record({
	projects: null,
	error: null,
	loading: false,
});

export function projectsReducer(state = new ProjectsState(), {payload, type}) {
	switch (type) {
		case TYPES.GET_PROJECTS_START:
			return state.merge({
				error: null,
				loading: true,
			});

		case TYPES.GET_PROJECTS_SUCCESS:
			return state.merge({
				projects: payload.projects,
				error: null,
				loading: false,
			});

		case TYPES.GET_PROJECTS_ERROR:
			return state.merge({
				error: payload,
				projects: null,
				loading: false,
			});

		default:
			return state;
	}
}
