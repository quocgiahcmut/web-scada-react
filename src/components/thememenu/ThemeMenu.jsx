import React, { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import './thememenu.css';

// import ThemeAction from '../../redux/actions/ThemeAction';

import { setMode, setColor } from '../../redux/slice/ThemeSlice';

const mode_settings = [
	{
		id: 'light',
		name: 'Light',
		background: 'light-background',
		class: 'theme-mode-light',
	},
	{
		id: 'dark',
		name: 'Dark',
		background: 'dark-background',
		class: 'theme-mode-dark',
	},
];

const color_settings = [
	{ id: 'blue', name: 'Blue', background: 'blue-color', class: 'theme-color-blue' },
	{
		id: 'red',
		name: 'Red',
		background: 'red-color',
		class: 'theme-color-red',
	},
	{
		id: 'cyan',
		name: 'Cyan',
		background: 'cyan-color',
		class: 'theme-color-cyan',
	},
	{
		id: 'green',
		name: 'Green',
		background: 'green-color',
		class: 'theme-color-green',
	},
	{
		id: 'orange',
		name: 'Orange',
		background: 'orange-color',
		class: 'theme-color-orange',
	},
];

const clickOutsideRef = (content_ref, toggle_ref) => {
	document.addEventListener('mousedown', (e) => {
		//user click toggle
		if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
			content_ref.current.classList.toggle('active');
		}
		// user click outside toggle and content
		else {
			if (content_ref.current && !content_ref.current.contains(e.target)) {
				content_ref.current.classList.remove('active');
			}
		}
	});
};

const ThemeMenu = () => {
	const menu_ref = useRef(null);
	const menu_toggle_ref = useRef(null);

	const [currMode, setCurrMode] = useState('light');
	const [currColor, setCurrColor] = useState('blue');

	const dispatch = useDispatch();

	const setModee = (mode) => {
		setCurrMode(mode.id);
		localStorage.setItem('themeMode', mode.class);
		dispatch(setMode(mode.class));
	};
	const setColorr = (color) => {
		setCurrColor(color.id);
		localStorage.setItem('colorMode', color.class);
		dispatch(setColor(color.class));
	};
	clickOutsideRef(menu_ref, menu_toggle_ref);

	const setActiveMenu = () => menu_ref.current.classList.add('active');

	const closeMenu = () => menu_ref.current.classList.remove('active');

	useEffect(() => {
		const themeClass = mode_settings.find((e) => e.class === localStorage.getItem('themeMode', 'theme-mode-light'));

		const colorClass = color_settings.find((e) => e.class === localStorage.getItem('colorMode', 'theme-mode-light'));

		if (themeClass !== undefined) setCurrMode(themeClass.id);

		if (colorClass !== undefined) setCurrColor(colorClass.id);
	}, []);

	return (
		<div>
			<button ref={menu_toggle_ref} className="dropdown__toggle" onClick={() => setActiveMenu()}>
				<i className="bx bx-palette"></i>
			</button>
			<div ref={menu_ref} className="theme-menu">
				<h4>Theme settings</h4>
				<button className="theme-menu__close" onClick={() => closeMenu()}>
					<i className="bx bx-x"></i>
				</button>
				<div className="theme-menu__select">
					<span>Choose mode</span>
					<ul className="mode-list">
						{mode_settings.map((item, index) => (
							<li key={index} onClick={() => setModee(item)}>
								<div className={`mode-list__color ${item.background} ${item.id === currMode ? `active` : ``}`}>
									<i className="bx bx-check"></i>
								</div>
								<span>{item.name}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="theme-menu__select">
					<span>Choose color</span>
					<ul className="mode-list">
						{color_settings.map((item, index) => (
							<li key={index} onClick={() => setColorr(item)}>
								<div className={`mode-list__color ${item.background} ${item.id === currColor ? `active` : ``}`}>
									<i className="bx bx-check"></i>
								</div>
								<span>{item.name}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ThemeMenu;
