import React from 'react';
import PropTypes from 'prop-types';

import './SectionHeader.css';

const CLASS = 'rf-SectionHeader';

const HEADING_TYPES = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
};

const SectionHeader = ({type, text}) => {
	const Type = type;
	return (
		<div className={CLASS}>
			<Type>
				{text}&nbsp;
				<span>&nbsp;</span>
			</Type>
		</div>
	);
};

SectionHeader.propTypes = {
	type: PropTypes.oneOf([
		HEADING_TYPES.h1,
		HEADING_TYPES.h2,
		HEADING_TYPES.h3,
		HEADING_TYPES.h4,
		HEADING_TYPES.h5,
		HEADING_TYPES.h6,
	]),
	text: PropTypes.string.isRequired,
};

SectionHeader.defaultProps = {
	type: HEADING_TYPES.h1,
};

export default SectionHeader;
