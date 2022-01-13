const Chevron = ({ ...props }) => {
	return (
		<svg
			className={props.className}
			width={props.width}
			height={props.height}
			viewBox='0 0 16 11'
			fill={props.fill}
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M7.20352 10.0141L0.828516 3.63906C0.387891 3.19844 0.387891 2.48594 0.828516 2.05L1.88789 0.990625C2.32852 0.55 3.04102 0.55 3.47695 0.990625L7.9957 5.50938L12.5145 0.990625C12.9551 0.55 13.6676 0.55 14.1035 0.990625L15.1629 2.05C15.6035 2.49062 15.6035 3.20313 15.1629 3.63906L8.78789 10.0141C8.35664 10.4547 7.64414 10.4547 7.20352 10.0141V10.0141Z' />
		</svg>
	);
};

export default Chevron;
