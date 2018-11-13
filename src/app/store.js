import {routerMiddleware} from 'connected-react-router';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import history from './history';
import reducers from './reducers';

export default (initialState = {}) => {
	const middlewares = [thunk, routerMiddleware(history)];

	if (process.env.NODE_ENV === 'development') {
		const {logger} = require('redux-logger');

		middlewares.push(logger);
	}

	let middleware = applyMiddleware(...middlewares);
	const store = createStore(reducers(history), initialState, middleware);

	return store;
};
