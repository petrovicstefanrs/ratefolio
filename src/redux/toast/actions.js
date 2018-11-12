import lodashIsString from 'lodash/isString';

import * as TYPES from './action-types';
import {Toast} from './model';

export const dismissToast = () => {
	return {
		type: TYPES.TOAST_DISMISS,
	};
};

export const addToast = newToast => {
	return (dispatch, getState) => {
		dispatch(dismissToast());
		newToast = lodashIsString(newToast) ? new Toast(newToast) : newToast;

		// Dismiss Toast after Duration defined in Toast
		// Check if preset toast is the one that should be dismissed
		setTimeout(() => {
			const oldToast = getState().toast.toJS();
			const toastId = oldToast.toast && oldToast.toast.id;
			if (toastId === newToast.id) {
				dispatch(dismissToast());
			}
		}, newToast.duration);

		dispatch({
			type: TYPES.TOAST_ADD,
			payload: newToast,
		});
	};
};
