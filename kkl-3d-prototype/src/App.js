import './App.css';
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './components/models/Model';
import Camera from './components/models/Camera';

function App() {
	const roomList = ['room_1', 'room_2', 'room_3', 'room_4', 'room_5', 'room_6', 'room_7'];

	const ref = useRef(); // Does not work yet
	const defaultCameraPosition = [20, 15, 0];
	const defaultCameraRotation = [0, 0, 0];

	const [meshList, setMeshList] = useState([]);
	const [hoveredMesh, setHoveredMesh] = useState(null);
	const [clickedMesh, setClickedMesh] = useState(null);
	const [selectedMeshes, setSelectedMeshes] = useState([]);
	const [invisibleMesh, setInvisibleMesh] = useState(null);
	const [cameraPosition, setCameraPosition] = useState(defaultCameraPosition);
	const [cameraRotation, setCameraRotation] = useState(defaultCameraRotation);
	const [cameraAnimation, setCameraAnimation] = useState(false);
	const [mouseDown, setMouseDown] = useState(false);
	const [idleState, setIdleState] = useState(true);

	useEffect(() => {
		if (clickedMesh) {
			if (clickedMesh === 'roof') {
				setIdleState(false);
				setCameraAnimation(true);
				setInvisibleMesh('roof');
				setCameraPosition([0, 25, 2]);
			} else {
				setIdleState(false);
				setCameraAnimation(true);
				setCameraPosition([0, 25, 2]);
				setSelectedMeshes(clickedMesh);
				setInvisibleMesh('roof');
			}
		}
	}, [clickedMesh]);

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
		<div className='container'>
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
								setCameraAnimation(true);
								setSelectedMeshes('room_1');
								setInvisibleMesh('roof');
								setCameraPosition([0, 25, 2]);
							}}
						>
							ROOM 1
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_2') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setCameraAnimation(true);
								setSelectedMeshes('room_2');
								setInvisibleMesh('roof');
								setCameraPosition([0, 25, 2]);
							}}
						>
							ROOM 2
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_3') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setCameraAnimation(true);
								setSelectedMeshes('room_3');
								setInvisibleMesh('roof');
								setCameraPosition([0, 25, 2]);
							}}
						>
							ROOM 3
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_4') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setCameraAnimation(true);
								setSelectedMeshes('room_4');
								setInvisibleMesh('roof');
								setCameraPosition([0, 25, 2]);
							}}
						>
							ROOM 4
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_5') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setCameraAnimation(true);
								setSelectedMeshes('room_5');
								setInvisibleMesh('roof');
								setCameraPosition([0, 25, 2]);
							}}
						>
							ROOM 5
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_6') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setCameraAnimation(true);
								setSelectedMeshes('room_6');
								setInvisibleMesh('roof');
								setCameraPosition([0, 25, 2]);
							}}
						>
							ROOM 6
						</button>
						<button
							className={`product-button ${selectedMeshes.includes('room_7') ? 'active' : ''}`}
							onClick={() => {
								setIdleState(false);
								setCameraAnimation(true);
								setSelectedMeshes('room_7');
								setInvisibleMesh('roof');
								setCameraPosition([0, 25, 2]);
							}}
						>
							ROOM 7
						</button>
						<button
							className='product-button'
							onClick={() => {
								// setCameraAnimation(true);
								// setCameraPosition(defaultCameraPosition);
								setCameraAnimation(false);
								setSelectedMeshes([]);
								setInvisibleMesh(null);
							}}
						>
							RESET
						</button>
						<button
							className='product-button'
							onClick={() => {
								setIdleState(false);
								setCameraAnimation(true);
								setInvisibleMesh('roof');
								// const newSelectedMeshes = selectedMeshes.concat(roomList);
								setSelectedMeshes(roomList);
								setCameraPosition([0, 25, 2]);
							}}
						>
							SHOW ALL ROOMS
						</button>
					</div>
				</div>
				{/* </div> */}
				<div
					className='canvas-wrapper'
					onMouseDown={() => {
						setIdleState(false);
						// setCameraAnimation(false);
						setMouseDown(true);
					}}
					onMouseUp={() => setMouseDown(false)}
				>
					{/* only fov and far are adjustable, position and rotation does not work - is overwritten by Stage */}
					<Canvas camera={{ position: [0, -10, 0], fov: 45, far: 200 }}>
						<Camera
							ref={camera}
							cameraPosition={cameraPosition}
							cameraRotation={cameraRotation}
							cameraAnimation={cameraAnimation}
							mouseDown={mouseDown}
							fov={45}
							far={200}
						/>
						{/* create Loader UI as fallback before useLoader promise is returned */}
						<Suspense fallback={null}>
							{/* <Stage> will center and light the contents, create ground-shadows, and camerazoom the camera */}
							<Stage environment={null} intensity={0.25} contactShadowOpacity={0}>
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
							</Stage>
						</Suspense>
						<OrbitControls
							ref={controls}
							enableZoom={true}
							enablePan={true}
							// minPolarAngle={Math.PI / 2}
							maxPolarAngle={Math.PI / 2}
							autoRotate={idleState}
							autoRotateSpeed={1.5}
							minDistance={3}
							maxDistance={20}
						/>
					</Canvas>
				</div>
			</div>
		</div>
	);
}

export default App;
