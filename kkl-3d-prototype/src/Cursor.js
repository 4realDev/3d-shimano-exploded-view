// Best Source for react: https://medium.com/@jaredloson/custom-javascript-cursor-in-react-d7ffefb2db38
// https://dev.to/astrit/pure-css-svg-text-cursor-4fka
// https://codepen.io/clementGir/pen/RQqvQx
// https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/
// https://www.youtube.com/watch?v=uprZMdVl-aQ&t=47s

// some trial and errors

// <path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
// <rect
// 	rx='20'
// 	width='100'
// 	height='40'
// 	fill='black'
// 	x='5'
// 	y='5'
// />
// useEffect(() => {
// 	const cursor = `
// 		<svg
// 			width="100"
// 			height="30"
// 			fill="none"
// 			xmlns="http://www.w3.org/2000/svg">
// 			<circle cx="5" cy="5" r="3" stroke="black" stroke-width="3" fill="black" />
// 			<text
// 				x='50%'
// 				y='6'
// 				font-family='sans-serif'
// 				font-weight='bold'
// 				font-size='14'
// 				dominant-baseline='middle'
// 				text-anchor='middle'
// 				fill='black'
// 			>
// 				${hoveredMesh}
// 			</text>
// 		</svg>`;
// 	const auto = `
// 	<svg
// 		width="100"
// 		height="30"
// 		fill="none"
// 		xmlns="http://www.w3.org/2000/svg">
// 		<circle cx="5" cy="5" r="3" stroke="black" stroke-width="3" fill="black" />
// 		<text
// 			x='50%'
// 			y='6'
// 			font-family='sans-serif'
// 			font-weight='bold'
// 			font-size='14'
// 			dominant-baseline='middle'
// 			text-anchor='middle'
// 			fill='black'
// 		>
// 			${hoveredMesh === null && ''}
// 		</text>
// 	</svg>`;
// 	document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hoveredMesh ? cursor : auto)}'), auto`;
// });

// TODO: Add cursor with current hovered on mesh
// useEffect(() => {
// 	// const hoveredMeshIndex = meshList.findIndex(hoveredMesh);
// 	const cursor = `
// 	<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
// 		<g clip-path="url(#clip0)">
// 			<path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/>
// 			<g filter="url(#filter0_d)">
// 				<path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="transparent"/>
// 			</g>
// 			<path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
// 			<text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em">
// 				<tspan x="35" y="63">${hoveredMesh}</tspan>
// 			</text>
// 		</g>
// 		<defs>
// 			<clipPath id="clip0">
// 				<path fill="#fff" d="M0 0h64v64H0z"/>
// 			</clipPath>
// 			<filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/>
// 				<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
// 				<feOffset dy="2"/>
// 					<feGaussianBlur stdDeviation="3"/>
// 				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
// 				<feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
// 				<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
// 			</filter>
// 		</defs>
// 	</svg>`;
// 	const auto = `
// 	<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
// 		<path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/>
// 		<path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
// 	</svg>`;
// 	document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hoveredMesh ? cursor : auto)}'), auto`;
// }, [hoveredMesh]);

// <circle cx="50" cy="50" r="50"/>
// <circle cx="25" cy="25" r="20" stroke="black" stroke-width="3" fill="black" />
// <rect width="80" height="40" style="fill: black; stroke-width: 1; stroke: rgb(0,0,0); rx:15" />
// <rect x="120" width="100" height="100" rx="15" stroke="black" stroke-width="3" fill="black"/>
