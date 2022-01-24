import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { AuthProvider, UserManager } from 'oidc-react';
import { WebStorageStateStore } from 'oidc-client';
import Customers from '../pages/Warehouse';
import Dashboard from '../pages/Dashboard';
import QaqcDepartment from '../pages/qaqc/QaqcDepartment';

const userManager = new UserManager({
	userStore: new WebStorageStateStore({ store: window.localStorage }),
	authority: 'https://authenticationserver20220111094343.azurewebsites.net',
	metadata: {
		issuer: 'https://authenticationserver20220111094343.azurewebsites.net',
		authorization_endpoint: 'https://authenticationserver20220111094343.azurewebsites.net/account/login',
	},
	client_id: 'user-management-app',
	redirect_uri: 'http://localhost:3000',
	post_logout_redirect_uri: 'http://localhost:3000',
	scope: 'openid IdentityServerApi profile',
	response_type: 'code',
	loadUserInfo: true,
	automaticSilentRenew: true,
});

const Routes = () => {
	return (
		// <AuthProvider
		// 	userManager={userManager}
		// 	onSignIn={(e) => {
		// 		console.log(e);
		// 	}}
		// >
			<Switch>
				<Route path="/" exact component={Dashboard} />
				<Route path="/warehouse" component={Customers} />
				<Route path="/qa-qc" component={QaqcDepartment} />
			</Switch>
		// </AuthProvider>
	);
};

export default Routes;
