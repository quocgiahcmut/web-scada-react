import React, { useEffect } from 'react';

function SupplyDischarge() {
  	useEffect(() => {
			document.title = 'Supply Discharge | SCADA';
		}, []);
	return (
		<div>
			<h2 className="page-header">Supply Discharge</h2>
      <div>Data goes here</div>
		</div>
	);
}

export default SupplyDischarge;
