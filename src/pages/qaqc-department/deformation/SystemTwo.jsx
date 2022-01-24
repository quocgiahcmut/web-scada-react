import React, { useEffect, useState } from 'react';

import auto from '../../../assets/images/auto.PNG';

import manual from '../../../assets/images/manual.PNG';

import emergency from '../../../assets/images/stop.PNG';

import led from '../../../assets/images/led.svg';

import { useSelector } from 'react-redux';

import Chart from 'react-apexcharts';

import {
	Table,
	Paper,
	TableRow,
	TableHead,
	TableContainer,
	TableCell,
	tableCellClasses,
	TableBody,
	styled,
	createTheme,
	ThemeProvider,
} from '@mui/material';
import './deformation.css';
import connection from '../../../api/signalR';
import ButtonGroup from '../../../components/buttongroup/ButtonGroup';

// --------------------------SETTINGS OPTIONS---------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundImage: 'linear-gradient(var(--main-color), var(--second-color));',
		color: 'var(--txt-white)',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

function createData(params, process2, process3) {
	return {
		params,
		process2,
		process3,
	};
}

var velocityChartOptions = {
	options: {
		chart: {
			height: 350,
			type: 'radialBar',
			offsetY: -10,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 135,
				dataLabels: {
					name: {
						fontSize: '12px',
						color: undefined,
						offsetY: 60,
					},
					value: {
						offsetY: 30,
						fontSize: '10px',
						color: 'var(--txt-color)',
						fontWeight: 'bold',
						formatter: function (val) {
							return val + 's';
						},
					},
				},
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'dark',
				shadeIntensity: 0.15,
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 65, 91],
			},
		},
		stroke: {
			dashArray: 4,
		},
		labels: ['Thời gian giữ'],
	},
};

var radialBarOptions = {
	options: {
		chart: {
			type: 'radialBar',
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			radialBar: {
				startAngle: 0,
				endAngle: 360,
				hollow: {
					margin: 0,
					size: '70%',
					background: 'transparent',
					image: undefined,
					imageOffsetX: 0,
					imageOffsetY: 0,
					position: 'front',
					dropShadow: {
						enabled: true,
						top: 3,
						left: 0,
						blur: 4,
						opacity: 0.24,
					},
				},
				track: {
					background: '#fff',
					strokeWidth: '67%',
					margin: 0, // margin is in pixels
					dropShadow: {
						enabled: true,
						top: -3,
						left: 0,
						blur: 5,
						opacity: 0.15,
					},
				},

				dataLabels: {
					show: true,
					name: {
						offsetY: -10,
						show: true,
						color: 'var(--main-color)',
						fontSize: '12px',
						fontWeight: 'bold',
					},
					value: {
						formatter: function (val) {
							return parseInt(val) * 10;
						},
						offsetY: '0',
						color: 'var(--txt-color)',
						fontSize: '10px',
						fontWeight: 'bold',
						show: true,
					},
				},
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'dark',
				type: 'horizontal',
				shadeIntensity: 0.5,
				gradientToColors: ['#ABE5A1'],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100],
			},
		},
		stroke: {
			lineCap: 'round',
		},
		labels: ['Newton'],
	},
};

const state = {
	auto,
	manual,
	emergency,
};

function StyledPaper({ children }) {
	return <Paper elevation={6}>{children}</Paper>;
}
// --------------------------------------------------------------------

