import { Line } from '@react-three/drei';

type RoomPositionMarkersProps = {
	markerPositions: THREE.Vector3[];
	targetPoints: THREE.Vector3[];
};

const RoomPositionMarkers = ({ markerPositions, targetPoints }: RoomPositionMarkersProps) => {
	const renderRoomPositionMarkers = () => {
		return markerPositions.map((markerPos) => {
			return (
				<mesh position={markerPos} scale={0.5}>
					<boxGeometry />
					<meshStandardMaterial />
				</mesh>
			);
		});
	};

	const renderTargetPoints = () => {
		return targetPoints.map((targetPoint) => {
			return (
				<mesh position={targetPoint} scale={0.25}>
					<sphereGeometry />
					<meshStandardMaterial color='red' />
				</mesh>
			);
		});
	};

	const renderLinesFromCamPosToTargetPoints = () => {
		const startPoints: THREE.Vector3[] = [];
		const endPoints: THREE.Vector3[] = [];
		targetPoints.forEach((targetPoint) => {
			endPoints.push(targetPoint);
		});
		markerPositions.forEach((markerPos) => {
			startPoints.push(markerPos);
		});
		return startPoints.map((x, i) => {
			return <Line points={[startPoints[i], endPoints[i]]} color='black' lineWidth={1} />;
		});
	};

	return (
		<>
			{renderRoomPositionMarkers()}
			{renderTargetPoints()}
			{renderLinesFromCamPosToTargetPoints()}
		</>
	);
};

export default RoomPositionMarkers;
