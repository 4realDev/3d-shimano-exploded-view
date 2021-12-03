import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
// npm install @react-three/fiber
import { Suspense, useEffect, useRef, useState } from 'react';
import { roomList } from '../../../../data/roomData';
import { showAllRoomsFromAbove, showClickedRoom, useCameraStore } from '../../../../store/useCameraStore';
import { setMeshVisibility } from '../../../../store/useMeshStore';
import CameraControls from '../../../models/CameraControls';
import Model from '../../../models/Model';
import RoomPositionMarkers from '../../../models/RoomPositionMarkers';

const ModelCanvas = () => {
	const roomListModel = roomList.map((room) => room.model);
	const hasAnimation = useCameraStore((state) => state.hasAnimation);

	const [hoveredMesh, setHoveredMesh] = useState<null | string>(null);
	const [clickedMesh, setClickedMesh] = useState<null | string>(null);
	const [mouseDown, setMouseDown] = useState(false);
	const [idleState, setIdleState] = useState(true);

	const controlsRef = useRef<OrbitControlsProps>();
	const cameraRef = useRef<PerspectiveCameraProps>();

	useEffect(() => {
		if (clickedMesh) {
			if (clickedMesh === 'roof') {
				showAllRoomsFromAbove();
			} else {
				showClickedRoom(roomListModel, clickedMesh);
			}
			setMeshVisibility('roof', false);
		}
	}, [clickedMesh]);

	return (
		<div
			className='canvas-wrapper'
			onMouseDown={() => {
				setIdleState(false);
				setMouseDown(true);
			}}
			onMouseUp={() => setMouseDown(false)}
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
						markerPositions={roomListModel.map(({ camPos }) => camPos)}
						targetPoints={roomListModel.map(({ camTarget }) => camTarget)}
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
