import React, { useEffect } from 'react';

import Table from '../components/table/Table';

import wareHouseList from '../assets/JsonData/customers-list.json';

const customerTableHead = ['', 'name', 'email', 'phone', 'total orders', 'total spend', 'location'];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
	<tr key={index}>
		<td>{item.id}</td>
		<td>{item.name}</td>
		<td>{item.email}</td>
		<td>{item.phone}</td>
		<td>{item.total_orders}</td>
		<td>{item.total_spend}</td>
		<td>{item.location}</td>
	</tr>
);

const WareHouse = () => {
	useEffect(() => {
		document.title = 'Warehouse | SCADA';
	}, []);

	return (
		<div>
			<h2 className="page-header">WareHouse</h2>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__body">
							<Table
								headData={customerTableHead}
								renderHead={renderHead}
								bodyData={wareHouseList}
								renderBody={renderBody}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WareHouse;
