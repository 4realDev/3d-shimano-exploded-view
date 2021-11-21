import { useRef, useState, useEffect, createRef, Suspense } from 'react';
import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
import * as THREE from 'three';

import './App.css';
import Model, { MeshObject } from './components/models/Model';
import CameraControls from './components/models/CameraControls';
import RoomPositionMarkers from './components/models/RoomPositionMarkers';
import Accordion from './components/ui/Accordion/Accordion';
import roomList from './common/roomData';

function App() {
	const camHeightOffset = 15;
	const roomListInfo = roomList.map((room) => room.card);
	const roomListModel = roomList.map((room) => room.model);

	const refs = roomListInfo.reduce((acc: any, value) => {
		acc[value.id] = createRef();
		return acc;
	}, {});

	const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
	const defaultCameraFocusPosition = new THREE.Vector3(0, 0, 0);

	const [meshList, setMeshList] = useState<MeshObject[]>([]);
	const [hoveredMesh, setHoveredMesh] = useState<null | string>(null);
	const [clickedMesh, setClickedMesh] = useState<null | string>(null);
	const [selectedMeshes, setSelectedMeshes] = useState<string[]>([]);
	const [invisibleMesh, setInvisibleMesh] = useState<null | string>(null);
	const [cameraPosition, setCameraPosition] = useState(defaultCameraPosition);
	const [cameraTarget, setCameraTarget] = useState(defaultCameraFocusPosition);
	const [hasAnimation, setHasAnimation] = useState(false);
	const [mouseDown, setMouseDown] = useState(false);
	const [idleState, setIdleState] = useState(true);
	const controlsRef = useRef<OrbitControlsProps>();
	const cameraRef = useRef<PerspectiveCameraProps>();

	const onClick = (id: number) => {
		setIdleState(false);
		setHasAnimation(true);
		setSelectedMeshes([`room_${id}`]);
		setInvisibleMesh('roof');
		setCameraPosition(roomListModel[id - 1].camPos);
		setCameraTarget(roomListModel[id - 1].camTarget);
	};

	const executeScroll = (id: number) => {
		if (refs && refs.current) {
			// myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			refs[id].current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	useEffect(() => {
		if (clickedMesh) {
			if (clickedMesh === 'roof') {
				setIdleState(false);
				setHasAnimation(true);
				setInvisibleMesh('roof');
				setCameraPosition(new THREE.Vector3(0, 25, 2));
			} else {
				setIdleState(false);
				setHasAnimation(true);
				const clickedRoom = roomListModel.find((room) => {
					if (room.meshName === clickedMesh) return room;
				});
				if (typeof clickedRoom != 'undefined') {
					setCameraPosition(clickedRoom.camPos);
					setCameraTarget(clickedRoom.camTarget);
					setSelectedMeshes([clickedRoom.meshName]);
				}
				setInvisibleMesh('roof');
			}
		}
	}, [clickedMesh]);

	return (
		<div className='container' /*style={{ backgroundImage: `url(${'/images/waves.png'})` }}*/>
			<div className='inner-container'>
				<div className='card-container'>
					<div className='card'>
						{/* <div
							style={{
								overflowWrap: 'break-word',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'flex-start',
								width: 100 + '%',
							}}
						>
							<h1>Wähle einen Hauptraum</h1>
							<p style={{ lineHeight: 0 }}>hovered: {hoveredMesh ? hoveredMesh : ''}</p>
							<p style={{ lineHeight: 0 }}>clicked: {clickedMesh ? clickedMesh : ''}</p>
							<p style={{ lineHeight: 0, marginBottom: 50 }}>selected: {selectedMeshes ? selectedMeshes : ''}</p>
						</div> */}

						<Accordion
							roomInfo={roomListInfo}
							selectedMeshes={selectedMeshes}
							onClick={onClick}
							executeScroll={executeScroll}
							refs={refs}
						/>
						<button
							className='product-button'
							onClick={() => {
								setHasAnimation(true);
								setCameraPosition(
									controlsRef.current !== undefined ? controlsRef.current.position0! : defaultCameraPosition
								);
								setCameraTarget(
									controlsRef.current !== undefined ? controlsRef.current.target0! : defaultCameraFocusPosition
								);
								setSelectedMeshes([]);
								setInvisibleMesh(null);

								// TODO: Figure out better way to deactivate hasAnimation
								// after the position as damped to the defaultCameraPosition
								// setTimeout(() => {
								// 	setIdleState(true);
								// 	setHasAnimation(false);
								// }, 2250);
							}}
						>
							RESET
						</button>
						<button
							className='product-button'
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setInvisibleMesh('roof');
								setSelectedMeshes(roomListModel.map((room) => room.meshName));
								setCameraPosition(new THREE.Vector3(0, 25 + camHeightOffset, 2));
								setCameraTarget(defaultCameraFocusPosition);
							}}
						>
							SHOW ALL ROOMS
						</button>
					</div>
				</div>
				{/* </div> */}
			</div>
			<div
				className='canvas-wrapper'
				onMouseDown={() => {
					setIdleState(false);
					// setHasAnimation(false);
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
							invisibleMesh={invisibleMesh}
							setInvisibleMesh={setInvisibleMesh}
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
		</div>
	);
}

export default App;
