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
	const { score } = props;
	const calcColor = (percent, start, end) => {
		let a = percent / 100,
			b = (end - start) * a,
			c = b + start;

		// return an CSS hsl color string
		return 'hsl(' + c + ', 100%, 50%)';
	};
	return (
		<ReviewsProvider valueStart={0} valueEnd={score}>
			{(value) => (
				<CircularProgressbarWithChildren
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
							stroke: calcColor(value, 0, 120),
							transition: 'stroke-dashoffset 0.5s ease 0s',
						},
					}}
				>
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
