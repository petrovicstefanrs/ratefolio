import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import SectionHeader from '../../components/section-header/SectionHeader';
import Separator from '../../components/separator/Separator';
import TextBlock from '../../components/text-block';
import Spinner from '../../components/spinner';
import PageWrapper from '../../components/page-wrapper';
import DataGrid from '../../components/data-grid';

import * as routes from '../../../app/routes';
import image from '../../../images/no_data.svg';
import {projectsActions, projectsSelectors} from '../../../redux/projects';

import './Home.css';

const CLASS = 'rf-Home';

class Home extends Component {
	static propTypes = {
		projects: PropTypes.array,
		getProjects: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const {getProjects} = this.props;

		getProjects && getProjects();
	}

	renderSpinner = () => {
		const {projects, isLoading} = this.props;

		return isLoading || !projects ? <Spinner /> : null;
	};

	renderEmptyPage = () => {
		const {projects, isLoading} = this.props;

		if ((projects && projects.length) || isLoading) {
			return null;
		}

		return (
			<React.Fragment>
				<div className={CLASS + '-top ' + CLASS + '-section'}>
					<img src={image} alt="No Data Illustration" />
				</div>
				<Separator />
				<div className={CLASS + '-bottom ' + CLASS + '-section'}>
					<SectionHeader text="Oooops..." />
					<TextBlock>
						It seems that no one has posted any projects yet.
						<br />
						Click <Link to={routes.PROJECT_NEW}>here</Link> be <span>the first!</span>
					</TextBlock>
				</div>
			</React.Fragment>
		);
	};

	renderProjects = () => {
		const {projects, isLoading} = this.props;

		if (!projects || !projects.length || isLoading) {
			return null;
		}

		return <DataGrid data={projects} />;
	};

	render() {
		return (
			<PageWrapper className={CLASS}>
				{this.renderSpinner()}
				{this.renderEmptyPage()}
				{this.renderProjects()}
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	projects: projectsSelectors.getProjectsList(state),
	isLoading: projectsSelectors.isGettingProjects(state),
});

const mapDispatchToProps = {
	getProjects: projectsActions.getProjects,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
