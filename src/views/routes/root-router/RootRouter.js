import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {withRouter} from 'react-router';

import Home from '../../pages/home';
import NotFound from '../../pages/not-found';
import SignIn from '../../pages/sing-in';
import About from '../../pages/about';

import AuthRoute from '../../components/auth-route';
import Spinner from '../../components/spinner';
import MainMenu from '../../components/main-menu';
import Toaster from '../../components/toaster';
import ProjectNew from '../../pages/project_new';
import ProjectEdit from '../../pages/project_edit';

import * as routes from '../../../app/routes';
import {authActions, authSelectors} from '../../../redux/auth';

class RootRouter extends Component {
	static propTypes = {
		initApp: PropTypes.func.isRequired,
		isInitialized: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		isLoading: PropTypes.bool,
	};

	// constructor(props) {
	// 	super(props);

	// }

	// componentWillUpdate(nextProps) {
	// 	if (!nextProps.isLoggedIn && !nextProps.redirect) {
	// 		this.props.setAuthRedirect(nextProps.location);
	// 	} else {
	// 		return;
	// 	}
	// }

	componentDidMount() {
		this.initializeApp();
	}

	initializeApp = () => {
		const {isInitialized, initApp} = this.props;

		!isInitialized && initApp();
	};

	renderAppOrSpinner() {
		const {isInitialized, isLoading} = this.props;

		if (!isInitialized || isLoading) {
			return <Spinner />;
		}

		return (
			<Switch>
				<AuthRoute exact name="Home" path={routes.HOME} component={Home} />
				<AuthRoute exact name="About" path={routes.ABOUT} component={About} />
				<AuthRoute
					exact
					name="SignIn"
					isPublic={true}
					path={routes.AUTH_SIGN_IN}
					component={SignIn}
				/>
				<AuthRoute
					exact
					name="My Projects"
					isPrivate={true}
					path={routes.MY_PROJECTS}
					component={SignIn}
				/>
				<AuthRoute
					exact
					name="New Project"
					isPrivate={true}
					path={routes.PROJECT_NEW}
					component={ProjectNew}
				/>
				<AuthRoute
					exact
					name="Edit Project"
					isPrivate={true}
					path={routes.PROJECT_EDIT}
					component={ProjectEdit}
				/>
				{/*

				<AuthRoute
					exact
					name="DashboardHome"
					path={routes.DASHBOARD_HOME}
					component={Dashboard}
					isPrivate={true}
				/>
				<AuthRoute
					exact
					name="DashboardFavourites"
					path={routes.DASHBOARD_FAVOURITES}
					component={Favourites}
					isPrivate={true}
				/>
				<AuthRoute
					exact
					name="DashboardSettings"
					path={routes.DASHBOARD_SETTINGS}
					component={ProfileSettings}
					isPrivate={true}
				/>

		*/}
				<AuthRoute name="Not found" path="*" component={NotFound} />
			</Switch>
		);
	}

	renderMainMenu() {
		return this.props.isInitialized ? <MainMenu /> : null;
	}

	render() {
		const {isInitialized, isLoggedIn} = this.props;
		return (
			<React.Fragment>
				<Toaster />
				{this.renderMainMenu()}
				{this.renderAppOrSpinner()}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	isInitialized: authSelectors.isInitialized(state),
	isLoggedIn: authSelectors.isAuthenticated(state),
	isLoading: authSelectors.isAuthInProgress(state),
});

const mapDispatchToProps = {
	initApp: authActions.initAuth,
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(RootRouter)
);
