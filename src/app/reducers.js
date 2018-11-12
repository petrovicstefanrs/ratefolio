import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import {authReducer} from '../redux/auth';
import {toastReducer} from '../redux/toast';
import {projectsReducer} from '../redux/projects';

const rootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		auth: authReducer,
		toast: toastReducer,
		projects: projectsReducer,
	});

export default rootReducer;
