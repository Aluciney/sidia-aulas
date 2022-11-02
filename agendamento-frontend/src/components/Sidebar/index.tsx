import React, { useEffect, useRef, useState } from 'react';
import { BsCalendar4Week, BsJournalBookmark } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { FiUsers } from 'react-icons/fi';

import LogoImage from '../../assets/img/logo.png';
import { BiChevronLeft } from 'react-icons/bi';
import { useAuth } from '../../contexts/auth';

interface Props {
	visibleMenu: boolean;
	setVisibleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<Props> = ({ visibleMenu, setVisibleMenu }) => {

	const { user } = useAuth();
	const location = useLocation();
	const [currentDomain, setCurrentDomain] = useState<string>();
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const location_path = location.pathname.split('/')[1];
		if (location_path) {
			setCurrentDomain(location_path);
		} else {
			setCurrentDomain(undefined);
		}
	}, [location]);

	useEffect(() => {
		setVisibleMenu(false);
	}, [currentDomain]);

	return (
		<aside ref={ref} id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
			<div
				className="app-brand demo"
				style={{
					padding: '20px 0',
					alignItems: 'center',
					display: 'flex',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				<Link to="/" className="app-brand-link">
					<span className="app-brand-logo demo">
						<img src={LogoImage} height={40} />
					</span>
				</Link>
				<a type="button" onClick={() => setVisibleMenu(false)} className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
					<BiChevronLeft className="align-middle" color="#FFF" size={20} />
				</a>
			</div>
			<div className="menu-inner-shadow"></div>
			<ul className="menu-inner py-1">
				<li className={`menu-item ${!currentDomain ? 'active' : ''}`}>
					<Link to="" className="menu-link">
						<IoHomeOutline className="menu-icon tf-icons bx" />
						<div data-i18n="Analytics">Home</div>
					</Link>
				</li>
				<li className="menu-header small text-uppercase">
					<span className="menu-header-text">Agendar</span>
				</li>
				<li className={`menu-item ${currentDomain === 'agendamentos' ? 'active' : ''}`}>
					<Link to="/agendamentos" className="menu-link">
						<BsCalendar4Week className="menu-icon tf-icons bx" />
						<div data-i18n="Basic">Agendamentos</div>
					</Link>
				</li>
				{user?.profile && (
					<>
						<li className="menu-header small text-uppercase">
							<span className="menu-header-text">Administrador</span>
						</li>
						<li className={`menu-item ${currentDomain === 'usuarios' ? 'active' : ''}`}>
							<Link to="/usuarios" className="menu-link">
								<FiUsers className="menu-icon tf-icons bx" />
								<div data-i18n="Basic">Usuários</div>
							</Link>
						</li>
						<li className={`menu-item ${currentDomain === 'materias' ? 'active' : ''}`}>
							<Link to="/materias" className="menu-link">
								<BsJournalBookmark className="menu-icon tf-icons bx" />
								<div data-i18n="Basic">Matérias</div>
							</Link>
						</li>
						<li className={`menu-item ${currentDomain === 'professores' ? 'active' : ''}`}>
							<Link to="/professores" className="menu-link">
								<FaChalkboardTeacher className="menu-icon tf-icons bx" />
								<div data-i18n="Basic">Professores</div>
							</Link>
						</li>
					</>
				)}
			</ul>
		</aside>
	);
};