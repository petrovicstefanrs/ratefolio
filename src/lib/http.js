import axios from 'axios';

import {imgurConfig} from '../imgur';

export const getHeaders = method => {
	let headers = {
		Authorization: 'Client-ID ' + imgurConfig.client_id || undefined,
	};

	if (method === 'post') {
		headers['Content-Type'] = 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW';
	}

	return headers;
};

export const request = options => {
	if (!options.url) {
		throw new Error('url is required');
	}

	options.baseURL = imgurConfig.base_url;
	options.method = options.method || 'get';
	options.headers = getHeaders(options.method);

	return axios(options)
		.then(res => {
			return res.data;
		})
		.catch(res => {
			let err = null;
			let response = res.response;
			if (response && response.data && response.data.error) {
				err = response.data.error;
			} else if (response) {
				err = new Error(response.statusText);
				err.status = response.status;
			} else {
				err = new Error(res.message || 'HTTP Error');
				err.status = 0;
			}

			throw err;
		});
};

export const get = (url, params) => request({url, params});
export const post = (url, params, data) => request({method: 'post', url, params, data});
