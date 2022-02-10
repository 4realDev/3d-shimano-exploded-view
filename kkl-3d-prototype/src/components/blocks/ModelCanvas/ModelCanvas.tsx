import React from 'react';
import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { roomList } from '../../../data/roomData';
import { setHoveredMesh, setIdleState, useCameraStore } from '../../../store/useCameraStore';
import { useDebugStore } from '../../../store/useDebugStore';
import CameraControls from '../../threeJs/CameraControls';
import CameraPositionMarkers from '../../threeJs/CameraPositionMarkers';
import styles from './ModelCanvas.module.scss';
import Lights from '../../threeJs/Lights';
import useLongPress from '../../../hooks/useLongPress';
import Cursor from '../../ui/Cursor/Cursor';

const Model = React.lazy(() =>
	import('../../threeJs/Model').then((module) => ({
		default: module.default,
	}))
);

const ModelCanvas = () => {
	const hasAnimation = useCameraStore((state) => state.hasAnimation);
	const hoveredMesh = useCameraStore((state) => state.hoveredMesh);
	const [mouseDown, setMouseDown] = useState(false);
	// used for mesh material highlighting on hover -> if long press don't highlight mesh material on hover
	const [longPress, setLongPress] = useState(false);
	const longPressEvent = useLongPress(() => {
		if (longPress === false) setLongPress(true);
	}, 200);

	const controlsRef = useRef<OrbitControlsProps>();
	const cameraRef = useRef<PerspectiveCameraProps>();

	const isCameraPositionMarkersActive = useDebugStore((state) => state.isCameraPositionMarkersActive);
	const isStatesActive = useDebugStore((state) => state.isStatesActive);
	const isAxisHelperActive = useDebugStore((state) => state.isAxisHelperActive);

	return (
		// id for better getting the element with document.getElementById() inside Cursor.tsx
		<div
			id='canvas'
			className={styles.canvas}
			onPointerDown={() => {
				setIdleState(false);
				setMouseDown(true);
			}}
			onPointerUp={() => {
				setMouseDown(false);
				setLongPress(false);
			}}
			{...longPressEvent}
		>
			<Cursor />
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
					<Model hoveredMesh={hoveredMesh} setHoveredMesh={setHoveredMesh} longPress={longPress} />
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
