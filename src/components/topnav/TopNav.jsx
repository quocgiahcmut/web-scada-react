import React from 'react';

import Dropdown from '../dropdown/DropDown';

import ThemeMenu from '../thememenu/ThemeMenu';

import './topnav.css';

import notifications from '../../assets/JsonData/notification.json';

import { Link } from 'react-router-dom';

import user_image from '../../assets/images/user.jpg';

import user_menu from '../../assets/JsonData/user_menus.json';

import { useSelector, useDispatch } from 'react-redux';

const curr_user = {
	display_name: 'Tri Hoang',
	image: user_image,
};

const renderNotificationItem = (item, index) => (
	<div className="notification-item" key={index}>
		<i className={item.icon}></i>
		<span>{item.content}</span>
	</div>
);

const renderUserToggle = (user) => (
	<div className="topnav__right-user">
		<div className="topnav__right-user__image">
			<img src={curr_user.image} alt="ảnh người dùng" />
		</div>
		<div className="topnav__right-user__name">{user.display_name}</div>
	</div>
);

const renderUserMenu = (item, i) => {
	return (
		<Link to="/" key={i}>
			<div className="notification-item">
				<i className={item.icon}></i>
				<span>{item.content}</span>
			</div>
		</Link>
	);
};

const Topnav = () => {
	const sideBarReducer = useSelector((state) => state.sidebar);
	const activeMenu = sideBarReducer.active === undefined ? '' : sideBarReducer.active;

	return (
		<div className={`topnav ${activeMenu === '' ? '' : 'active'}`}>
			<div className="topnav__search">
				<input type="text" placeholder="Tìm kiếm ở đây" />
				<i className="bx bx-search"></i>
			</div>
			<div className="topnav__right">
				<div className="topnav__right-item">
					<Dropdown
						// icon="bx bx-user"
						customToggle={() => renderUserToggle(curr_user)}
						contentData={user_menu}
						renderItems={(item, i) => renderUserMenu(item, i)}
					/>
					{/* {drop down here} */}
				</div>
				<div className="topnav__right-item">
					<Dropdown
						icon="bx bx-bell"
						badge="12"
						contentData={notifications}
						renderItems={(item, index) => renderNotificationItem(item, index)}
						renderFooter={() => <Link to="/">View All</Link>}
					/>
				</div>
				<div className="topnav__right-item">
					<ThemeMenu />
				</div>
			</div>
		</div>
	);
};

export default Topnav;
