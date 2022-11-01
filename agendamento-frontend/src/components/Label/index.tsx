import React, { LabelHTMLAttributes } from 'react';

const Label: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...rest }) => {
	return <label className={`form-label mb-0 ${className ? className : ''}`} {...rest} />;
}

export { Label };