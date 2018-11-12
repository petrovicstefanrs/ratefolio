import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

import SectionHeader from '../../components/section-header/SectionHeader';
import Separator from '../../components/separator/Separator';
import TextBlock from '../../components/text-block';
import PageWrapper from '../../components/page-wrapper';
import MarkdownEditor from '../../components/markdown-editor';
import WithDropzone from '../../components/with-dropzone/WithDropzone';

import * as routes from '../../../app/routes';
import {projectsActions, projectsSelectors} from '../../../redux/projects';
import FA from '../../../lib/font_awesome';

import './ProjectNew.css';
import InputField from '../../components/input-field';

const CLASS = 'rf-ProjectNew';

export const MAX_IMAGE_SIZE = 10485760;
export const MAX_IMAGE_SIZE_LABEL = '10MB';
export const ACCEPTED_FILE_FORMATS = ['png', 'jpg', 'jpeg'];
export const ACCEPTED_FILE_FORMATS_LABEL = 'png, jpg, jpeg';

class ProjectNew extends Component {
	static propTypes = {
		projects: PropTypes.array,
		getProjects: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			projectDescription: null,
			projectName: null,
			projectUrl: null,
			projectThumbnail: null,
			uploadingThumbnail: false,
		};
	}

	componentDidMount() {}

	handleDescriptionChange = projectDescription => {
		this.setState({
			projectDescription,
		});
	};

	renderHeader = () => {
		return (
			<React.Fragment>
				<div className={CLASS + '-header ' + CLASS + '-section'}>
					<SectionHeader text="New Project" />
					<TextBlock>
						Create a <span>new project</span> and publish it so others can give you{' '}
						<span>ratings and feedback!</span>
					</TextBlock>
				</div>
				<Separator />
			</React.Fragment>
		);
	};

	renderDescriptionEditor = () => {
		return (
			<React.Fragment>
				<h4>Project Description:</h4>
				<i>HINT: You can write description using Markdown</i>
				<MarkdownEditor onChange={this.handleDescriptionChange} />
			</React.Fragment>
		);
	};

	renderDropzoneContent = () => {
		const {uploadingThumbnail, projectThumbnail} = this.state;

		let uploadHint = (
			<React.Fragment>
				<strong>Choose a file</strong> or drag it here!
				<br />
				Accepted Image Formats: <strong>{ACCEPTED_FILE_FORMATS_LABEL}</strong>
				<br />
				Max Image Size: <strong>{MAX_IMAGE_SIZE_LABEL}</strong>
			</React.Fragment>
		);

		const defaultContent = !uploadingThumbnail &&
			!projectThumbnail && (
				<React.Fragment>
					<FontAwesome name={FA.upload} />
					<span>{uploadHint}</span>
				</React.Fragment>
			);

		const uploadingContent = uploadingThumbnail && (
			<React.Fragment>
				<FontAwesome name={FA.cog} spin />
				<span>Uploading...</span>
			</React.Fragment>
		);

		const uploadedContent = projectThumbnail && (
			<React.Fragment>
				<img src={projectThumbnail} />
			</React.Fragment>
		);

		return (
			<div className={CLASS + '-dropzoneContent'}>
				{defaultContent}
				{uploadingContent}
				{uploadedContent}
			</div>
		);
	};

	render() {
		return (
			<PageWrapper className={CLASS}>
				{this.renderHeader()}
				<div className={CLASS + '-editor'}>
					<div className={CLASS + '-editor-top'}>
						<div className={CLASS + '-editor-top-left'}>
							<h4>Project Name:</h4>
							<InputField />
							<h4>Project Url:</h4>
						</div>
						<div className={CLASS + '-editor-top-right'}>
							<h4>Project Thumbnail:</h4>
							<WithDropzone
								maxSize={MAX_IMAGE_SIZE}
								accept={ACCEPTED_FILE_FORMATS}
								onDrop={this.handleFiles}
								onDropRejected={this.handleRejected}
								disabled={false}
							>
								{this.renderDropzoneContent()}
							</WithDropzone>
						</div>
					</div>
					<div className={CLASS + '-editor-bottom'}>{this.renderDescriptionEditor()}</div>
				</div>
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	projects: projectsSelectors.getProjectsList(state),
	isLoading: projectsSelectors.isGettingProjects(state),
});

const mapDispatchToProps = {
	getProjects: projectsActions.getProjects,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectNew);
