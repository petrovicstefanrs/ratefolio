import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import './MarkdownRenderer.css';

const CLASS = 'rf-MarkdownRenderer';

const MarkdownRenderer = ({className, ...props}) => (
	<ReactMarkdown className={CLASS + ' ' + className} {...props} escapeHtml={true}/>
);

export default MarkdownRenderer;
