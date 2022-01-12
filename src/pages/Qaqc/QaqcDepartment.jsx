import React from 'react'

import { Route, Switch } from 'react-router-dom';

import Deformation from './Deformation';

import ForcedEndurance from './ForcedEndurance';

import Endurance from './Endurance';

import SupplyDischarge from './SupplyDischarge';



function QaqcDepartment() {
  return (
		<Switch>
			<Route path="/qa-qc/deformation" component={Deformation} />
			<Route path="/qa-qc/f-endurance" component={ForcedEndurance} />
			<Route path="/qa-qc/endurance" component={Endurance} />
			<Route path="/qa-qc/sup-dis" component={SupplyDischarge} />
		</Switch>
	);
}

export default QaqcDepartment
