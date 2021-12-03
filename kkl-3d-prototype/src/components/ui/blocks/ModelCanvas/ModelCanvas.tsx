import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
// npm install @react-three/fiber
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { roomList } from '../../../../data/roomData';
import {
	setHasAnimationInStore,
	setSelectedMeshesInStore,
	showAllRoomsFromAbove,
	showClickedRoom,
	useCameraStore,
} from '../../../../store/useCameraStore';
import { setMeshListInStore, setMeshVisibility, useMeshStore } from '../../../../store/useMeshStore';
import CameraControls from '../../../models/CameraControls';
import Model, { MeshObject } from '../../../models/Model';
import RoomPositionMarkers from '../../../models/RoomPositionMarkers';

const ModelCanvas = () => {
	const roomListModel = roomList.map((room) => room.model);

	const meshList = useMeshStore((state) => state.meshList);
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);
	const cameraPosition = useCameraStore((state) => state.cameraPosition);
	const cameraTarget = useCameraStore((state) => state.cameraTarget);
	const hasAnimation = useCameraStore((state) => state.hasAnimation);
	console.log(selectedMeshes, cameraPosition, cameraTarget);

	const setMeshList = (meshList: MeshObject[]) => {
		setMeshListInStore(meshList);
	};

	const setSelectedMeshes = (selectedMeshes: string[]) => {
		setSelectedMeshesInStore(selectedMeshes);
	};

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
				setHasAnimationInStore(false);
				setMouseDown(true);
			}}
			onMouseUp={() => setMouseDown(false)}
		>
			<Canvas>
				<CameraControls
					camera={cameraRef}
					controls={controlsRef}
					cameraPosition={cameraPosition}
					cameraTarget={cameraTarget}
					controlsIdleState={idleState}
					hasAnimation={hasAnimation}
					mouseDown={mouseDown}
					fov={45}
					far={200}
				/>

				{/* create Loader UI as fallback before useLoader promise is returned */}
				<Suspense fallback={null}>
					<Model
						meshList={meshList}
						setMeshList={setMeshList}
						hoveredMesh={hoveredMesh}
						setHoveredMesh={setHoveredMesh}
						clickedMesh={clickedMesh}
						setClickedMesh={setClickedMesh}
						selectedMeshes={selectedMeshes}
						setSelectedMeshes={setSelectedMeshes}
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
