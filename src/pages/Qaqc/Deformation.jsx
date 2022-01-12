import React, { useEffect, useState } from 'react';

import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import '../../components/buttongroup/buttongroup.css';

function Deformation() {
	// const themeReducer = useSelector(state => state.theme);
	const [alignment, setAlignment] = useState('monitor');
	const [showMonitor, setShowMonitor] = useState(true);
	const [showReport, setShowReport] = useState(false);
	useEffect(() => {
		document.title = 'Deformation | SCADA';
	}, []);
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
		setShowMonitor(!showMonitor);
		setShowReport(!showReport);
	};
	return (
		<div>
			<h2 className="page-header">Deformation</h2>
			<div>
				<ToggleButtonGroup
					sx={{
						'& .MuiButtonBase-root': {
							color: 'var(--txt-color)',
						},
						'& .Mui-selected': {
							backgroundColor: 'var(--main-color)',
						},
					}}
					color="primary"
					exclusive
					value={alignment}
					onChange={handleChange}
				>
					<ToggleButton value="monitor">Monitor</ToggleButton>
					<ToggleButton value="report">Report</ToggleButton>
				</ToggleButtonGroup>
				{showReport && <div>Report goes here</div>}
				{showMonitor && <div>Monitor goes here</div>}
			</div>
		</div>
	);
}

export default Deformation;
