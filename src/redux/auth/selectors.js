export const isAuthenticated = state => {
	const auth = state.auth.toJS();
	const {user, uid, error, loading} = auth;

	return !!user && !!uid && !error && !loading;
};

export const isInitialized = state => {
	const auth = state.auth.toJS();
	const {initialized} = auth;

	return initialized;
};

export const isAuthInProgress = state => {
	const auth = state.auth.toJS();
	const {loading} = auth;

	return loading;
};

export const getUser = state => {
	const auth = state.auth.toJS();
	const {user} = auth;

	return user;
};

export const getUserInfo = user => {
	const {displayName, email, photoURL, uid} = user;

	return {
		displayName,
		email,
		photoURL,
		uid,
	};
};
