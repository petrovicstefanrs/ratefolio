import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './InputField.css';

const INPUT_FIELD_TYPES = {
	text: 'text',
	password: 'password',
	textarea: 'textarea',
};

const CLASS = 'rf-InputField';

class InputField extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		name: PropTypes.string,
		id: PropTypes.string,
		type: PropTypes.oneOf([
			INPUT_FIELD_TYPES.text,
			INPUT_FIELD_TYPES.password,
			INPUT_FIELD_TYPES.textarea,
		]).isRequired,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		defaultValue: PropTypes.string,
		rows: PropTypes.number,
		rowsMax: PropTypes.number,
		placeholder: PropTypes.string,
	};

	static defaultProps = {
		name: 'rf-InputField',
		disabled: false,
		rows: null,
		rowsMax: null,
		placeholder: null,
		type: INPUT_FIELD_TYPES.text,
	};

	constructor(props) {
		super(props);

		this.state = {
			id: props.id || 'text_input_' + Math.random(),
			value: props.defaultValue || '',
		};
	}

	onChange = e => {
		const {onChange} = this.props;
		const {id} = this.state;

		this.setState({
			value: e.target.value,
		});

		onChange && onChange(e.target.value, id);
	};

	render() {
		const {type, placeholder, className} = this.props;
		const {value, id} = this.state;

		return (
			<input
				id={id}
				autoComplete="off"
				autoFocus
				className={CLASS + ' ' + className || ''}
				maxLength="64"
				onChange={this.onChange}
				placeholder={placeholder}
				ref={e => (this.titleInput = e)}
				type={type}
				value={value}
			/>
		);
	}
}

export default InputField;
