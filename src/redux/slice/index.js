// import ThemeReducer from './ThemeReducer';
// import { combineReducers } from 'redux';
// import SideBarReducer from './SideBarReducer';
// const rootReducer = combineReducers({ ThemeReducer, SideBarReducer });

// export default rootReducer;

import ThemeReducer from './ThemeSlice';
import SideBarReducer from './SideBarSlice';

const rootReducer = {
	theme: ThemeReducer,
	sidebar: SideBarReducer,
};

export default rootReducer;
