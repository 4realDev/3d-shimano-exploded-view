import { PerspectiveCameraProps, useFrame, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from '@react-three/drei';
import { useCameraStore } from '../../store/useCameraStore';
// npm install @react-three/drei

type CameraControlsProps = {
	camera: React.MutableRefObject<PerspectiveCameraProps | undefined>;
	controls: React.MutableRefObject<OrbitControlsProps | undefined>;
	hasAnimation: boolean;
	mouseDown: boolean;
	fov: number;
	far: number;
};

const CameraControls = ({ camera, controls, hasAnimation, mouseDown, fov, far }: CameraControlsProps) => {
	const idleState = useCameraStore((state) => state.idleState);
	const cameraPosition = useCameraStore((state) => state.cameraPosition);
	const cameraTarget = useCameraStore((state) => state.cameraTarget);
	const dampSpeed = 2;

	const damp = (target: Vector3 | undefined, to: THREE.Vector3, speed: number, delta: number) => {
		if (target instanceof THREE.Vector3) {
			target.x = THREE.MathUtils.damp(target.x, to.x, speed, delta);
			target.y = THREE.MathUtils.damp(target.y, to.y, speed, delta);
			target.z = THREE.MathUtils.damp(target.z, to.z, speed, delta);
		}
	};

	// ANIMATED UPDATE FOR CAMERA MOVEMENT ONCLICK/ONSELECT
	useFrame((state, delta) => {
		if (!mouseDown && hasAnimation && !idleState) {
			camera.current && damp(camera.current.position, cameraPosition, dampSpeed, delta);
			controls.current && damp(controls.current.target, cameraTarget, dampSpeed, delta);
		}
		controls?.current?.update!(); // Workaround
		camera?.current?.updateProjectionMatrix!(); // Workaround
	});

	return (
		<>
			<PerspectiveCamera
				ref={camera as any}
				makeDefault
				position={[20, 15, 0]}
				fov={fov}
				far={far}
				aspect={window.innerWidth / window.innerHeight}
			/>
			<OrbitControls
				ref={controls as any}
				enableZoom={false}
				enablePan={false}
				maxPolarAngle={Math.PI / 2}
				autoRotate={idleState}
				autoRotateSpeed={0.5}
				minDistance={3}
				maxDistance={20}
			/>
		</>
	);
};

export default CameraControls;
