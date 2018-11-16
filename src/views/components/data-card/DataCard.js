import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Separator from '../separator';
import Avatar from '../avatar';

import * as routes from '../../../app/routes';

import './DataCard.css';

const CLASS = 'rf-DataCard';

const DataCard = ({name, thumbnail, id, user}) => {
	const {uid, user_avatar, user_name} = user;

	return (
		<Link to={routes.projectDetails(id)} className={CLASS}>
			<div className={CLASS + '-thumbnail'}>
				<img src={thumbnail} alt={`${name} - Project thumbnail`} />
			</div>
			<div className={CLASS + '-title'}>{name}</div>
			<Separator />
			<div className={CLASS + '-footer'}>
				{user_name}
				<Avatar imgUrl={user_avatar} />
			</div>
		</Link>
	);
};

DataCard.propTypes = {
	name: PropTypes.string,
	thumbnail: PropTypes.string,
	id: PropTypes.string,
	user: PropTypes.object,
};

export default DataCard;
