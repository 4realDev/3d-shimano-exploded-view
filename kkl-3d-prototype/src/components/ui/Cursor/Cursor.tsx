const Cursor = () => {
	// NOTE: Limit of cursor size is 128×128px. Larger cursor images are ignored
	const cursor = `
		<svg width="128" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
			<rect
			rx='20'
			height='34'
			fill="rgba(255, 255, 255, 0.25)"
			stroke="#000"
			x='3'
			y='3'
			/>
		</svg>`;

	if (document.getElementById('canvas')) {
		document.getElementById('canvas')!!.style.cursor = `url('data:image/svg+xml;base64,${Buffer.from(cursor).toString(
			'base64'
		)}'), auto`;
	}

	return null;
};

export default Cursor;
