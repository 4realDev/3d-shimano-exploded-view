import { OrbitControlsProps, Stats } from '@react-three/drei';
import { Canvas, PerspectiveCameraProps } from '@react-three/fiber';
import React from 'react';
// npm install @react-three/fiber
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CANVAS_DEBUG } from '../../../App';
import { roomModelList } from '../../../data/roomData';
import { setIdleState, showAllRoomsFromAbove, showClickedRoom, useCameraStore } from '../../../store/useCameraStore';
import CameraControls from '../../threeJs/CameraControls';
import SimpleModel from '../../threeJs/SimpleModel';
import RoomPositionMarkers from '../../threeJs/RoomPositionMarkers';
import styles from './ModelCanvas.module.scss';

// import Model from '../../threeJs/Model';
const Model = React.lazy(() =>
	import('../../threeJs/Model').then((module) => ({
		default: module.default,
	}))
);

const ModelCanvas = () => {
	const hasAnimation = useCameraStore((state) => state.hasAnimation);

	const [hoveredMesh, setHoveredMesh] = useState<null | string>(null);
	const [clickedMesh, setClickedMesh] = useState<null | string>(null);
	const [mouseDown, setMouseDown] = useState(false);

	const controlsRef = useRef<OrbitControlsProps>();
	const cameraRef = useRef<PerspectiveCameraProps>();

	useEffect(() => {
		if (clickedMesh) {
			clickedMesh === 'roof' ? showAllRoomsFromAbove() : showClickedRoom(clickedMesh);
		}
	}, [clickedMesh]);

	return (
		<div
			className={styles.canvas}
			onMouseDown={() => {
				setIdleState(false);
				// setHasAnimation(false);
				setMouseDown(true);
			}}
			onMouseUp={() => {
				setMouseDown(false);
				// setHasAnimation(true);
			}}
		>
			<Canvas>
				<CameraControls
					camera={cameraRef}
					controls={controlsRef}
					hasAnimation={hasAnimation}
					mouseDown={mouseDown}
					fov={45}
					far={200}
				/>

				{/* create Loader UI as fallback before useLoader promise is returned */}
				<Suspense fallback={<SimpleModel />}>
					<Model
						hoveredMesh={hoveredMesh}
						setHoveredMesh={setHoveredMesh}
						clickedMesh={clickedMesh}
						setClickedMesh={setClickedMesh}
					/>

					{CANVAS_DEBUG && (
						<RoomPositionMarkers
							markerPositions={roomModelList.map(({ camPos }) => camPos)}
							targetPoints={roomModelList.map(({ camTarget }) => camTarget)}
						/>
					)}
				</Suspense>
				{CANVAS_DEBUG && <Stats />}
				{CANVAS_DEBUG && <primitive object={new THREE.AxesHelper(100)} />}
			</Canvas>
		</div>
	);
};

export default ModelCanvas;
