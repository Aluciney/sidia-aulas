import React from 'react';
import { BiHome } from 'react-icons/bi';

import WorkImage from '../../assets/img/home.svg';

export const Home: React.FC = () => {
	return (
		<div className="container-xxl flex-grow-1 container-p-y">
			<h5 className="fw-bold pb-3">Home</h5>
			<div className="card mb-4">
				<div className="card-body h-100 p-5">
					<div className="row align-items-center">
						<div className="col-xl-8">
							<div className="text-center text-xl-start mb-4 mb-xl-0 mb-xxl-4">
								<h1 className="text-primary">Bem-vindo ao sistema de Agendamento</h1>
								<p className="text-gray-700">Aqui você pode agendar, acompanhar e controlar seus aulas particulares.</p>
							</div>
						</div>
						<div className="col-xl-4 text-center">
							<img className="img-fluid" src={WorkImage} style={{ maxWidth: '18rem' }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};