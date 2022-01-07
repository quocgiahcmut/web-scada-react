import { createSlice } from '@reduxjs/toolkit';

const theme = createSlice({
	name: 'theme',
	initialState: {
		mode: '',
		color: '',
	},
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload;
		},
		setColor: (state, action) => {
			state.color = action.payload;
		},
		getTheme: (state, action) => {},
	},
});

const { reducer, actions } = theme;
export const { setMode, setColor, getTheme } = actions;
export default reducer;
