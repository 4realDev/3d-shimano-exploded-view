import { Line } from '@react-three/drei';

type RoomPositionMarkersProps = {
	markerPositions: THREE.Vector3[];
	targetPoints: THREE.Vector3[];
	camPosColor?: string;
	camTargetColor?: string;
};

const CameraPositionMarkers = ({
	markerPositions,
	targetPoints,
	camPosColor = 'black',
	camTargetColor = 'red',
}: RoomPositionMarkersProps) => {
	const renderCameraPositionMarkers = () => {
		return markerPositions.map((markerPos, index) => {
			return (
				<mesh key={index} position={markerPos} scale={0.5}>
					<boxGeometry />
					<meshStandardMaterial color={camPosColor} />
				</mesh>
			);
		});
	};

	const renderTargetPoints = () => {
		return targetPoints.map((targetPoint, index) => {
			return (
				<mesh key={index} position={targetPoint} scale={0.25}>
					<sphereGeometry />
					<meshStandardMaterial color={camTargetColor} />
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
		return startPoints.map((_x, index) => {
			return <Line key={index} points={[startPoints[index], endPoints[index]]} color='black' lineWidth={1} />;
		});
	};

	return (
		<>
			{renderCameraPositionMarkers()}
			{renderTargetPoints()}
			{renderLinesFromCamPosToTargetPoints()}
		</>
	);
};

export default CameraPositionMarkers;
