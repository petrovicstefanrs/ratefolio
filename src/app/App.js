import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import initStore from './store';
import history from './history';
import RootRouter from '../views/routes/root-router';

const store = initStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<RootRouter />
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;
