import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
// npm install @react-three/fiber
import { Suspense, useEffect, useRef, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import * as THREE from 'three';
import { roomList } from '../../../../data/roomData';
import {
	setHasAnimationInStore,
	setSelectedMeshesInStore,
	showAllRoomsFromAbove,
	showClickedRoom,
} from '../../../../store/camera/cameraSlice';
import { setMeshListInStore, setMeshVisibility } from '../../../../store/mesh/meshSlice';
import { RootState, store } from '../../../../store/store';
import CameraControls from '../../../models/CameraControls';
import Model, { MeshObject } from '../../../models/Model';
import RoomPositionMarkers from '../../../models/RoomPositionMarkers';

const ModelCanvas = () => {
	const roomListModel = roomList.map((room) => room.model);

	const meshList = useSelector((state: RootState) => state.mesh.meshList);
	const selectedMeshes = useSelector((state: RootState) => state.camera.selectedMeshes);

	const cameraPosition = useSelector((state: RootState) => state.camera.cameraPosition);
	const cameraTarget = useSelector((state: RootState) => state.camera.cameraTarget);
	const hasAnimation = useSelector((state: RootState) => state.camera.hasAnimation);

	const dispatch = useDispatch();

	const setMeshList = (meshList: MeshObject[]) => {
		dispatch(setMeshListInStore(meshList));
	};

	const setSelectedMeshes = (selectedMeshes: string[]) => {
		dispatch(setSelectedMeshesInStore(selectedMeshes));
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
				dispatch(showAllRoomsFromAbove());
			} else {
				dispatch(showClickedRoom({ roomModels: roomListModel, clickedMesh: clickedMesh }));
			}
			dispatch(setMeshVisibility({ meshName: 'roof', visible: false }));
		}
	}, [clickedMesh]);

	return (
		<div
			className='canvas-wrapper'
			onMouseDown={() => {
				setIdleState(false);
				dispatch(setHasAnimationInStore(false));
				setMouseDown(true);
			}}
			onMouseUp={() => setMouseDown(false)}
		>
			<Provider store={store}>
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
			</Provider>
		</div>
	);
};

export default ModelCanvas;
