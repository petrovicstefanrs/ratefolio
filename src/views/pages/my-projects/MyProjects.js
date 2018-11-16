import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import SectionHeader from '../../components/section-header';
import Separator from '../../components/separator';
import TextBlock from '../../components/text-block';
import Spinner from '../../components/spinner';
import PageWrapper from '../../components/page-wrapper';
import DataGrid from '../../components/data-grid';

import * as routes from '../../../app/routes';
import image from '../../../images/no_projects.svg';
import {projectsActions, projectsSelectors} from '../../../redux/projects';
import {authSelectors} from '../../../redux/auth';
import FA from '../../../lib/font_awesome';

import './MyProjects.css';

const CLASS = 'rf-MyProjects';

class MyProjects extends Component {
	static propTypes = {
		projects: PropTypes.array,
		getUserProjects: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const {getUserProjects, user} = this.props;
		const userInfo = authSelectors.getUserInfo(user);
		const {uid} = userInfo;

		getUserProjects && uid && getUserProjects(uid);
	}

	renderSpinner = () => {
		const {projects, isLoading} = this.props;

		return isLoading || !projects ? <Spinner /> : null;
	};

	renderEmptyPage = () => {
		const {projects, isLoading} = this.props;

		if ((projects && projects.length) || isLoading) {
			return null;
		}

		return (
			<React.Fragment>
				<div className={CLASS + '-top ' + CLASS + '-section'}>
					<img src={image} alt="No Projects Illustration" />
				</div>
				<Separator />
				<div className={CLASS + '-bottom ' + CLASS + '-section'}>
					<SectionHeader text="Welp..." />
					<TextBlock>
						It seems that you don't have any projects yet.
						<br />
						Click <Link to={routes.PROJECT_NEW}>here</Link> to post your <span>first</span> project!
					</TextBlock>
				</div>
			</React.Fragment>
		);
	};

	renderProjects = () => {
		const {projects, isLoading} = this.props;

		if (!projects || !projects.length || isLoading) {
			return null;
		}

		return <DataGrid data={projects} />;
	};

	render() {
		return (
			<PageWrapper className={CLASS}>
				{this.renderSpinner()}
				{this.renderEmptyPage()}
				{this.renderProjects()}
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	user: authSelectors.getUser(state),
	projects: projectsSelectors.getUserProjectsList(state),
	isLoading: projectsSelectors.isGettingProjects(state),
});

const mapDispatchToProps = {
	getUserProjects: projectsActions.getUserProjects,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyProjects);
