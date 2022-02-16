import React from 'react';

const CheckMark = ({ ...props }) => {
	return (
		<svg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M11.3661 0.234315C11.6785 0.546734 11.6785 1.05327 11.3661 1.36569L4.96608 7.76569C4.65366 8.0781 4.14713 8.0781 3.83471 7.76569L0.634705 4.56569C0.322286 4.25327 0.322286 3.74673 0.634705 3.43431C0.947125 3.1219 1.45366 3.1219 1.76608 3.43431L4.40039 6.06863L10.2347 0.234315C10.5471 -0.0781049 11.0537 -0.0781049 11.3661 0.234315Z'
				fill={props.fill}
			/>
		</svg>
	);
};

export default CheckMark;
