import React, { useEffect, useState } from 'react';

import { MenuItem, FormControl, Select } from '@mui/material';
import './deformation.css';
import DeformationMonitorSystem1 from './SystemOne';
import DeformationMonitorSystem2 from './SystemTwo';

function Deformation() {
	const [system, setSystem] = useState(1);

	const handleClick = (e) => {
		setSystem(e.target.value);
	};
	useEffect(() => {
		document.title = 'Deformation | SCADA';
	}, []);

	return (
		<div>
			<div className="page-header-container">
				<h2 className="page-header">Deformation</h2>
				<FormControl
					sx={{
						m: 1,
						minWidth: 120,
						marginBottom: '20px',
						'& .MuiInputBase-root': {
							'.MuiSvgIcon-root': {
								color: 'var(--txt-white)',
							},
						},
					}}
				>
					<Select
						sx={{
							'& .MuiSelect-select': {
								color: 'var(--txt-white)',
								backgroundImage: 'linear-gradient( to right, var(--main-color), var(--second-color));',
							},
							'&. MuiSvgIcon-root': {
								color: 'var(--txt-white)',
							},
						}}
						value={system}
						onChange={handleClick}
						displayEmpty
					>
						<MenuItem value={1}>System 1</MenuItem>
						<MenuItem value={2}>System 2</MenuItem>
					</Select>
				</FormControl>
			</div>
			{system === 1 ? <DeformationMonitorSystem1 /> : <DeformationMonitorSystem2 />}
		</div>
	);
}

export default Deformation;
