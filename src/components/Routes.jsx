import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Customers from '../pages/Customers';
import Dashboard from '../pages/Dashboard';

const Routes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Dashboard} />
			<Route path="/customers" component={Customers} />
		</Switch>
	);
};

export default Routes;
