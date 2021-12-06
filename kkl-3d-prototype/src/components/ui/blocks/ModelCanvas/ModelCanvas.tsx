import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
// npm install @react-three/fiber
import { Suspense, useEffect, useRef, useState } from 'react';
import { roomModelList } from '../../../../data/roomData';
import {
	setHasAnimation,
	showAllRoomsFromAbove,
	showClickedRoom,
	useCameraStore,
} from '../../../../store/useCameraStore';
import CameraControls from '../../../models/CameraControls';
import Model from '../../../models/Model';
import RoomPositionMarkers from '../../../models/RoomPositionMarkers';

const ModelCanvas = () => {
	const hasAnimation = useCameraStore((state) => state.hasAnimation);

	const [hoveredMesh, setHoveredMesh] = useState<null | string>(null);
	const [clickedMesh, setClickedMesh] = useState<null | string>(null);
	const [mouseDown, setMouseDown] = useState(false);
	const [idleState, setIdleState] = useState(true);

	const controlsRef = useRef<OrbitControlsProps>();
	const cameraRef = useRef<PerspectiveCameraProps>();

	useEffect(() => {
		if (clickedMesh) {
			clickedMesh === 'roof' ? showAllRoomsFromAbove() : showClickedRoom(clickedMesh);
		}
	}, [clickedMesh]);

	return (
		<div
			className='canvas-wrapper'
			onMouseDown={() => {
				setIdleState(false);
				setHasAnimation(false);
				setMouseDown(true);
			}}
			onMouseUp={() => {
				setMouseDown(false);
				setHasAnimation(true);
			}}
		>
			<Canvas>
				<CameraControls
					camera={cameraRef}
					controls={controlsRef}
					controlsIdleState={idleState}
					hasAnimation={hasAnimation}
					mouseDown={mouseDown}
					fov={45}
					far={200}
				/>

				{/* create Loader UI as fallback before useLoader promise is returned */}
				<Suspense fallback={null}>
					<Model
						hoveredMesh={hoveredMesh}
						setHoveredMesh={setHoveredMesh}
						clickedMesh={clickedMesh}
						setClickedMesh={setClickedMesh}
					/>
					<RoomPositionMarkers
						markerPositions={roomModelList.map(({ camPos }) => camPos)}
						targetPoints={roomModelList.map(({ camTarget }) => camTarget)}
					/>
				</Suspense>
				<Stats />
				{/* <gridHelper /> */}
				{/* <axesHelper /> */}
			</Canvas>
		</div>
	);
};

export default ModelCanvas;
