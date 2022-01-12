import React, { useEffect } from 'react';

function Deformation() {
	useEffect(() => {
		document.title = 'Deformation | SCADA';
	}, []);
	return (
		<div>
			<h2 className="page-header">Deformation</h2>
			<div>Data goes here</div>
		</div>
	);
}

export default Deformation;
