import React, {Component} from 'react';
import Disqus, {DiscussionEmbed} from 'disqus-react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import PageWrapper from '../../components/page-wrapper';
import Spinner from '../../components/spinner';
import MarkdownRenderer from '../../components/markdown-renderer';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import MissingProject from '../../components/missing-project/MissingProject';

import {projectsActions, projectsSelectors} from '../../../redux/projects';
import {authSelectors} from '../../../redux/auth';
import {toHumanReadableDate} from '../../../lib/date';
import * as routes from '../../../app/routes';
import FA from '../../../lib/font_awesome';
import env from '../../../env';
import disqusConfig from '../../../disqus/config';

import './ProjectDetails.css';

const CLASS = 'rf-ProjectDetails';

class ProjectDetails extends Component {
	static propTypes = {
		user: PropTypes.object,
		project: PropTypes.object,
		isLoading: PropTypes.bool,
		getProjectById: PropTypes.func.isRequired,
		deleteProject: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const {getProjectById, match} = this.props;
		const {projectId} = match.params;

		getProjectById && projectId && getProjectById(projectId);
	}

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

	handleProjectDelete = () => {
		const {match, deleteProject} = this.props;
		const {projectId} = match.params;

		deleteProject && projectId && deleteProject(projectId);
	};

	renderDetailControls = () => {
		const {project, user} = this.props;
		if (!user) {
			return null;
		}

		const userInfo = authSelectors.getUserInfo(user);

		if (project.uid !== userInfo.uid) {
			return null;
		}

		return (
			<div className={CLASS + '-detailControls'}>
				<Button text="Delete Project" onClick={this.handleProjectDelete} />
				<Button text="Edit Project" href={routes.projectEdit(project.id)} />
			</div>
		);
	};

	renderComments = () => {
		const {project, match} = this.props;
		const {id, name} = project;
		const {url} = match;

		const disqusShortname = disqusConfig.shortname;
		const config = {
			url: env.protocol + env.baseUrl + url,
			identifier: id,
			title: name,
		};

		return <DiscussionEmbed shortname={disqusShortname} config={config} />;
	};

	renderProject = () => {
		const {project, isLoading} = this.props;

		if (!project || isLoading) {
			return null;
		}

		const {description, name, thumbnail, created_at, url, user_avatar, user_name} = project;
		const dateString = created_at ? toHumanReadableDate(created_at.toDate().toString()) : null;
		return (
			<React.Fragment>
				<div className={CLASS + '-header'}>
					<div className={CLASS + '-header-left'}>
						<h1>{name}</h1>
						<a href={url} target="_blank" rel="noopener noreferrer">
							Visit project <FontAwesome name={FA.external_link} />
						</a>
						<span className={CLASS + '-header-left-info'}>
							By: {user_name} <Avatar imgUrl={user_avatar} />
						</span>
						{dateString && (
							<span className={CLASS + '-header-left-date'}>Created: {dateString}</span>
						)}
						{this.renderDetailControls()}
					</div>
					<div className={CLASS + '-header-right'}>
						<img src={thumbnail} alt="Project Thumbnail" />
					</div>
				</div>
				<MarkdownRenderer className={CLASS + '-description'} source={description} />
				<div className={CLASS + '-comments'}>{this.renderComments()}</div>
			</React.Fragment>
		);
	};

	render() {
		return (
			<PageWrapper className={CLASS}>
				{this.renderEmptyPage()}
				{this.renderSpinner()}
				{this.renderProject()}
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
	deleteProject: projectsActions.deleteProject,
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProjectDetails)
);
