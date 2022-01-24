import React, { useEffect } from 'react';

function Endurance() {
	useEffect(() => {
		document.title = 'Endurance | SCADA';
	}, []);
	return (
		<div>
			<h2 className="page-header">Endurance</h2>
			<div>Data goes here</div>
		</div>
	);
}

export default Endurance;
