const imgurConfig = {
	client_id: null,
	base_url: null,
};

try {
	const localEnv = require('./config.local.js').default;
	Object.assign(imgurConfig, localEnv);
} catch (err) {
	window.console && console.log('WARNING: "config.local.js" not found.'); // eslint-disable-line no-console
	throw err;
}

export default imgurConfig;
