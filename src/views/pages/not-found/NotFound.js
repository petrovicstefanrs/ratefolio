import React from 'react';

import Button from '../../components/button';
import SectionHeader from '../../components/section-header';
import Separator from '../../components/separator';
import PageWrapper from '../../components/page-wrapper';

import * as routes from '../../../app/routes';
import image from '../../../images/not_found.svg';

import './NotFound.css';

const CLASS = 'rf-NotFound';

const NotFound = () => (
	<PageWrapper orientation="horizontal" className={CLASS}>
		<div className={CLASS + '-left'}>
			<img src={image} alt="Not Found Illustration" />
		</div>
		<Separator orientation="vertical"/>
		<div className={CLASS + '-right'}>
			<SectionHeader type="h2" text="404 Not Found" />
			<Button href={routes.HOME} text="Go Home" />
		</div>
	</PageWrapper>
);

export default NotFound;
