import {Record} from 'immutable';
import * as TYPES from './action-types';

export const ToastState = new Record({
	toast: null,
});

export const toastReducer = (state = new ToastState(), {payload, type}) => {
	switch (type) {
		case TYPES.TOAST_ADD:
			return state.merge({
				toast: payload,
			});

		case TYPES.TOAST_DISMISS:
			return new ToastState();

		default:
			return state;
	}
};
