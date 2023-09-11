const HotspotActive = ({ ...props }) => {
	return (
		<svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<circle cx='11' cy='11' r='9.65' stroke='#5B5B5B' stroke-width='1.7' />
			<path
				d='M12.5 15.3C12.5 15.4105 12.4105 15.5 12.3 15.5H10.9547C10.8442 15.5 10.7547 15.4105 10.7547 15.3V9.48105C10.7547 9.30684 10.5445 9.21293 10.4076 9.32065C9.91789 9.70594 9.3687 10.0114 8.76005 10.2371C8.63264 10.2843 8.5 10.188 8.5 10.0522V8.91403C8.5 8.8272 8.5562 8.75084 8.63756 8.72051C9.05465 8.56497 9.50363 8.30375 9.98447 7.93682C10.4757 7.55821 10.8251 7.12273 11.0327 6.63036C11.0654 6.55288 11.1398 6.5 11.2239 6.5H12.3C12.4105 6.5 12.5 6.58954 12.5 6.7V15.3Z'
				fill='#5B5B5B'
			/>
		</svg>
	);
};

export default HotspotActive;
