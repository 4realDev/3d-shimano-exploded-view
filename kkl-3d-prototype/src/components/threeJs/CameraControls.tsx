import { PerspectiveCameraProps, useFrame, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from '@react-three/drei';
import { defaultCameraPosition, setHasAnimation, useCameraStore } from '../../store/useCameraStore';
import { useDebugStore } from '../../store/useDebugStore';

type CameraControlsProps = {
	camera: React.MutableRefObject<PerspectiveCameraProps | undefined>;
	controls: React.MutableRefObject<OrbitControlsProps | undefined>;
	hasAnimation: boolean;
	mouseDown: boolean;
	fov: number;
	far: number;
};

const CameraControls = ({
	camera,
	controls,
	hasAnimation,
	mouseDown,
	fov,
	far,
}: CameraControlsProps) => {
	const idleState = useCameraStore((state) => state.idleState);
	// Each time user clicks on a room,
	// cameraPosition and cameraTarget are updated with the camPos and camTarget defined in the roomList data for each room
	const cameraPosition = useCameraStore((state) => state.cameraPosition);
	const cameraTarget = useCameraStore((state) => state.cameraTarget);
	// Flag can currently only be set in the DebugStore (not in UI)
	const isCameraBackLerpingActive = useDebugStore((state) => state.isCameraBackLerpingActive);
	const dampSpeed = 2;

	const damp = (target: Vector3 | undefined, to: THREE.Vector3, speed: number, delta: number) => {
		if (target instanceof THREE.Vector3) {
			target.x = THREE.MathUtils.damp(target.x, to.x, speed, delta);
			target.y = THREE.MathUtils.damp(target.y, to.y, speed, delta);
			target.z = THREE.MathUtils.damp(target.z, to.z, speed, delta);
		}
	};

	const checkAnimationFinished = (target: Vector3 | undefined) => {
		const stopThreshold = 0.025;
		if (
			target instanceof THREE.Vector3 &&
			target.x > cameraPosition.x - stopThreshold &&
			target.y > cameraPosition.y - stopThreshold &&
			target.z > cameraPosition.z - stopThreshold &&
			target.x < cameraPosition.x + stopThreshold &&
			target.y < cameraPosition.y + stopThreshold &&
			target.z < cameraPosition.z + stopThreshold
		) {
			setHasAnimation(false);
		}
	};

	// Hook which allow to render 3D component (mesh objects animation, effects, transformation...) based on every frame update
	useFrame((state, delta) => {
		if (!mouseDown && hasAnimation && !idleState && camera.current && controls.current) {
			damp(camera.current.position, cameraPosition, dampSpeed, delta);
			damp(controls.current.target, cameraTarget, dampSpeed, delta);
			!isCameraBackLerpingActive && checkAnimationFinished(camera.current.position);
		}
		controls?.current?.update!(); // Workaround
		camera?.current?.updateProjectionMatrix!(); // Workaround
	});

	// For roomData to read custom camera position and targets more easily
	// In camera, set enablePan to true for better camera configuration/navigation
	// if (camera.current?.position instanceof THREE.Vector3 && controls.current?.target instanceof THREE.Vector3) {
	// 	console.log(
	// 		`camera position: [${camera.current?.position.x}, ${camera.current?.position.y}, ${camera.current?.position.z}]`
	// 	);

	// 	console.log(
	// 		`target position: [${controls.current?.target.x}, ${controls.current?.target.y}, ${controls.current?.target.z}]`
	// 	);

	// 	console.log('camera zoom: ', camera.current?.zoom);
	// }

	return (
		<>
			<PerspectiveCamera
				ref={camera as any}
				makeDefault
				position={defaultCameraPosition}
				fov={fov}
				far={far}
				aspect={window.innerWidth / window.innerHeight}
			/>
			<OrbitControls
				ref={controls as any}
				enableZoom={true}
				enablePan={false}
				// maxPolarAngle={Math.PI / 2}
				autoRotate={idleState}
				autoRotateSpeed={0.5}
			/>
		</>
	);
};

export default CameraControls;
