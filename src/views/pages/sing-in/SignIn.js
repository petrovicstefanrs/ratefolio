import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Button from '../../components/button';
import SectionHeader from '../../components/section-header';
import Separator from '../../components/separator';
import PageWrapper from '../../components/page-wrapper';

import FA from '../../../lib/font_awesome';
import image from '../../../images/sign_in.svg';
import {authActions} from '../../../redux/auth';

import './SignIn.css';

const CLASS = 'rf-SignIn';

const SignInPage = ({signInWithGithub, signInWithGoogle}) => {
	return (
		<PageWrapper orientation="horizontal" className={CLASS}>
			<div className={CLASS+'-left'}>
				<img src={image} alt="Sign In Illustration" />
			</div>
			<Separator orientation="vertical"/>
			<div className={CLASS + '-right'}>
				<SectionHeader type="h2" text="Sign In" />
				<Button onClick={signInWithGithub} text="GitHub" icon={FA.github} />
				<Button onClick={signInWithGoogle} text="Google" icon={FA.google} />
			</div>
		</PageWrapper>
	);
};

SignInPage.propTypes = {
	signInWithGithub: PropTypes.func.isRequired,
	signInWithGoogle: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
	signInWithGithub: authActions.signInWithGithub,
	signInWithGoogle: authActions.signInWithGoogle,
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(SignInPage)
);
