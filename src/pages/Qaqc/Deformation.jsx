import React, { useEffect, useState } from 'react';

import ButtonGroup from '../../components/buttongroup/ButtonGroup';

import auto from '../../assets/images/auto.PNG';

import manual from '../../assets/images/manual.PNG';

import emergency from '../../assets/images/stop.PNG';

import led from '../../assets/images/led.png';

import { useSelector } from 'react-redux';

import Chart from 'react-apexcharts';

var velocityChartOptions = {
	series: [70],
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
						fontSize: '16px',
						color: undefined,
						offsetY: 120,
					},
					value: {
						offsetY: 76,
						fontSize: '22px',
						color: '#000',
						fontWeight: 'bold',
						formatter: function (val) {
							return val + '%';
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
		labels: ['Median Ratio'],
	},
};

var radialBarOptions = {
	series: [75],
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
					background: '#293450',
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
						blur: 4,
						opacity: 0.35,
					},
				},

				dataLabels: {
					show: true,
					name: {
						offsetY: -10,
						show: true,
						color: '#888',
						fontSize: '17px',
					},
					value: {
						formatter: function (val) {
							return parseInt(val);
						},
						color: '#fff',
						fontSize: '20px',
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
		labels: ['Percent'],
	},
};

const state = {
	auto,
	manual,
	emergency,
};
function DeformationMonitor() {
	const [value, setValue] = useState(0);
	const [value1, setValue1] = useState(45);
	const [value2, setValue2] = useState(3178);
	const [machineState, setMachineState] = useState(state.auto);
	const [isShowLed, setIsShowLed] = useState(true);
	const sideBarReducer = useSelector((state) => state.sidebar);
	const active = sideBarReducer.active;
	const ledRef = isShowLed && <img src={led} alt="led" className={active} />;

	useEffect(() => {
		const ledInterval = setInterval(() => {
			setIsShowLed((prev) => !prev);
		}, 800);
		const interval = setInterval(() => {
			setValue((prev) => prev + 1);
		}, 1000);
		const interval1 = setInterval(() => {
			setValue1((prev) => prev + 1);
		}, 1000);
		const interval2 = setInterval(() => {
			setValue2((prev) => prev + 200);
		}, 1000);
		return () => {
			clearInterval(interval);
			clearInterval(interval1);
			clearInterval(interval2);
			clearInterval(ledInterval);
		};
	}, []);
	return (
		<>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>Thông số cài đặt</h3>
						</div>
						<div className="card__body">Something here</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-6 ">
					<div className="row full-height">
						<div className="col-6">
							<div className="card full-height">
								<div className="card__header">
									<h3>Lực nhấn</h3>
									{ledRef}
								</div>
								<div className="card__body">
									{/* <CircularProgress start={0} end={100} score={value}>
										<img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
									</CircularProgress> */}
									<Chart
										options={{
											...radialBarOptions.options,
											theme: { mode: 'light' },
										}}
										series={radialBarOptions.series}
										type="radialBar"
										height="auto"
									/>
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="card full-height">
								<div className="card__header">
									<h3>Số lần nhấn</h3>
									{ledRef}
								</div>
								<div className="card__body">
									{/* <CircularProgress start={0} end={120} score={value1}>
										<img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
									</CircularProgress> */}
									<Chart
										options={{
											...radialBarOptions.options,
											theme: { mode: 'light' },
										}}
										series={[30]}
										type="radialBar"
										height="auto"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-6">
					<div className="row ">
						<div className="col-6 ">
							<div className="card full-height">
								<div className="card__header">
									<h3>Thời gian giữ</h3>
									{ledRef}
								</div>
								<div className="card__body">
									{/* <CircularProgress score={value2} start={0} end={5000}>
										<img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
									</CircularProgress> */}
									<Chart
										options={{ ...velocityChartOptions.options, theme: { mode: 'light' } }}
										series={velocityChartOptions.series}
										type="radialBar"
										height="auto"
									/>
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="card full-height">
								<div className="card__header">
									<h3>Trạng thái máy</h3>
									{ledRef}
								</div>
								<div className="card__body">
									<img src={machineState} alt="Trang thai may" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function Deformation() {
	// const themeReducer = useSelector(state => state.theme);
	const [alignment, setAlignment] = useState('monitor');
	useEffect(() => {
		document.title = 'Deformation | SCADA';
	}, []);
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	return (
		<div>
			<h2 className="page-header">Deformation</h2>
			<div>
				<ButtonGroup alignment={alignment} handleChange={handleChange} />
				{alignment === 'report' && <div>Report goes here</div>}
				{alignment === 'monitor' && <DeformationMonitor />}
			</div>
		</div>
	);
}

export default Deformation;