function DeformationMonitorSystem2() {
	const [params, setParams] = useState({
		force2: 0,
		numbs2: 0,
		time2: 0,
		force3: 0,
		numbs3: 0,
		time3: 0,
	});
	const [settings, setSettings] = useState({
		force2: 0,
		numbs2: 0,
		time2: 0,
		force3: 0,
		numbs3: 0,
		time3: 0,
	});
	const [alignment, setAlignment] = useState('monitor');
	const [machineState, setMachineState] = useState(state.auto);
	const [isShowLed, setIsShowLed] = useState(true);
	const [signalRConnection, setSignalRConnection] = useState(null);
	const sideBarReducer = useSelector((state) => state.sidebar);
	const themeReducer = useSelector((state) => state.theme);
	const active = sideBarReducer.active;
	const ledRef = isShowLed && <img src={led} alt="led" className={active} />;
	useEffect(() => {
		setSignalRConnection(connection);
	}, []);

	useEffect(() => {
		if (signalRConnection) {
			signalRConnection
				.start()
				.then(() => {
					connection.on('DeformationSystem2Monitor', (message) => {
						console.log(message);

						// UPDATE STATE AFTER RECEIVING DATA FROM HUB VIA CONNECTION
						setParams({
							force2: message.forceCylinder2,
							numbs2: message.pressingNumberCylinder2,
							time2: message.holdingTimeCylinder2,
							force3: message.forceCylinder3,
							numbs3: message.pressingNumberCylinder3,
							time3: message.holdingTimeCylinder3,
						});
						setMachineState(message.stateSystem2);
					});
				})
				.catch((error) => console.log(error));
		}
		return () => {
			// REMEMBER TO UNCOMMENT THIS
			// signalRConnection.stop();
		};
	}, [signalRConnection]);

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const rows = [
		createData('Lực nhấn', settings.force2, settings.force3),
		createData('Số lần nhấn', settings.numbs2, settings.numbs3),
		createData('Thời gian giữ', settings.time2, settings.time3),
	];

	return (
		<>
			<div>
				<ButtonGroup alignment={alignment} handleChange={handleChange} />
				{alignment === 'report' && <div>Report goes here</div>}
				{alignment === 'monitor' && (
					<>
						<div className="row">
							<div className="col-7">
								<div className="card ">
									<div className="card__header">
										<h3>Thông số cài đặt</h3>
									</div>
									<div className="card__body">
										<ThemeProvider
											theme={
												themeReducer.mode === 'theme-mode-dark'
													? createTheme({
															palette: {
																mode: 'dark',
															},
													  })
													: createTheme({
															palette: { mode: 'light' },
													  })
											}
										>
											<TableContainer component={StyledPaper}>
												<Table sx={{ minWidth: 600 }} aria-label="customized table">
													<TableHead>
														<TableRow>
															<StyledTableCell align="left">Thông số của máy</StyledTableCell>
															<StyledTableCell align="left">Xi lanh 2</StyledTableCell>
															<StyledTableCell align="left">Xi lanh 3</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{rows.map((row) => (
															<TableRow key={row.params}>
																<StyledTableCell align="left">{row.params}</StyledTableCell>
																<StyledTableCell align="left">{row.process2}</StyledTableCell>
																<StyledTableCell align="left">{row.process3}</StyledTableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
										</ThemeProvider>
									</div>
								</div>
							</div>
							<div className="col-5">
								<div className="card full-height">
									<div className="card__header">
										<h3>Trạng thái máy</h3>
										{ledRef}
									</div>
									<div className="card__body">
										<div className="card__body--flex">
											<img src={machineState} alt="Trang thai may" />
										</div>
									</div>
								</div>
							</div>
						</div>
						{active === 'active' ? (
							<>
								<div className="row">
									<div className="col-2">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Lực nhấn</h3>
													<p>Xi lanh 2</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
													}}
													series={[params.force2]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-2">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Số lần nhấn</h3>
													<p>Xi lanh 2</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
														labels: ['Times'],
													}}
													series={[params.numbs2]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-2">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Thời gian giữ</h3>
													<p>Xi lanh 2</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...velocityChartOptions.options,
														theme: { mode: 'light' },
													}}
													series={[params.time2]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-2">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Lực nhấn</h3>
													<p>Xi lanh 3</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
													}}
													series={[params.force3]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-2">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Số lần nhấn</h3>
													<p>Xi lanh 3</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
														labels: ['Times'],
													}}
													series={[params.numbs3]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-2">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Thời gian giữ</h3>
													<p>Xi lanh 3</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{ ...velocityChartOptions.options, theme: { mode: 'light' } }}
													series={[params.time3]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="row">
									<div className="col-4">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Lực nhấn</h3>
													<p>Xi lanh 2</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
													}}
													series={[params.force2]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Số lần nhấn</h3>
													<p>Xi lanh 2</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
														labels: ['Times'],
													}}
													series={[params.numbs2]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Thời gian giữ</h3>
													<p>Xi lanh 2</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{ ...velocityChartOptions.options, theme: { mode: 'light' } }}
													series={[params.time2]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-4">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Lực nhấn</h3>
													<p>Xi lanh 3</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
													}}
													series={[params.force3]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Số lần nhấn</h3>
													<p>Xi lanh 3</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{
														...radialBarOptions.options,
														theme: { mode: 'light' },
														labels: ['Times'],
													}}
													series={[params.numbs3]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="card full-height">
											<div className="card__header">
												<div>
													<h3>Thời gian giữ</h3>
													<p>Xi lanh 3</p>
												</div>
												{ledRef}
											</div>
											<div className="card__body">
												<Chart
													options={{ ...velocityChartOptions.options, theme: { mode: 'light' } }}
													series={[params.time3]}
													type="radialBar"
													height="auto"
												/>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
}

export default DeformationMonitorSystem2;
