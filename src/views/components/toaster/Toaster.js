import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import FA from '../../../lib/font_awesome';
import {toastSelectors, toastActions} from '../../../redux/toast';

import './Toaster.css';

const CLASS = 'rf-Toaster';

class Toaster extends Component {
	static propTypes = {
		toast: PropTypes.string,
		dismissToast: PropTypes.func.isRequired,
	};

	renderToast = () => {
		const {toast, dismissToast} = this.props;
		if (!toast) {
			return null;
		}

		const toastActionButton = (
			<FontAwesome className={CLASS + '-actionButton'} name={FA.times} onClick={dismissToast} />
		);

		return (
			<div className={CLASS}>
				<span className={CLASS + '-toastText'}>{toast}</span>
				{toastActionButton}
			</div>
		);
	};

	render() {
		return this.renderToast();
	}
}

const mapStateToProps = state => ({
	toast: toastSelectors.getToast(state),
});

const mapDispatchToProps = {
	dismissToast: toastActions.dismissToast,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Toaster);
