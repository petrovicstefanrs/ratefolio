import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

const CLASS = 'rf-Avatar';

const Avatar = ({imgUrl}) => {
	const avatar = imgUrl && <img src={imgUrl} alt="User Avatar" />;

	return <div className={CLASS}>{avatar}</div>;
};
Avatar.propTypes = {
	imgUrl: PropTypes.string,
};

Avatar.defaultProps = {
	imgUrl: null,
};

export default Avatar;
