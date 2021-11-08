import './App.css';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Suspense } from 'react';
import Model from './components/models/Model';
import CameraControls from './components/models/CameraControls';
import RoomPositionMarkers from './components/models/RoomPositionMarkers';

function App() {
	const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
	const defaultCameraFocusPosition = new THREE.Vector3(0, 0, 0);
	const camHeightOffset = 10;

	// The 'roomList' array makes the dependencies of useEffect Hook (at line 86) change on every render.
	// To fix this, wrap the initialization of 'roomList' in its own useMemo() Hook.eslintreact-hooks/exhaustive-deps
	const roomList = useMemo(
		() => [
			{
				name: 'room_1',
				camPos: new THREE.Vector3(-3.8, -0.5 + camHeightOffset, 4),
				camTarget: new THREE.Vector3(-3.8, -0.5, 4),
			},
			{
				name: 'room_2',
				camPos: new THREE.Vector3(-3.8, -0.5 + camHeightOffset, 0),
				camTarget: new THREE.Vector3(-3.8, -0.5, 0),
			},
			{
				name: 'room_3',
				camPos: new THREE.Vector3(-3.8, -0.5 + camHeightOffset, -4),
				camTarget: new THREE.Vector3(-3.8, -0.5, -4),
			},
			{
				name: 'room_4',
				camPos: new THREE.Vector3(0.4, -0.5 + camHeightOffset, 4),
				camTarget: new THREE.Vector3(0.4, -0.5, 4),
			},
			{
				name: 'room_5',
				camPos: new THREE.Vector3(0.4, -0.5 + camHeightOffset, 0),
				camTarget: new THREE.Vector3(0.4, -0.5, 0),
			},
			{
				name: 'room_6',
				camPos: new THREE.Vector3(0.4, -0.5 + camHeightOffset, -4),
				camTarget: new THREE.Vector3(0.4, -0.5, -4),
			},
			{
				name: 'room_7',
				camPos: new THREE.Vector3(3.9, -0.5 + camHeightOffset, -4),
				camTarget: new THREE.Vector3(3.9, -0.5, -4),
			},
		],
		[]
	);

	const [meshList, setMeshList] = useState([]);
	const [hoveredMesh, setHoveredMesh] = useState(null);
	const [clickedMesh, setClickedMesh] = useState(null);
	const [selectedMeshes, setSelectedMeshes] = useState([]);
	const [invisibleMesh, setInvisibleMesh] = useState(null);
	const [cameraPosition, setCameraPosition] = useState(defaultCameraPosition);
	const [cameraTarget, setCameraTarget] = useState(defaultCameraFocusPosition);
	const [hasAnimation, setHasAnimation] = useState(false);
	const [mouseDown, setMouseDown] = useState(false);
	const [idleState, setIdleState] = useState(true);

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
				const clickedRoom = roomList.find((room) => {
					if (room.name === clickedMesh) return room;
				});
				if (typeof clickedRoom != 'undefined') {
					setCameraPosition(clickedRoom.camPos);
					setCameraTarget(clickedRoom.camTarget);
					setSelectedMeshes(clickedRoom.name);
				}
				setInvisibleMesh('roof');
			}
		}
	}, [clickedMesh, roomList]);

	const controlsRef = useRef();
	const cameraRef = useRef();

	return (
		<div className='container' style={{ backgroundImage: `url(${'/images/waves.png'})` }}>
			<div className='inner-container'>
				<div className='card-container'>
					<div className='card'>
						<div
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
						</div>
						{/* <div className='card-heading'>
					<h1>{clickedMesh ? clickedMesh.replace('_', ' ') : ''}</h1>
				</div> */}

						{/* <div className='product-button-container'> */}
						{/* {meshList.map((mesh) => {
						return (
							<button
								className='product-button'
								onClick={() => {
									setSelectedMesh(mesh.name);
									mesh.name.startsWith('room') && setInvisibleMesh('roof');
								}}
							>
								{mesh.name.replace('_', ' ')}
							</button>
						);
					})} */}
						<button
							className={`product-button ${selectedMeshes.includes('room_1') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setSelectedMeshes('room_1');
								setInvisibleMesh('roof');
								setCameraPosition(roomList[0].camPos);
								setCameraTarget(roomList[0].camTarget);
							}}
						>
							ROOM 1
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_2') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setSelectedMeshes('room_2');
								setInvisibleMesh('roof');
								setCameraPosition(roomList[1].camPos);
								setCameraTarget(roomList[1].camTarget);
							}}
						>
							ROOM 2
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_3') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setSelectedMeshes('room_3');
								setInvisibleMesh('roof');
								setCameraPosition(roomList[2].camPos);
								setCameraTarget(roomList[2].camTarget);
							}}
						>
							ROOM 3
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_4') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setSelectedMeshes('room_4');
								setInvisibleMesh('roof');
								setCameraPosition(roomList[3].camPos);
								setCameraTarget(roomList[3].camTarget);
							}}
						>
							ROOM 4
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_5') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setSelectedMeshes('room_5');
								setInvisibleMesh('roof');
								setCameraPosition(roomList[4].camPos);
								setCameraTarget(roomList[4].camTarget);
							}}
						>
							ROOM 5
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_6') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setSelectedMeshes('room_6');
								setInvisibleMesh('roof');
								setCameraPosition(roomList[5].camPos);
								setCameraTarget(roomList[5].camTarget);
							}}
						>
							ROOM 6
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_7') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setHasAnimation(true);
								setSelectedMeshes('room_7');
								setInvisibleMesh('roof');
								setCameraPosition(roomList[6].camPos);
								setCameraTarget(roomList[6].camTarget);
							}}
						>
							ROOM 7
						</button>
						<button
							className='product-button'
							onClick={() => {
								setHasAnimation(true);
								setCameraPosition(controlsRef.current.position0);
								setCameraTarget(controlsRef.current.target0);
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
								setSelectedMeshes(roomList.map((room) => room.name));
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
						selectedMeshes={selectedMeshes}
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
							markerPositions={roomList.map(({ camPos }) => camPos)}
							targetPoints={roomList.map(({ camTarget }) => camTarget)}
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
