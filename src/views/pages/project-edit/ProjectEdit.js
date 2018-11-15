import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import SectionHeader from '../../components/section-header';
import Separator from '../../components/separator';
import TextBlock from '../../components/text-block';
import PageWrapper from '../../components/page-wrapper';
import ProjectForm from '../../components/project-form';
import Spinner from '../../components/spinner';
import MissingProject from '../../components/missing-project';
import ForbiddenPage from '../../components/forbiden-page';

import {projectsActions, projectsSelectors} from '../../../redux/projects';
import {authSelectors} from '../../../redux/auth';
import * as routes from '../../../app/routes';

import './ProjectEdit.css';

const CLASS = 'rf-ProjectEdit';

class ProjectEdit extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		project: PropTypes.object,
		isLoading: PropTypes.bool,
		getProjectById: PropTypes.func.isRequired,
		updateProject: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const {getProjectById, match} = this.props;
		const {projectId} = match.params;

		getProjectById && projectId && getProjectById(projectId);
	}

	isAllowed = () => {
		const {user, project} = this.props;
		const userInfo = authSelectors.getUserInfo(user);

		if (!project) {
			return true;
		}

		const {uid} = project;

		return uid === userInfo.uid;
	};

	renderSpinner = () => {
		const {isLoading} = this.props;

		return isLoading ? <Spinner /> : null;
	};

	renderEmptyPage = () => {
		const {project, isLoading} = this.props;

		if (project || isLoading) {
			return null;
		}

		return <MissingProject />;
	};

	renderForbidenPage = () => {
		const isAllowed = this.isAllowed();

		return isAllowed ? null : <ForbiddenPage />;
	};

	handleFormSave = payload => {
		const {updateProject, match} = this.props;
		const {projectId} = match.params;
		const preparedPayload = this.prepareProjectPayload(payload);

		updateProject && projectId && updateProject(projectId, preparedPayload);
	};

	handleFormClose = () => {
		const {history} = this.props;
		history.push(routes.HOME);
	};

	prepareProjectPayload = data => {
		const {user} = this.props;
		const userInfo = authSelectors.getUserInfo(user);

		return {
			name: data.projectName,
			url: data.projectUrl,
			thumbnail: data.projectThumbnail,
			description: data.projectDescription,
			user_name: userInfo.displayName,
			user_avatar: userInfo.photoURL,
		};
	};

	renderHeader = () => {
		const {project, isLoading} = this.props;
		const isAllowed = this.isAllowed();

		if (!project || isLoading || !isAllowed) {
			return null;
		}

		return (
			<React.Fragment>
				<div className={CLASS + '-header ' + CLASS + '-section'}>
					<SectionHeader text={'Edit Project'} />
					<TextBlock>
						Edit an <span>existing project</span> and publish <span>new</span> changes!
					</TextBlock>
				</div>
				<Separator />
			</React.Fragment>
		);
	};

	renderEditForm = () => {
		const {project} = this.props;
		const isAllowed = this.isAllowed();

		if (!project || !isAllowed) {
			return null;
		}

		const EDITABLE_PROJECT = {
			projectDescription: project.description,
			projectName: project.name,
			projectUrl: project.url,
			projectThumbnail: project.thumbnail,
		};

		return (
			<ProjectForm
				onSave={this.handleFormSave}
				onClose={this.handleFormClose}
				defaultProject={EDITABLE_PROJECT}
				saveLabel="Save Changes"
				closeLabel="Close"
			/>
		);
	};

	render() {
		return (
			<PageWrapper className={CLASS}>
				{this.renderForbidenPage()}
				{this.renderSpinner()}
				{this.renderEmptyPage()}
				{this.renderHeader()}
				{this.renderEditForm()}
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	user: authSelectors.getUser(state),
	project: projectsSelectors.getOpenedProject(state),
	isLoading: projectsSelectors.isGettingProjects(state),
});

const mapDispatchToProps = {
	getProjectById: projectsActions.getProjectById,
	updateProject: projectsActions.updateProject,
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectEdit));
