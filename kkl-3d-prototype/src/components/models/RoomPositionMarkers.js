import React from 'react';

const RoomPositionMarkers = () => {
	const roomPositionMarkers = [
		[-3.8, -0.5, 4], // Room 1
		[-3.8, -0.5, 0], // Room 2
		[-3.8, -0.5, -4], // Room 3
		[0.4, -0.5, 4], // Room 4
		[0.4, -0.5, 0], // Room 5
		[0.4, -0.5, -4], // Room 6
		[3.9, -0.5, -4], // Room 7
	];

	const renderRoomPositionMarkers = () => {
		return roomPositionMarkers.map((markerPos) => {
			return (
				<>
					<mesh position={markerPos} scale={1}>
						<boxGeometry />
						<meshStandardMaterial />
					</mesh>
				</>
			);
		});
	};

	return renderRoomPositionMarkers();
};

export default RoomPositionMarkers;
