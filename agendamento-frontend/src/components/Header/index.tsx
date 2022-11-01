import React, { useEffect, useRef, useState } from 'react';
import { BiMenu, BiPowerOff } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import AvatarImage from '../../assets/img/avatar.png';

interface Props {
	visibleMenu: boolean;
	setVisibleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ setVisibleMenu }) => {

	const { signOut, user } = useAuth();
	const ref = useRef<HTMLUListElement>(null);

	const [showUserInfo, setShowUserInfo] = useState(false);

	const location = useLocation();
	const [currentDomain, setCurrentDomain] = useState<string>();

	useEffect(() => {
		const location_path = location.pathname.split('/')[1];
		if (location_path) {
			setCurrentDomain(location_path);
		} else {
			setCurrentDomain(undefined);
		}
	}, [location]);

	useEffect(() => {
		window.addEventListener('click', onClickOutsideHandler);
		return () => {
			window.removeEventListener('click', onClickOutsideHandler);
		}
	}, [showUserInfo]);

	function onClickOutsideHandler(event: any) {
		if (showUserInfo && !ref.current?.contains(event.target)) {
			setShowUserInfo(false);
		}
	}

	useEffect(() => {
		setShowUserInfo(false);
	}, [currentDomain])

	return (
		<nav
			className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
			id="layout-navbar"
		>
			<div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
				<a type="button" onClick={() => setVisibleMenu(true)} className="nav-item nav-link px-0 me-xl-4">
					<BiMenu size={25} />
				</a>
			</div>
			<div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
				<ul ref={ref} className="navbar-nav flex-row align-items-center ms-auto">
					<li className="nav-item navbar-dropdown dropdown-user dropdown">
						<button type="button" onClick={() => setShowUserInfo(true)} className={`clear-button nav-link dropdown-toggle hide-arrow ${showUserInfo ? 'show' : ''}`} data-bs-toggle="dropdown" aria-expanded={showUserInfo}>
							<div className="avatar avatar-online">
								<img src={AvatarImage} alt="" className="w-px-40 h-auto rounded-circle" />
							</div>
						</button>
						<ul className={`dropdown-menu dropdown-menu-end ${showUserInfo ? 'show' : ''}`} data-bs-popper={`${showUserInfo ? 'none' : ''}`}>
							<li>
								<a className="dropdown-item" href="#">
									<div className="d-flex">
										<div className="flex-shrink-0 me-3">
											<div className="avatar avatar-online">
												<img src={AvatarImage} alt="" className="w-px-40 h-auto rounded-circle" />
											</div>
										</div>
										<div className="flex-grow-1">
											<span className="fw-semibold d-block">{user?.name}</span>
											<small className="text-muted">{user?.email}</small>
										</div>
									</div>
								</a>
							</li>
							{/* <li>
								<div className="dropdown-divider"></div>
							</li>
							<li>
								<a className="dropdown-item" href="#">
									<i className="bx bx-user me-2"></i>
									<span className="align-middle">My Profile</span>
								</a>
							</li> */}
							<li>
								<div className="dropdown-divider"></div>
							</li>
							<li>
								<button type="button" onClick={signOut} className="dropdown-item">
									<BiPowerOff className="me-2" />
									<span className="align-middle">Sair</span>
								</button>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	);
};