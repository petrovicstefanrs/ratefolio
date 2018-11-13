import React from 'react';
import {Link} from 'react-router-dom';

import Separator from '../separator';
import SectionHeader from '../section-header';
import TextBlock from '../text-block';

import * as routes from '../../../app/routes';
import image from '../../../images/not_exists.svg';

import './MissingProject.css';

const CLASS = 'rf-MissingProject';

const MissingProject = () => (
	<React.Fragment>
		<div className={CLASS + '-top ' + CLASS + '-section'}>
			<img src={image} alt="No Project Illustration" />
		</div>
		<Separator />
		<div className={CLASS + '-bottom ' + CLASS + '-section'}>
			<SectionHeader text="Oh..." />
			<TextBlock>
				It seems this project is <span>missing or deleted.</span>
				<br />
				Click <Link to={routes.HOME}>here</Link> to go Home
			</TextBlock>
		</div>
	</React.Fragment>
);

export default MissingProject;
