import React from 'react';
import PropTypes from 'prop-types';

import './TextBlock.css';

const CLASS = 'rf-TextBlock';

const TextBlock = ({children}) => <span className={CLASS}>{children}</span>;

TextBlock.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
};

export default TextBlock;
