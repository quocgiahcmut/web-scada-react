import axiosClient from './axiosClient';

class DeformationApi {
	getMonitorSettings = (params) => {
		const url = '';
		// PARAMS MUST BE AN OBJECT
		return axiosClient.get(url, { params });
	};
}

const deformationApi = new DeformationApi();
export default deformationApi;
