import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as routes from '../../../app/routes';
import {authSelectors} from '../../../redux/auth';

class AuthRoute extends Component {
	static propTypes = {
		component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		isPrivate: PropTypes.bool,
		isPublic: PropTypes.bool,
	};

	render() {
		const {isPrivate = false, isPublic = false, isLoggedIn, component, ...props} = this.props;

		const redirectHome = <Redirect to={routes.HOME} />;
		const redirectAuth = <Redirect to={routes.AUTH_SIGN_IN} />;
		const renderComponent = <Route {...props} component={component} />;

		if (isPrivate) {
			return isLoggedIn ? renderComponent : redirectAuth;
		} else if (isPublic) {
			return isLoggedIn ? redirectHome : renderComponent;
		} else {
			return renderComponent;
		}
	}
}

const mapStateToProps = state => ({
	isLoggedIn: authSelectors.isAuthenticated(state),
});

export default connect(
	mapStateToProps,
	null
)(AuthRoute);
