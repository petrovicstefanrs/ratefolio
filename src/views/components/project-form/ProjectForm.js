import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';

import MarkdownEditor from '../../components/markdown-editor';
import WithDropzone from '../../components/with-dropzone';
import InputField from '../../components/input-field';
import Button from '../../components/button';

import FA from '../../../lib/font_awesome';
import {toastActions} from '../../../redux/toast';
import {apiImgur} from '../../../api/imgur';

import './ProjectForm.css';
import {projectsSelectors} from '../../../redux/projects';

const CLASS = 'rf-ProjectForm';

const MAX_IMAGE_SIZE = 10485760;
const MAX_IMAGE_SIZE_LABEL = '10MB';
const ACCEPTED_FILE_FORMATS = ['.png', '.jpg', '.jpeg'];
const ACCEPTED_FILE_FORMATS_LABEL = 'png, jpg, jpeg';

class ProjectForm extends Component {
	static propTypes = {
		defaultProject: PropTypes.object.isRequired,
		onSave: PropTypes.func,
		onClose: PropTypes.func,
		saveLabel: PropTypes.string,
		closeLabel: PropTypes.string,
		isWorkingOnProject: PropTypes.bool,
	};

	static defaultProps = {
		saveLabel: 'Save',
		closeLabel: 'Close',
	};

	constructor(props) {
		super(props);

		const {defaultProject} = props;

		this.state = {
			uploading: false,
			project: {
				projectDescription: defaultProject.projectDescription,
				projectName: defaultProject.projectName,
				projectUrl: defaultProject.projectUrl,
				projectThumbnail: defaultProject.projectThumbnail,
			},
		};
	}

	handleSave = () => {
		const {onSave} = this.props;
		const payload = this.state.project;

		onSave && onSave(payload);
	};

	handleClose = () => {
		const {onClose} = this.props;

		onClose && onClose();
	};

	handleThumbUpload = files => {
		if (!files || !files.length) {
			return;
		}
		const file = files[0];

		apiImgur
			.uploadImage(file)
			.then(this.handleImageUploaded)
			.catch(this.handleImageUploadError);

		this.setState({
			uploading: true,
		});
	};

	handleImageUploaded = data => {
		const {link} = data.data;
		const {project} = this.state;
		const newProject = Object.assign({}, project, {projectThumbnail: link});

		this.setState({
			uploading: false,
			project: newProject,
		});
	};

	handleImageUploadError = err => {
		const {addToast} = this.props;
		addToast && addToast(err);

		this.setState({
			uploading: false,
		});
	};

	handleThumbRejected = rejected => {
		if (rejected && rejected.length) {
			const {addToast} = this.props;
			let error = `Upload failed! Make sure the image is a ${ACCEPTED_FILE_FORMATS_LABEL} up to ${MAX_IMAGE_SIZE_LABEL}`;

			addToast && addToast(error);

			this.setState({
				uploading: false,
			});
		}
		return;
	};

	handleProjectChange = (key, data) => {
		const {project} = this.state;
		const newProject = Object.assign({}, project, {[key]: data});

		this.setState({
			project: newProject,
		});
	};

	renderFooter = () => {
		const {saveLabel, closeLabel, isWorkingOnProject} = this.props;
		const {project} = this.state;

		const buttonSaveLabel = isWorkingOnProject ? <FontAwesome name={FA.cog} spin /> : saveLabel;
		const buttonCloseLabel = isWorkingOnProject ? <FontAwesome name={FA.cog} spin /> : closeLabel;
		const {projectDescription, projectName, projectUrl, projectThumbnail} = project;

		const isSaveDisabled =
			!projectDescription || !projectName || !projectUrl || !projectThumbnail || isWorkingOnProject;

		const isCloseDisabled = isWorkingOnProject;

		return (
			<React.Fragment>
				<div className={CLASS + '-footer'}>
					<Button disabled={isCloseDisabled} onClick={this.handleClose} text={buttonCloseLabel} />
					<Button disabled={isSaveDisabled} onClick={this.handleSave} text={buttonSaveLabel} />
				</div>
			</React.Fragment>
		);
	};

	renderDetailsEditor = () => {
		const {project} = this.state;
		const {projectUrl, projectName} = project;

		return (
			<React.Fragment>
				<h4>Project Name:</h4>
				<span className={CLASS + '-required'}>REQUIRED</span>
				<InputField
					autoFocus={true}
					onChange={data => this.handleProjectChange('projectName', data)}
					placeholder="A very cool project..."
					defaultValue={projectName}
				/>
				<h4>Project Url:</h4>
				<span className={CLASS + '-required'}>REQUIRED</span>
				<InputField
					onChange={data => this.handleProjectChange('projectUrl', data)}
					placeholder="https://www.verycoolproject.com"
					defaultValue={projectUrl}
				/>
			</React.Fragment>
		);
	};

	renderThumbnailEditor = () => {
		const {uploading} = this.state;
		return (
			<React.Fragment>
				<h4>Project Thumbnail:</h4>
				<span className={CLASS + '-required'}>REQUIRED</span>
				<WithDropzone
					maxSize={MAX_IMAGE_SIZE}
					accept={ACCEPTED_FILE_FORMATS}
					onDrop={this.handleThumbUpload}
					onDropRejected={this.handleThumbRejected}
					disabled={uploading}
				>
					{this.renderDropzoneContent()}
				</WithDropzone>
			</React.Fragment>
		);
	};

	renderDescriptionEditor = () => {
		const {project} = this.state;
		const {projectDescription} = project;

		return (
			<React.Fragment>
				<h4>Project Description:</h4>
				<span className={CLASS + '-required'}>REQUIRED</span>
				<i>HINT: You can write description using Markdown</i>
				<MarkdownEditor
					defaultDescription={projectDescription}
					onChange={data => this.handleProjectChange('projectDescription', data)}
				/>
			</React.Fragment>
		);
	};

	renderDropzoneContent = () => {
		const {uploading, project} = this.state;
		const {projectThumbnail} = project;

		let uploadHint = (
			<React.Fragment>
				<br />
				<strong>Choose a file</strong> or drag it here!
				<br />
				Accepted Image Formats: <strong>{ACCEPTED_FILE_FORMATS_LABEL}</strong>
				<br />
				Max Image Size: <strong>{MAX_IMAGE_SIZE_LABEL}</strong>
			</React.Fragment>
		);

		const defaultContent = !uploading && !projectThumbnail && (
			<React.Fragment>
				<FontAwesome name={FA.upload} />
				<span>{uploadHint}</span>
			</React.Fragment>
		);

		const uploadingContent = uploading && (
			<React.Fragment>
				<FontAwesome name={FA.cog} spin />
				<span>Uploading...</span>
			</React.Fragment>
		);

		const uploadedContent = projectThumbnail && !uploading && (
			<React.Fragment>
				<img src={projectThumbnail} alt="Uploaded Thumbnail" />
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
			<div className={CLASS}>
				<div className={CLASS + '-top'}>
					<div className={CLASS + '-top-left'}>{this.renderDetailsEditor()}</div>
					<div className={CLASS + '-top-right'}>{this.renderThumbnailEditor()}</div>
				</div>
				<div className={CLASS + '-bottom'}>
					{this.renderDescriptionEditor()}
					{this.renderFooter()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isWorkingOnProject: projectsSelectors.isWorkingOnProject(state),
});

const mapDispatchToProps = {
	addToast: toastActions.addToast,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectForm);
