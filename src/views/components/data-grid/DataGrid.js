import React, {Component} from 'react';
import lodashMap from 'lodash/map';
import PropTypes from 'prop-types';

import * as routes from '../../../app/routes';

import './DataGrid.css';
import DataCard from '../data-card';
import ActionCard from '../action-card';

const CLASS = 'rf-DataGrid';

class DataGrid extends Component {
	static propTypes = {
		data: PropTypes.array.isRequired,
		showActionCard: PropTypes.bool,
	};

	static defaultProps = {
		showActionCard: false,
	};

	renderCard = data => {
		const {name, thumbnail, uid, id, user_avatar, user_name} = data;
		const user = {
			uid,
			user_name,
			user_avatar,
		};

		return <DataCard key={uid + '_' + id} name={name} thumbnail={thumbnail} id={id} user={user} />;
	};

	renderCards = () => {
		const {data} = this.props;

		return lodashMap(data, project => {
			return this.renderCard(project);
		});
	};

	render() {
		return (
			<div className={CLASS}>
				<ActionCard href={routes.PROJECT_NEW} label="New Project" />
				{this.renderCards()}
			</div>
		);
	}
}

export default DataGrid;
