import React from 'react';

import './sidebar.css';

import logo from '../../assets/images/favicon.jpg';

import sidebar_items from '../../assets/JsonData/sidebar_routes.json';
import { Link } from 'react-router-dom';

const SidebarItem = (props) => {
	const active = props.active ? 'active' : '';
	return (
		<div className="sidebar__item">
			<div className={`sidebar__item-inner ${active}`}>
				<i className={props.icon}></i>
				<span>{props.title}</span>
			</div>
		</div>
	);
};

function Sidebar(props) {
	const activeItem = sidebar_items.findIndex((item) => item.route === props.location.pathname);
	return (
		<div className="sidebar">
			<div className="sidebar__logo">
				<img src={logo} alt="logo cong ty" />
			</div>
			{sidebar_items.map((item, index) => (
				<Link key={index} to={item.route}>
					<SidebarItem title={item.display_name} icon={item.icon} active={index === activeItem} />
				</Link>
			))}
		</div>
	);
}

export default Sidebar;
