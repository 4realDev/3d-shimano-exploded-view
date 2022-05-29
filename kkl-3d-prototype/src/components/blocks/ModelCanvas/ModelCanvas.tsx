import React from 'react';
import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { roomList } from '../../../data/roomData';
import { setIdleState, useCameraStore } from '../../../store/useCameraStore';
import { useDebugStore } from '../../../store/useDebugStore';
import CameraControls from '../../threeJs/CameraControls';
import CameraPositionMarkers from '../../threeJs/CameraPositionMarkers';
import styles from './ModelCanvas.module.scss';
import Lights from '../../threeJs/Lights';
import useLongPress from '../../../hooks/useLongPress';
import Cursor from '../../ui/Cursor/Cursor';
import { ResizeObserver } from '@juggle/resize-observer';
import ModelCanvasButtons from '../../ui/ModelCanvasButtons/ModelCanvasButtons';

const Model = React.lazy(() =>
	import('../../threeJs/Model').then((module) => ({
		default: module.default,
	}))
);

const ModelCanvas = () => {
	const hasAnimation = useCameraStore((state) => state.hasAnimation);
	const [mouseDown, setMouseDown] = useState(false);
	// used for mesh material highlighting on hover -> if long press don't highlight mesh material on hover
	const [longPress, setLongPress] = useState(false);
	const longPressEvent = useLongPress(() => {
		if (longPress === false) setLongPress(true);
	}, 200);

	const controlsRef = useRef<OrbitControlsProps>();
	const cameraRef = useRef<PerspectiveCameraProps>();

	const isCameraPositionMarkersActive = useDebugStore((state) => state.isCameraPositionMarkersActive);
	const isCameraPositionMarkersEvActive = useDebugStore((state) => state.isCameraPositionMarkersEvActive);
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
			onPointerLeave={() => {
				setMouseDown(false);
				setLongPress(false);
			}}
			{...longPressEvent}
		>
			<ModelCanvasButtons />
			{/* <div
				style={{
					zIndex: 999,
					cursor: 'default',
					width: 175 + 'px',
					bottom: 5 + '%',
					position: 'absolute',
					right: 25 + '%',
				}}
			>
				<div>camera position [x,y,z]:</div>
				<div>
					({cameraRef.current?.position instanceof THREE.Vector3 && cameraRef.current?.position?.x.toFixed(2)},{' '}
					{cameraRef.current?.position instanceof THREE.Vector3 && cameraRef.current?.position?.y.toFixed(2)},{' '}
					{cameraRef.current?.position instanceof THREE.Vector3 && cameraRef.current?.position?.z.toFixed(2)})
				</div>
			</div> */}
			<Cursor />
			{/* dpr = dynamic pixel ratio - sets pixel ratio based on device hardware capabilities */}
			<Canvas dpr={window.devicePixelRatio} resize={{ polyfill: ResizeObserver }}>
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
					<Model longPress={longPress} />
					{isCameraPositionMarkersActive && (
						<>
							<CameraPositionMarkers
								markerPositions={roomList.map((room) => room.model.camPos)}
								targetPoints={roomList.map((room) => room.model.camTarget)}
								camPosColor={'black'}
								camTargetColor={'red'}
							/>
						</>
					)}
					{isCameraPositionMarkersEvActive && (
						<>
							<CameraPositionMarkers
								markerPositions={roomList.map((room) => room.model.camPosEv)}
								targetPoints={roomList.map((room) => room.model.camTargetEv)}
								camPosColor={'grey'}
								camTargetColor={'orange'}
							/>
						</>
					)}
				</Suspense>

				{isStatesActive && <Stats />}
				{isAxisHelperActive && <primitive object={new THREE.AxesHelper(100)} />}
			</Canvas>
		</div>
	);
};

export default ModelCanvas;
