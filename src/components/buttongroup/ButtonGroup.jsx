import React from 'react';

import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import './buttongroup.css';

function ButtonGroup({ alignment, handleChange }) {
	return (
		<ToggleButtonGroup
			sx={{
				marginBottom: '10px',
				'& .MuiButtonBase-root': {
					color: 'var(--txt-color)',
				},
				'& .MuiButtonBase-root.Mui-selected': {
					backgroundColor: 'var(--main-color)',
					color: 'var(--txt-white)',
				},
				'& .MuiButtonBase-root.Mui-selected:hover': {
					backgroundColor: 'var(--main-color)',
					color: 'var(--txt-white)',
				},
				'& .MuiButtonBase-root:hover': {
					color: 'var(--txt-white)',
					backgroundColor: 'var(--second-color)',
				},
			}}
			color="primary"
			exclusive
			value={alignment}
			onChange={handleChange}
			fullWidth
		>
			<ToggleButton value="monitor">Monitor</ToggleButton>
			<ToggleButton value="report">Report</ToggleButton>
		</ToggleButtonGroup>
	);
}

export default ButtonGroup;
