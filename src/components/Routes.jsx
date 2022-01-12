import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Customers from '../pages/Warehouse';
import Dashboard from '../pages/Dashboard';
import QaqcDepartment from '../pages/Qaqc/QaqcDepartment';

const Routes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Dashboard} />
			<Route path="/warehouse" component={Customers} />
			<Route path="/qa-qc" component={QaqcDepartment} />
		</Switch>
	);
};

export default Routes;
