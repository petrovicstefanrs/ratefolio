import {Record} from 'immutable';
import * as TYPES from './action-types';

export const AuthState = new Record({
	initialized: false,
	loading: false,
	authenticated: false,
	uid: null,
	user: null,
	error: null,
});

export const authReducer = (state = new AuthState(), {payload, type}) => {
	switch (type) {
		case TYPES.INIT_AUTH_START:
			return state.merge({
				initialized: false,
				loading: true,
			});

		case TYPES.INIT_AUTH_SUCCESS:
		case TYPES.SIGN_IN_SUCCESS:
			return state.merge({
				initialized: true,
				authenticated: !!payload,
				uid: payload ? payload.uid : null,
				user: payload || null,
				loading: false,
			});

		case TYPES.SIGN_OUT_SUCCESS:
			return new AuthState();

		case TYPES.SIGN_IN_ERROR:
		case TYPES.SIGN_OUT_ERROR:
			return state.merge({
				error: payload,
				loading: false,
			});

		case TYPES.SIGN_IN_START:
		case TYPES.SIGN_OUT_START:
			return state.merge({
				loading: true,
			});

		default:
			return state;
	}
};
