import './App.css';
import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Suspense } from 'react';
import Model from './components/models/Model';
import CameraControls from './components/models/CameraControls';
import RoomPositionMarkers from './components/models/RoomPositionMarkers';

function App() {
	const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
	const defaultCameraFocusPosition = new THREE.Vector3(0, 0, 0);
	const camHeightOffset = 8;

	const roomList = [
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
	];

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
	}, [clickedMesh]);

	const controlsRef = useRef();
	const cameraRef = useRef();

	// TODO: Add cursor with current hovered on mesh
	// useEffect(() => {
	// 	// const hoveredMeshIndex = meshList.findIndex(hoveredMesh);
	// 	// console.log(meshList[hoveredMeshIndex]);
	// 	const cursor = `
	// 	<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 		<g clip-path="url(#clip0)">
	// 			<path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/>
	// 			<g filter="url(#filter0_d)">
	// 				<path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="transparent"/>
	// 			</g>
	// 			<path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
	// 			<text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em">
	// 				<tspan x="35" y="63">${hoveredMesh}</tspan>
	// 			</text>
	// 		</g>
	// 		<defs>
	// 			<clipPath id="clip0">
	// 				<path fill="#fff" d="M0 0h64v64H0z"/>
	// 			</clipPath>
	// 			<filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/>
	// 				<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
	// 				<feOffset dy="2"/>
	// 					<feGaussianBlur stdDeviation="3"/>
	// 				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
	// 				<feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
	// 				<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
	// 			</filter>
	// 		</defs>
	// 	</svg>`;
	// 	const auto = `
	// 	<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 		<path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/>
	// 		<path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/>
	// 	</svg>`;
	// 	document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hoveredMesh ? cursor : auto)}'), auto`;
	// }, [hoveredMesh]);

	// <circle cx="50" cy="50" r="50"/>
	// <circle cx="25" cy="25" r="20" stroke="black" stroke-width="3" fill="black" />
	// <rect width="80" height="40" style="fill: black; stroke-width: 1; stroke: rgb(0,0,0); rx:15" />
	// <rect x="120" width="100" height="100" rx="15" stroke="black" stroke-width="3" fill="black"/>

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

								// TODO: Figure out how to deactivate hasAnimation after the position as damped to the defaultCameraPosition
								// setTimeout(() => {
								// 	setIdleState(true);
								// 	setHasAnimation(false);
								// }, 2000);
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
						<RoomPositionMarkers />
					</Suspense>
				</Canvas>
			</div>
		</div>
	);
}

export default App;
