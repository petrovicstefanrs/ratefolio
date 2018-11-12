import firebase from 'firebase/app';
import history from '../../app/history';
import * as routes from '../../app/routes';
import {firebaseAuth} from '../../firebase';
import * as TYPES from './action-types';
import {toastActions} from '../toast';

// ********* INIT *********

export const initAuth = () => {
	return dispatch => {
		dispatch(initAuthStart());
		firebaseAuth.onAuthStateChanged(user => dispatch(initAuthSuccess(user)));
	};
};

export const initAuthStart = () => {
	return {
		type: TYPES.INIT_AUTH_START,
	};
};

export const initAuthSuccess = user => {
	return {
		type: TYPES.INIT_AUTH_SUCCESS,
		payload: user,
	};
};

export const initAuthError = error => {
	return {
		type: TYPES.INIT_AUTH_ERROR,
		payload: error,
	};
};

// ********* SIGN IN *********

export const signInWithGithub = () => {
	return authenticate(new firebase.auth.GithubAuthProvider());
};

export const signInWithGoogle = () => {
	return authenticate(new firebase.auth.GoogleAuthProvider());
};

export const signInWithTwitter = () => {
	return authenticate(new firebase.auth.TwitterAuthProvider());
};

export const signInStart = () => {
	return {
		type: TYPES.SIGN_IN_START,
	};
};

export const signInError = error => {
	return dispatch => {
		history.push(routes.HOME);
		const {message = ''} = error;
		dispatch(toastActions.addToast(message));
		dispatch({
			type: TYPES.SIGN_IN_ERROR,
			payload: error,
		});
	};
};

export const signInSuccess = result => {
	return dispatch => {
		history.push(routes.HOME);
		const {user} = result;
		const {displayName} = user;
		displayName && dispatch(toastActions.addToast(`Welcome, ${displayName}!`));
		dispatch({
			type: TYPES.SIGN_IN_SUCCESS,
			payload: user,
		});
	};
};

// ********* SIGN OUT *********

export const signOut = () => {
	return dispatch => {
		dispatch(signOutStart());
		firebaseAuth
			.signOut()
			.then(() => dispatch(signOutSuccess()))
			.catch(error => dispatch(signOutError(error)));
	};
};

export const signOutStart = () => {
	return {
		type: TYPES.SIGN_OUT_START,
	};
};

export const signOutSuccess = () => {
	history.push(routes.HOME);
	return {
		type: TYPES.SIGN_OUT_SUCCESS,
	};
};

export const signOutError = error => {
	return dispatch => {
		history.push(routes.HOME);
		const {message = ''} = error;
		dispatch(toastActions.addToast(message));
		dispatch({
			type: TYPES.SIGN_OUT_SUCCESS,
			payload: error,
		});
	};
};

// ********* Abstractions *********

const authenticate = provider => {
	return dispatch => {
		dispatch(signInStart());
		firebaseAuth
			.signInWithPopup(provider)
			.then(result => dispatch(signInSuccess(result)))
			.catch(error => dispatch(signInError(error)));
	};
};
