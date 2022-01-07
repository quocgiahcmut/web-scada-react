import React from 'react';

import { useSelector } from 'react-redux';

import Chart from 'react-apexcharts';

import { Link } from 'react-router-dom';

import Badge from '../components/badge/Badge';

import statusCards from '../assets/JsonData/status-card-data.json';

import StatusCard from '../components/status-card/StatusCard';

import Table from '../components/table/Table';

const chartOptions = {
	series: [
		{
			name: 'EE2013',
			data: [40, 70, 20, 90, 36, 80, 30, 91, 60, 120],
		},
		{
			name: 'EE2015',
			data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
		},
	],
	options: {
		color: ['#6ab04c', '#2980b9'],
		chart: {
			background: 'transparent',
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
		},
		legend: {
			position: 'top',
		},
		grid: {
			show: false,
		},
	},
};

const topCustomers = {
	head: ['Nhân viên', 'Tổng giờ công', 'Dự kiến'],
	body: [
		{
			username: 'john doe',
			order: '490',
			price: '$15,870',
		},
		{
			username: 'frank iva',
			order: '250',
			price: '$12,251',
		},
		{
			username: 'anthony baker',
			order: '120',
			price: '$10,840',
		},
		{
			username: 'frank iva',
			order: '110',
			price: '$9,251',
		},
		{
			username: 'anthony baker',
			order: '80',
			price: '$8,840',
		},
	],
};

const renderCustomerHeader = (item, index) => <th key={index}>{item}</th>;

const renderCustomerBody = (item, index) => (
	<tr key={index}>
		<td>{item.username}</td>
		<td>{item.order}</td>
		<td>{item.price}</td>
	</tr>
);

const latestOrders = {
	header: ['Mã SP', 'Nhân viên', 'số lượng', 'ngày SX', 'Trạng thái'],
	body: [
		{
			id: '#OD1711',
			user: 'john doe',
			date: '17 Jun 2021',
			price: '900',
			status: 'đang thực hiện',
		},
		{
			id: '#OD1712',
			user: 'frank iva',
			date: '1 Jun 2021',
			price: '400',
			status: 'hoàn thành',
		},
		{
			id: '#OD1713',
			user: 'anthony baker',
			date: '27 Jun 2021',
			price: '200',
			status: 'đang thực hiện',
		},
		{
			id: '#OD1712',
			user: 'frank iva',
			date: '1 Jun 2021',
			price: '400',
			status: 'hoàn thành',
		},
		{
			id: '#OD1713',
			user: 'anthony baker',
			date: '27 Jun 2021',
			price: '200',
			status: 'thiếu',
		},
	],
};

const orderStatus = {
	'đang chờ': 'primary',
	'đang thực hiện': 'warning',
	'hoàn thành': 'success',
	thiếu: 'danger',
};

const renderOrderHead = (item, index) => {
	return <th key={index}>{item}</th>;
};

const renderOrderBody = (item, index) => {
	return (
		<tr key={index}>
			<td>{item.id}</td>
			<td>{item.user}</td>
			<td>{item.price}</td>
			<td>{item.date}</td>
			<td>
				<Badge type={orderStatus[item.status]} content={item.status} />
			</td>
		</tr>
	);
};

const Dashboard = () => {
	const themeReducer = useSelector((state) => state.theme.mode);

	return (
		<div>
			<h2 className="page-header">Dashboard</h2>
			<div className="row">
				<div className="col-6">
					<div className="row">
						{statusCards.map((item, index) => {
							return (
								<div key={index} className="col-6">
									<StatusCard icon={item.icon} count={item.count} title={item.title} />
								</div>
							);
						})}
					</div>
				</div>
				<div className="col-6">
					<div className="card full-height">
						<Chart
							options={
								themeReducer === 'theme-mode-dark'
									? {
											...chartOptions.options,
											theme: { mode: 'dark' },
									  }
									: {
											...chartOptions.options,
											theme: { mode: 'light' },
									  }
							}
							series={chartOptions.series}
							type="line"
							height="100%"
						/>
					</div>
				</div>
				<div className="col-5">
					<div className="card">
						<div className="card__header">
							<h3>top customers</h3>
						</div>
						<div className="card__body">
							<Table
								headData={topCustomers.head}
								bodyData={topCustomers.body}
								renderBody={renderCustomerBody}
								renderHead={renderCustomerHeader}
							/>
							{/* table */}
						</div>
						<div className="card__footer">
							<Link to="/warehouse">view all</Link>
						</div>
					</div>
				</div>
				<div className="col-7">
					<div className="card">
						<div className="card__header">
							<h3>latest orders</h3>
						</div>
						<div className="card__body">
							<Table
								headData={latestOrders.header}
								bodyData={latestOrders.body}
								renderBody={renderOrderBody}
								renderHead={renderOrderHead}
							/>
						</div>
						<div className="card__footer">
							<Link to="/">view all</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
