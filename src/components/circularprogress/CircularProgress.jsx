import React, { useState, useEffect } from 'react';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const ReviewsProvider = ({ valueStart, valueEnd, children }) => {
	const [value, setValue] = useState(valueStart);
	useEffect(() => {
		setValue(valueEnd);
	}, [valueEnd]);

	return children(value);
};

function CircularProgress(props) {
	const { score, start, end } = props;
	const calcColor = (percent, start, end) => {
		let a = percent / (end - start),
			c = a * 200;
		// return an CSS hsl color string
		return 'hsl(' + c + ', 100%, 50%)';
	};
	return (
		<ReviewsProvider valueStart={start} valueEnd={score}>
			{(value) => (
				<CircularProgressbarWithChildren
					min={start}
					maxValue={end}
					strokeWidth={10}
					value={value}
					circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
					styles={{
						trail: {
							stroke: '#FFF',
							strokeLinecap: 'round',
							transform: 'rotate(-126deg)',
							transformOrigin: 'center center',
						},
						path: {
							strokeLinecap: 'round',
							transform: 'rotate(-126deg)',
							transformOrigin: 'center center',
							stroke: calcColor(value, start, end),
							transition: 'stroke-dashoffset 0.5s ease 0s, color 1s ease 0s',
						},
					}}
				>
					{props.children}
					<strong
						style={{
							fontSize: 40,
							color: 'var(--txt-color)',
						}}
					>{`${value}`}</strong>
				</CircularProgressbarWithChildren>
			)}
		</ReviewsProvider>
	);
}

export default CircularProgress;
