import React from 'react';
import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
// npm install @react-three/fiber
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { roomList } from '../../../data/roomData';
import { setHoveredMesh, setIdleState, useCameraStore } from '../../../store/useCameraStore';
import { useDebugStore } from '../../../store/useDebugStore';
import CameraControls from '../../threeJs/CameraControls';
import CameraPositionMarkers from '../../threeJs/CameraPositionMarkers';
import styles from './ModelCanvas.module.scss';
import Lights from '../../threeJs/Lights';

const Model = React.lazy(() =>
	import('../../threeJs/Model').then((module) => ({
		default: module.default,
	}))
);

const ModelCanvas = () => {
	const hasAnimation = useCameraStore((state) => state.hasAnimation);
	const hoveredMesh = useCameraStore((state) => state.hoveredMesh);
	const [mouseDown, setMouseDown] = useState(false);

	const controlsRef = useRef<OrbitControlsProps>();
	const cameraRef = useRef<PerspectiveCameraProps>();

	const isCameraPositionMarkersActive = useDebugStore((state) => state.isCameraPositionMarkersActive);
	const isStatesActive = useDebugStore((state) => state.isStatesActive);
	const isAxisHelperActive = useDebugStore((state) => state.isAxisHelperActive);

	return (
		// id for better getting the element with document. inside Cursor.tsx
		<div
			id='canvas'
			className={styles.canvas}
			onMouseDown={() => {
				setIdleState(false);
				setMouseDown(true);
			}}
			onMouseUp={() => {
				setMouseDown(false);
			}}
		>
			{/* dpr = dynamic pixel ratio - sets pixel ratio based on device hardware capabilities */}
			<Canvas dpr={window.devicePixelRatio}>
				<CameraControls
					camera={cameraRef}
					controls={controlsRef}
					hasAnimation={hasAnimation}
					mouseDown={mouseDown}
					fov={45}
					far={200}
				/>

				<Lights />

				<Suspense fallback={null}>
					<Model hoveredMesh={hoveredMesh} setHoveredMesh={setHoveredMesh} />
					{isCameraPositionMarkersActive && (
						<CameraPositionMarkers
							markerPositions={roomList.map((room) => room.model.camPos)}
							targetPoints={roomList.map((room) => room.model.camTarget)}
						/>
					)}
				</Suspense>

				{isStatesActive && <Stats />}
				{isAxisHelperActive && <primitive object={new THREE.AxesHelper(100)} />}
			</Canvas>
		</div>
	);
};

export default ModelCanvas;
