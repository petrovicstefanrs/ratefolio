import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import lodashMap from 'lodash/map';
import PropTypes from 'prop-types';

import Avatar from '../avatar';
import Separator from '../separator';
import * as routes from '../../../app/routes';

import './DataGrid.css';

const CLASS = 'rf-DataGrid';

class DataGrid extends Component {
	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	renderCard = data => {
		const {name, thumbnail, uid, id, user_avatar, user_name} = data;

		return (
			<Link to={routes.projectDetails(id)} className={CLASS + '-card'} key={uid + '_' + id}>
				<div className={CLASS + '-card-thumbnail'}>
					<img src={thumbnail} alt={`${name} - Project thumbnail`}/>
				</div>
				<div className={CLASS + '-card-title'}>
					{name}
				</div>
				<Separator />
				<div className={CLASS + '-card-footer'}>
					{user_name}
					<Avatar imgUrl={user_avatar} />
				</div>
			</Link>
		);
	};

	renderCards = () => {
		const {data} = this.props;

		return lodashMap(data, project => {
			return this.renderCard(project);
		});
	};

	render() {
		return <div className={CLASS}>{this.renderCards()}</div>;
	}
}

export default DataGrid;
