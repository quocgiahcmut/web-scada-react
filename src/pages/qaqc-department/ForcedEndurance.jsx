import React, { useEffect } from 'react';

function ForcedEndurance() {
		useEffect(() => {
			document.title = 'Forced Endurance | SCADA';
		}, []);
  return (
		<div>
			<h2 className="page-header">Forced Endurance</h2>
			<div>Data goes here</div>
		</div>
	);
}

export default ForcedEndurance;
