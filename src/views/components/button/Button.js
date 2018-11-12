import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './Button.css';

const CLASS = 'rf-Button';

const ICON_POSITIONS = {
	left: 'left',
	right: 'right',
};

const BUTTON_TYPES = {
	button: 'div',
	link: Link,
};

const Button = ({text, icon, iconPos, onClick, href, disabled}) => {
	const handleClick = () => {
		onClick && !disabled && onClick();
	};

	const Type = href ? BUTTON_TYPES.link : BUTTON_TYPES.button;
	const positionClass = ` ${CLASS}-${iconPos}`;
	const disabledClass = disabled ? ` ${CLASS}-disabled` : '';

	return (
		<Type className={CLASS + positionClass + disabledClass} onClick={handleClick} to={href}>
			{icon && <FontAwesome className={CLASS + '-icon'} name={icon} />}
			<span className={CLASS + '-text'}>{text}</span>
		</Type>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	icon: PropTypes.string,
	iconPos: PropTypes.oneOf([ICON_POSITIONS.left, ICON_POSITIONS.right]),
	onClick: PropTypes.func,
	href: PropTypes.string,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	iconPos: ICON_POSITIONS.left,
	disabled: false,
};

export default Button;
