import React, { useEffect, useState } from 'react';

import ButtonGroup from '../../components/buttongroup/ButtonGroup';

import CircularProgress from '../../components/circularprogress/CircularProgress';

function DeformationMonitor() {
	const [value, setValue] = useState(74);
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setValue((prev) => prev + 1);
	// 	}, 1000);
	// 	return () => clearInterval(interval);
	// }, []);
	return (
		<>
			<div className="row">
				<div className="col-6">
					<div className="row">
						<div className="col-6">
							<div className="card">
								<div className="card__header">
									<h3>Data 1</h3>
								</div>
								<div className="card__body">
									<CircularProgress score={value}></CircularProgress>
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="card">
								<div className="card__header">
									<h3>Data 2</h3>
								</div>
								<div className="card__body">Data 2 goes here</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-6">
					<div className="row">
						<div className="col-6">
							<div className="card">
								<div className="card__header">
									<h3>Data 3</h3>
								</div>
								<div className="card__body">Data 3 goes here</div>
							</div>
						</div>
						<div className="col-6">
							<div className="card">
								<div className="card__header">
									<h3>Data 4</h3>
								</div>
								<div className="card__body">Data 4 goes here</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>Crucial Data</h3>
						</div>
						<div className="card__body">Very very crucial data</div>
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
