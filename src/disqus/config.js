const disqusConfig = {
	shortname: null,
};

try {
	const localEnv = require('./config.local.js').default;
	Object.assign(disqusConfig, localEnv);
} catch (err) {
	window.console && console.log('WARNING: "config.local.js" not found.'); // eslint-disable-line no-console
	throw err;
}

export default disqusConfig;
