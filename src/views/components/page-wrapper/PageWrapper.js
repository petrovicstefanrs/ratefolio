import React from 'react';
import PropTypes from 'prop-types';

import './PageWrapper.css';

const CLASS = 'rf-PageWrapper';

const PAGE_WRAPPER_ORIENTATIONS = {
	horizontal: 'horizontal',
	vertical: 'vertical',
};

const PageWrapper = ({orientation, className, children}) => {
	const orientationClass = CLASS + '-' + orientation;

	return <div className={CLASS + ' ' + orientationClass + ' ' + className}>{children}</div>;
};

PageWrapper.propTypes = {
	orientation: PropTypes.oneOf([
		PAGE_WRAPPER_ORIENTATIONS.horizontal,
		PAGE_WRAPPER_ORIENTATIONS.vertical,
	]),
	className: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
};

PageWrapper.defaultProps = {
	orientation: PAGE_WRAPPER_ORIENTATIONS.vertical,
};

export default PageWrapper;
