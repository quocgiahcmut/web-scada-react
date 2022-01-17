import { createSlice } from '@reduxjs/toolkit';

const initialSideBar = {
	active: 'active',
};

const sideBar = createSlice({
	name: 'sidebar',
	initialState: initialSideBar,
	reducers: {
		setActiveMenu: (state, action) => {
			state.active = action.payload;
		},
	},
});

const { reducer, actions } = sideBar;
export const { setActiveMenu } = actions;
export default reducer;
