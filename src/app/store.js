import {routerMiddleware} from 'connected-react-router';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import history from './history';
import reducers from './reducers';

export default (initialState = {}) => {
	let middleware = applyMiddleware(thunk, logger, routerMiddleware(history));
	const store = createStore(reducers(history), initialState, middleware);

	return store;
};
