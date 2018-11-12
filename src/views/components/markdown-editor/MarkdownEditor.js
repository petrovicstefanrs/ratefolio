import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

import MarkdownRenderer from '../markdown-renderer';

import './MarkdownEditor.css';

const CODEMIRROR_OPTIONS = {
	mode: 'markdown',
	theme: 'ratefolio',
	indentUnit: 4,
	indentWithTabs: true,
	lineWrapping: true,
	lineNumbers: true,
	scrollbarStyle: 'null',
};

const EDITOR_TABS = {
	edit: 'edit',
	preview: 'preview',
};

const CLASS = 'rf-MarkdownEditor';

class MarkdownEditor extends Component {
	static propTypes = {
		onChange: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			content: null,
			preview_active: false,
		};
	}

	handleChange = newContent => {
		const {onChange} = this.props;

		this.setState({
			content: newContent,
		});

		onChange && onChange(newContent);
	};

	handleTabClick = tab => {
		this.setState({
			preview_active: tab === EDITOR_TABS.preview,
		});
	};

	renderTabs = () => {
		const {preview_active} = this.state;

		const EDIT_ACTIVE_CLASS = !preview_active ? CLASS + '-tab-active' : '';
		const PREVIEW_ACTIVE_CLASS = preview_active ? CLASS + '-tab-active' : '';

		return (
			<div className={CLASS + '-tabs'}>
				<div
					className={CLASS + '-tab ' + EDIT_ACTIVE_CLASS}
					onClick={() => this.handleTabClick(EDITOR_TABS.edit)}
				>
					Edit
				</div>
				<div
					className={CLASS + '-tab ' + PREVIEW_ACTIVE_CLASS}
					onClick={() => this.handleTabClick(EDITOR_TABS.preview)}
				>
					Preview
				</div>
			</div>
		);
	};

	renderEditor = () => {
		const {content, preview_active} = this.state;

		if (preview_active) {
			return null;
		}

		return (
			<CodeMirror
				className={CLASS + '-editor'}
				autoFocus
				value={content}
				options={CODEMIRROR_OPTIONS}
				onChange={this.handleChange}
			/>
		);
	};

	renderPreview = () => {
		const {content, preview_active} = this.state;

		if (!preview_active) {
			return null;
		}

		return <MarkdownRenderer className={CLASS + '-preview'} source={content} />;
	};

	render() {
		return (
			<div className={CLASS}>
				{this.renderTabs()}
				{this.renderEditor()}
				{this.renderPreview()}
			</div>
		);
	}
}

export default MarkdownEditor;
