import React, { useEffect } from 'react';

import './layout.css';

import Sidebar from '../sidebar/Sidebar';
import Routes from '../Routes';
import TopNav from '../topnav/TopNav';

import { BrowserRouter, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

// import ThemeAction from '../../redux/actions/ThemeAction';

import { setMode, setColor } from '../../redux/slice/ThemeSlice';

const Layout = () => {
	const themeReducer = useSelector((state) => state.theme);
	const sideBarReducer = useSelector((state) => state.sidebar);
	const activeMenu = sideBarReducer.active;

	const dispatch = useDispatch();

	useEffect(() => {
		const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');

		const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');

		dispatch(setMode(themeClass));

		dispatch(setColor(colorClass));
	}, [dispatch]);
	return (
		<BrowserRouter>
			<Route
				render={(props) => (
					<div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
						<Sidebar {...props} />
						<div className={`layout__content ${activeMenu === '' ? '' : 'active'}`}>
							<TopNav />
							<div className="layout__content-main">
								<Routes />
							</div>
						</div>
					</div>
				)}
			/>
		</BrowserRouter>
	);
};
export default Layout;
