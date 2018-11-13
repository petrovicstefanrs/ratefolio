const env = {
	baseUrl: 'ratefolio.petrovicstefan.rs',
};

try {
	const localEnv = require('./env.local.js').default;
	Object.assign(env, localEnv);
} catch (err) {
	window.console && console.log('WARNING: "env.local.js" not found.'); // eslint-disable-line no-console
	throw err;
}

export default env;
