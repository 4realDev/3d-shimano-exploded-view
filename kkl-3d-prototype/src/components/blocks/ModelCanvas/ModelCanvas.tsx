import React from 'react';
import { OrbitControlsProps } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { setIdleState, useCameraStore } from '../../../store/useCameraStore';
import CameraControls from '../../threeJs/CameraControls';
import styles from './ModelCanvas.module.scss';
import Lights from '../../threeJs/Lights';
import useLongPress from '../../../hooks/useLongPress';
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

	return (
		<div
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
			{...longPressEvent}>
			<ModelCanvasButtons />
			{/* <div
			>
				<div>camera position [x,y,z]:</div>
				<div>
					({cameraRef.current?.position instanceof THREE.Vector3 && cameraRef.current?.position?.x.toFixed(2)},{' '}
					{cameraRef.current?.position instanceof THREE.Vector3 && cameraRef.current?.position?.y.toFixed(2)},{' '}
					{cameraRef.current?.position instanceof THREE.Vector3 && cameraRef.current?.position?.z.toFixed(2)})
				</div>
			</div> */}
			{/* dpr = dynamic pixel ratio - sets pixel ratio based on device hardware capabilities */}
			<Canvas
				dpr={window.devicePixelRatio}
				resize={{ polyfill: ResizeObserver }}
				// style={{ borderBottomLeftRadius: 4 + 'rem', borderBottomRightRadius: 4 + 'rem', width: 100 + 'vw' }}
			>
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
				</Suspense>
			</Canvas>
		</div>
	);
};

export default ModelCanvas;
