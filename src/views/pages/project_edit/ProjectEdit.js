import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import SectionHeader from '../../components/section-header/SectionHeader';
import Separator from '../../components/separator/Separator';
import TextBlock from '../../components/text-block';
import PageWrapper from '../../components/page-wrapper';
import ProjectForm from '../../components/project-form/ProjectForm';

import {projectsActions} from '../../../redux/projects';
import {authSelectors} from '../../../redux/auth';

import './ProjectEdit.css';

const CLASS = 'rf-ProjectEdit';

const DEFAULT_PROJECT = {
	uid: null,
	projectDescription: null,
	projectName: null,
	projectUrl: null,
	projectThumbnail: null,
	uploadingThumbnail: false,
};

class ProjectEdit extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
	};

	handleFormSave = payload => {
		console.log(payload);
	};

	renderHeader = () => {
		return (
			<React.Fragment>
				<div className={CLASS + '-header ' + CLASS + '-section'}>
					<SectionHeader text={'Edit Project'} />
					<TextBlock>
						Edit an <span>existing project</span> and publish{' '}
						<span>new</span> changes!
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
					defaultProject={DEFAULT_PROJECT}
					saveLabel="Save Changes"
				/>
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	user: authSelectors.getUser(state),
});

const mapDispatchToProps = {
	getProjects: projectsActions.getProjects,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectEdit);
