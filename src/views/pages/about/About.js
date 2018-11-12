import React from 'react';
import {Link} from 'react-router-dom';

import SectionHeader from '../../components/section-header/SectionHeader';
import Separator from '../../components/separator/Separator';
import TextBlock from '../../components/text-block';
import PageWrapper from '../../components/page-wrapper';

import * as routes from '../../../app/routes';
import image from '../../../images/about.svg';

import './About.css';

const CLASS = 'rf-About';

const About = () => (
	<PageWrapper className={CLASS}>
		<div className={CLASS + '-top ' + CLASS + '-section'}>
			<img src={image} alt="Not Found Illustration" />
		</div>
		<Separator />
		<div className={CLASS + '-bottom ' + CLASS + '-section'}>
			<SectionHeader text="About" />
			<TextBlock>
				<span>RateFolio</span> is a platform intended for posting your portfolio websites, and
				getting reviews from the community. While primarily focused on portfolios, you are free to
				post <span>websites of any type</span> and let people <span>comment and rate</span> them on
				multiple criteria.
			</TextBlock>
			<TextBlock>
				<Link to={routes.AUTH_SIGN_IN}>Sign In</Link> to start posting your websites.
			</TextBlock>
			<TextBlock>
				<span>Note from creator:</span> If you like this app, check out my{' '}
				<a href="https://petrovicstefan.rs" target="_blank" rel="noopener noreferrer">
					Portfolio
				</a>{' '}
				for more cool stuff!
			</TextBlock>
		</div>
	</PageWrapper>
);

export default About;
