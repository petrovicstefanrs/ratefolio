import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import './WithDropzone.css';

const CLASS = 'rf-WithDropzone';

class WithDropzone extends Component {
	static propTypes = {
		// Dropzone speciffic props
		accept: PropTypes.array,
		disableClick: PropTypes.bool,
		disabled: PropTypes.bool,
		preventDropOnDocument: PropTypes.bool,
		multiple: PropTypes.bool,
		name: PropTypes.string,
		maxSize: PropTypes.number,
		minSize: PropTypes.number,
		className: PropTypes.string,
		activeClassName: PropTypes.string,
		acceptClassName: PropTypes.string,
		rejectClassName: PropTypes.string,
		disabledClassName: PropTypes.string,
		onClick: PropTypes.func,
		onDrop: PropTypes.func,
		onDropAccepted: PropTypes.func,
		onDropRejected: PropTypes.func,
		onDragStart: PropTypes.func,
		onDragEnter: PropTypes.func,
		onDragOver: PropTypes.func,
		onDragLeave: PropTypes.func,
		onFileDialogCancel: PropTypes.func,
	};

	static defaultProps = {
		accept: null,
		disableClick: false,
		disabled: false,
		preventDropOnDocument: true,
		multiple: false,
		name: 'FileDropZone',
		maxSize: null,
		minSize: 0,
	};

	onClick = (event) => {
		const {onClick} = this.props;

		onClick && onClick(event);

		return;
	}

	onDrop = (acceptedFiles, rejectedFiles) =>  {
		const {onDrop} = this.props;

		this.setState({
			isFileDragged: false,
		});

		onDrop && onDrop(acceptedFiles, rejectedFiles);

		return;
	}

	onDropAccepted = () => {
		const {onDropAccepted} = this.props;

		this.setState({
			isFileDragged: false,
		});

		onDropAccepted && onDropAccepted();

		return;
	}

	onDropRejected = () => {
		const {onDropRejected} = this.props;

		this.setState({
			isFileDragged: false,
		});

		onDropRejected && onDropRejected();

		return;
	}

	onDragStart = () => {
		const {onDragStart} = this.props;

		this.setState({
			isFileDragged: true,
		});

		onDragStart && onDragStart();

		return;
	}

	onDragEnter = () => {
		const {onDragEnter} = this.props;

		this.setState({
			isFileDragged: true,
		});

		onDragEnter && onDragEnter();

		return;
	}

	onDragOver = () => {
		const {onDragOver} = this.props;

		this.setState({
			isFileDragged: false,
		});

		onDragOver && onDragOver();

		return;
	}

	onDragLeave = () => {
		const {onDragLeave} = this.props;

		this.setState({
			isFileDragged: false,
		});

		onDragLeave && onDragLeave();

		return;
	}

	onFileDialogCancel = () => {
		const {onFileDialogCancel} = this.props;

		onFileDialogCancel && onFileDialogCancel();

		return;
	}

	render() {
		const {
			disableClick,
			disabled,
			preventDropOnDocument,
			multiple,
			name,
			maxSize,
			minSize,
			className,
			activeClassName,
			acceptClassName,
			rejectClassName,
			disabledClassName,
			onClick,
			onDrop,
			onDropAccepted,
			onDropRejected,
			onDragStart,
			onDragEnter,
			onDragOver,
			onDragLeave,
			onFileDialogCancel,
			children,
			accept
		} = this.props;

		const acceptTypes = accept ? accept.join(', ') : null;
		let dropZone = (
			<Dropzone
				ref={node => {
					this.dropzone = node;
				}}
				accept={acceptTypes}
				disableClick={disableClick}
				disabled={disabled}
				preventDropOnDocument={preventDropOnDocument}
				multiple={multiple}
				name={name}
				maxSize={maxSize}
				minSize={minSize}
				className={CLASS + ' ' + className}
				activeClassName={activeClassName || `${CLASS}-active`}
				acceptClassName={acceptClassName || `${CLASS}-accepted`}
				rejectClassName={rejectClassName || `${CLASS}-rejected`}
				disabledClassName={disabledClassName || `${CLASS}-disabled`}
				onClick={onClick}
				onDrop={onDrop}
				onDropAccepted={onDropAccepted}
				onDropRejected={onDropRejected}
				onDragStart={onDragStart}
				onDragEnter={onDragEnter}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onFileDialogCancel={onFileDialogCancel}
			>
				{children}
			</Dropzone>
		);

		return dropZone;
	}
}

export default WithDropzone;
