import React from 'react';

import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import './buttongroup.css';

function ButtonGroup({ alignment, handleChange }) {
	return (
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
			fullWidth
		>
			<ToggleButton value="monitor">Monitor</ToggleButton>
			<ToggleButton value="report">Report</ToggleButton>
		</ToggleButtonGroup>
	);
}

export default ButtonGroup;
