import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

import FA from '../../../lib/font_awesome';

import './ActionCard.css';

const CLASS = 'rf-ActionCard';

const ActionCard = ({onClick, icon, href, label}) => {
	const Element = href ? Link : 'div';

	const handleClick = () => {
		onClick && onClick();
	};

	return (
		<Element to={href} className={CLASS} onClick={handleClick}>
			<FontAwesome className={CLASS + '-icon'} name={icon} />
			<span className={CLASS + '-label'}>{label}</span>
		</Element>
	);
};

ActionCard.propTypes = {
	onClick: PropTypes.func,
	icon: PropTypes.string,
	href: PropTypes.string,
};

ActionCard.defaultProps = {
	icon: FA.plus,
};

export default ActionCard;
