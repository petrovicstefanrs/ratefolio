import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import lodashMap from 'lodash/map';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

import * as routes from '../../../app/routes';
import {authActions, authSelectors} from '../../../redux/auth';
import FA from '../../../lib/font_awesome';
import Avatar from '../avatar';

import './MainMenu.css';

const CLASS = 'rf-MainMenu';

const SIGNED_OUT_MENU_ITEMS = {
	home: {
		name: 'Home',
		icon: FA.home,
		href: routes.HOME,
	},
	about: {
		name: 'About',
		icon: FA.hashtag,
		href: routes.ABOUT,
	},
	signIn: {
		name: 'Sign In',
		icon: FA.sign_in,
		href: routes.AUTH_SIGN_IN,
	},
};

const SIGNED_IN_MENU_ITEMS = {
	home: {
		name: 'Home',
		icon: FA.home,
		href: routes.HOME,
	},
	about: {
		name: 'About',
		icon: FA.hashtag,
		href: routes.ABOUT,
	},
};

const USER_DROPDOWN_ITEMS = {
	PROJECT_NEW: {
		name: 'New Project',
		icon: FA.plus,
		href: routes.PROJECT_NEW,
	},
	my_projects: {
		name: 'My Projects',
		icon: FA.cubes,
		href: routes.MY_PROJECTS,
	},
};

class MainMenu extends Component {
	static propTypes = {
		user: PropTypes.object,
		signOut: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
	};

	renderMenuItems = () => {
		const {location, user} = this.props;
		const items = user ? SIGNED_IN_MENU_ITEMS : SIGNED_OUT_MENU_ITEMS;

		return lodashMap(items, (value, key) => {
			const activeClass = location.pathname === value.href ? CLASS + '-link-active' : '';

			return (
				<Link to={value.href} key={key} className={CLASS + '-link ' + activeClass}>
					<FontAwesome name={value.icon} />
					{value.name}
				</Link>
			);
		});
	};

	renderUserDropdown = () => {
		const {user, signOut} = this.props;

		if (!user) {
			return null;
		}

		const userInfo = authSelectors.getUserInfo(user);

		const dropdownItems = lodashMap(USER_DROPDOWN_ITEMS, (value, key) => {
			return (
				<Link to={value.href} key={key} className={CLASS + '-dropdownItem'}>
					<FontAwesome name={value.icon} />
					{value.name}
				</Link>
			);
		});

		const signOutButton = (
			<div className={CLASS + '-dropdownItem'} onClick={signOut}>
				<FontAwesome name={FA.power_off} />
				Sign Out
			</div>
		);

		return (
			<div className={CLASS + '-dropdown'}>
				<div className={CLASS + '-dropdownTrigger'}>
					<span className={CLASS + '-dropdownTriggerName'}>{userInfo.displayName}</span>
					<Avatar imgUrl={userInfo.photoURL} />
				</div>
				<div className={CLASS + '-dropdownMenu'}>
					{dropdownItems}
					{signOutButton}
				</div>
			</div>
		);
	};

	render() {
		return (
			<div className={CLASS}>
				<div className={CLASS + '-wrapper'}>
					<div className={CLASS + '-logo'}>
						<Link to={routes.HOME}>
							<FontAwesome name={FA.star_half} />
							<span>RateFolio</span>
							<FontAwesome name={FA.star_half} />
						</Link>
					</div>
					<div className={CLASS + '-content'}>
						{this.renderMenuItems()}
						{this.renderUserDropdown()}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: authSelectors.getUser(state),
});

const mapDispatchToProps = {
	signOut: authActions.signOut,
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MainMenu)
);
