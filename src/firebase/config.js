const firebaseConfig = {
	apiKey: null,
	authDomain: null,
	databaseURL: null,
	projectId: null,
	storageBucket: null,
	messagingSenderId: null,
};

try {
	const localEnv = require('./config.local.js').default;
	Object.assign(firebaseConfig, localEnv);
} catch (err) {
	window.console && console.log('WARNING: "env.local.js" not found.'); // eslint-disable-line no-console
	throw err;
}

export default firebaseConfig;
