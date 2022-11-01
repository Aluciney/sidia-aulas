import React from 'react';

import { format } from 'date-fns';

export const Footer: React.FC = () => {
	return (
		<footer className="content-footer footer bg-footer-theme">
			<div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
				<div className="mb-2 mb-md-0">
					© <a href="https://sidia.com" target="_blank" className="footer-link fw-bolder">Sidia</a> - {format(new Date(), 'yyyy')}
				</div>
			</div>
		</footer>
	);
};