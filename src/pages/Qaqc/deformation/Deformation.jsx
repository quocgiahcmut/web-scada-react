import React, { useEffect, useState } from 'react';

import ButtonGroup from '../../../components/buttongroup/ButtonGroup';

import { MenuItem, FormControl, Select } from '@mui/material';
import './deformation.css';
import DeformationMonitorSystem1 from './SystemOne';

function Deformation() {
	const [alignment, setAlignment] = useState('monitor');
	const [system, setSystem] = useState(1);

	const handleClick = (e) => {
		console.log(e.target.value);
		setSystem(e.target.value);
	};
	useEffect(() => {
		document.title = 'Deformation | SCADA';
	}, []);
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
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
			<div>
				<ButtonGroup alignment={alignment} handleChange={handleChange} />
				{alignment === 'report' && <div>Report goes here</div>}
				{alignment === 'monitor' && <DeformationMonitorSystem1 />}
			</div>
		</div>
	);
}

export default Deformation;
