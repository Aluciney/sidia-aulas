import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../contexts/auth';
import { Home } from '../pages/Home';
import { MatterList } from '../pages/Matter';
import { ScheduleList, ScheduleRegister } from '../pages/Schedule';
import { TeacherList, TeacherShow } from '../pages/Teacher';
import { UserList } from '../pages/User';

export const UserLayout: React.FC = () => {

	const { user } = useAuth();
	const [visibleMenu, setVisibleMenu] = useState(false);

	useEffect(() => {
		if (visibleMenu) {
			document.querySelector('html')?.classList.add('layout-menu-expanded');
		} else {
			document.querySelector('html')?.classList.remove('layout-menu-expanded');
		}
	}, [visibleMenu]);

	return (
		<div className="layout-wrapper layout-content-navbar">
			<div className="layout-container">
				<Sidebar visibleMenu={visibleMenu} setVisibleMenu={setVisibleMenu} />
				<div className="layout-page">
					<Header visibleMenu={visibleMenu} setVisibleMenu={setVisibleMenu} />
					<div className="content-wrapper">
						<Switch>
							<Route path="/" element={<Home />} />
							<Route path="/agendamentos" element={<ScheduleList />} />
							<Route path="/agendamentos/cadastrar" element={<ScheduleRegister />} />

							{user?.profile && <Route path="/usuarios" element={<UserList />} />}
							{user?.profile && <Route path="/materias" element={<MatterList />} />}
							{user?.profile && <Route path="/professores" element={<TeacherList />} />}
							{user?.profile && <Route path="/professores/:ID" element={<TeacherShow />} />}

							<Route path="/*" element={<Navigate to="/" replace />} />
						</Switch>
						<Footer />
						<div className="content-backdrop fade"></div>
					</div>
				</div>
			</div>
			<div className="layout-overlay layout-menu-toggle"></div>
		</div>
	);
};