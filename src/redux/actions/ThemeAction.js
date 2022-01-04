 const setMode = (mode) => {
		return {
			type: 'SET_MODE',
			payload: mode,
		};
 };

 const setColor = (color) => {
		return {
			type: 'SET_COLOR',
			payload: color,
		};
 };

 const getTheme = () => {
		return {
			type: 'GET_THEME',
		};
 };

 const exportDefault = {
		setColor,
		getTheme,
		setMode,
 };

 export default exportDefault;
