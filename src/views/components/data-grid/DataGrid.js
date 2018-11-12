import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import lodashMap from 'lodash/map';
import PropTypes from 'prop-types';

import SectionHeader from '../../components/section-header/SectionHeader';
import Separator from '../../components/separator/Separator';
import * as routes from '../../../app/routes';
import FA from '../../../lib/font_awesome';
import TextBlock from '../../components/text-block';
import MarkdownRenderer from '../../components/markdown-renderer';

import './DataGrid.css';

const CLASS = 'rf-DataGrid';

class DataGrid extends Component {
	static propTypes = {
		data: PropTypes.array.isRequired,
	};

	renderCard = data => {
		const {name, thumbnail, uid, id, url, user_avatar, user_name} = data;

		return (
			<Link to={routes.projectDetails(id)} className={CLASS + '-card'} key={uid + '_' + id}>
				<div className={CLASS + '-card-thumbnail'}>
					<img src={thumbnail} />
				</div>
				<div className={CLASS + '-card-title'}>
					{name}
				</div>
				<Separator />
				<div className={CLASS + '-card-footer'}>
					{user_name}
					<img src={user_avatar} />
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
