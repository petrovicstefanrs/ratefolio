import * as http from '../../lib/http';

export const uploadImage = (file) => {
	const data = new FormData();
	data.append('image', file);
	return http.post('/image', null, data);
};
