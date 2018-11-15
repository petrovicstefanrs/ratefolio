import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import SectionHeader from '../../components/section-header';
import Separator from '../../components/separator';
import TextBlock from '../../components/text-block';
import PageWrapper from '../../components/page-wrapper';
import ProjectForm from '../../components/project-form';

import {projectsActions} from '../../../redux/projects';
import {authSelectors} from '../../../redux/auth';
import * as routes from '../../../app/routes';

import './ProjectNew.css';

const CLASS = 'rf-ProjectNew';

const DEFAULT_PROJECT = {
	uid: null,
	projectDescription: null,
	projectName: null,
	projectUrl: null,
	projectThumbnail: null,
};

class ProjectNew extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		createProject: PropTypes.func.isRequired,
	};

	handleFormSave = payload => {
		const {createProject} = this.props;
		const preparedPayload = this.prepareProjectPayload(payload);

		createProject && createProject(preparedPayload);
	};

	handleFormClose = () => {
		const {history} = this.props;
		history.push(routes.HOME);
	};

	prepareProjectPayload = data => {
		const {user} = this.props;
		const userInfo = authSelectors.getUserInfo(user);
		return {
			uid: userInfo.uid,
			name: data.projectName,
			url: data.projectUrl,
			thumbnail: data.projectThumbnail,
			description: data.projectDescription,
			user_name: userInfo.displayName,
			user_avatar: userInfo.photoURL,
		};
	};

	renderHeader = () => {
		return (
			<React.Fragment>
				<div className={CLASS + '-header ' + CLASS + '-section'}>
					<SectionHeader text={'New Project'} />
					<TextBlock>
						Create a <span>new project</span> and publish it so others can give you{' '}
						<span>ratings and feedback!</span>
					</TextBlock>
				</div>
				<Separator />
			</React.Fragment>
		);
	};

	render() {
		return (
			<PageWrapper className={CLASS}>
				{this.renderHeader()}
				<ProjectForm
					onSave={this.handleFormSave}
					onClose={this.handleFormClose}
					defaultProject={DEFAULT_PROJECT}
					saveLabel="Publish Project"
					closeLabel="Close"
				/>
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	user: authSelectors.getUser(state),
});

const mapDispatchToProps = {
	createProject: projectsActions.createProject,
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectNew));
