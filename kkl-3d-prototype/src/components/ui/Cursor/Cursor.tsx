import { useCameraStore } from '../../../store/useCameraStore';
import { getRoomTitleByMeshName } from '../../../utils/room';

const Cursor = () => {
	const hoveredMesh = useCameraStore((state) => state.hoveredMesh);
	const hoveredRoomName = hoveredMesh && getRoomTitleByMeshName(hoveredMesh);
	// ASSUMPTION: char width ~ 6px | margin-right ~ 30px
	const rectWidth = hoveredRoomName ? hoveredRoomName.length * 6 + 30 : 0;
	const fontSize = rectWidth > 128 ? 10 : 12;

	// NOTE: Limit of cursor size is 128×128px. Larger cursor images are ignored
	const cursor = `
		<svg width="128" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
			<rect
			rx='20'
			width='${rectWidth}'
			height='34'
			fill="rgba(255, 255, 255, 0.25)"
			stroke="#000"
			x='3'
			y='3'
			/>
			<text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="${fontSize}" font-weight="600">
				<tspan x="15" y="24">${hoveredRoomName ? hoveredRoomName : ''}</tspan>
			</text>
		</svg>`;

	if (document.getElementById('canvas')) {
		document.getElementById('canvas')!!.style.cursor = `url('data:image/svg+xml;base64,${Buffer.from(cursor).toString(
			'base64'
		)}'), auto`;
	}

	return null;
};

export default Cursor;
