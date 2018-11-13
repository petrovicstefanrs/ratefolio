import React from 'react';
import {Link} from 'react-router-dom';

import Separator from '../separator';
import SectionHeader from '../section-header';
import TextBlock from '../text-block';

import * as routes from '../../../app/routes';
import image from '../../../images/forbidden.svg';

import './ForbiddenPage.css';

const CLASS = 'rf-ForbiddenPage';

const ForbiddenPage = () => (
	<React.Fragment>
		<div className={CLASS + '-top ' + CLASS + '-section'}>
			<img src={image} alt="Forbiden Page Illustration" />
		</div>
		<Separator />
		<div className={CLASS + '-bottom ' + CLASS + '-section'}>
			<SectionHeader text="Sorry..." />
			<TextBlock>
				You <span>don't have access</span> to this page
				<br />
				Click <Link to={routes.HOME}>here</Link> to go Home
			</TextBlock>
		</div>
	</React.Fragment>
);

export default ForbiddenPage;
