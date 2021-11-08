import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

type CameraControlsProps = {
	camera: any; // TODO: Find solution for useRef<PerspectiveCameraProps>
	controls: any; // TODO: Find solution for useRef<OrbitControlsProps>
	cameraPosition: THREE.Vector3;
	cameraTarget: THREE.Vector3;
	controlsIdleState: boolean;
	hasAnimation: boolean;
	mouseDown: boolean;
	fov: number;
	far: number;
};

const CameraControls = ({
	camera,
	controls,
	cameraPosition,
	cameraTarget,
	controlsIdleState,
	hasAnimation,
	mouseDown,
	fov,
	far,
}: CameraControlsProps) => {
	const dampSpeed = 2;

	// const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

	const damp = (target: THREE.Vector3, to: THREE.Vector3, speed: number, delta: number) => {
		if (target instanceof THREE.Vector3) {
			target.x = THREE.MathUtils.damp(target.x, to.x, speed, delta);
			target.y = THREE.MathUtils.damp(target.y, to.y, speed, delta);
			target.z = THREE.MathUtils.damp(target.z, to.z, speed, delta);
		}
	};

	// ANIMATED UPDATE FOR CAMERA MOVEMENT ONCLICK/ONSELECT
	useFrame((state, delta) => {
		if (!mouseDown && hasAnimation) {
			damp(camera.current.position, cameraPosition, dampSpeed, delta);
			// Focus point of controls. Can be updated manually at any point.
			damp(controls.current.target, cameraTarget, dampSpeed, delta);
		}
		// TODO: Figure out how to rotate camera
		// camera.current.rotation.set(new THREE.Euler(deg2rad(45), 0, 0));
		// camera.current.rotation.x = (90 * Math.PI) / 180;
		// camera.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.2);

		controls.current.update();
		camera.current.updateProjectionMatrix();
	});

	return (
		<>
			<PerspectiveCamera
				ref={camera}
				makeDefault
				position={[20, 15, 0]}
				fov={fov}
				far={far}
				aspect={window.innerWidth / window.innerHeight}
				// onUpdate={(self) => self.updateProjectionMatrix()}
			/>
			<OrbitControls
				ref={controls}
				enableZoom={true}
				enablePan={true}
				// minPolarAngle={Math.PI / 2}
				maxPolarAngle={Math.PI / 2}
				// autoRotate={controlsIdleState}
				// autoRotateSpeed={0.5}
				minDistance={3}
				maxDistance={20}
			/>
			<primitive object={new THREE.AxesHelper(100)} />
		</>
	);
};

export default CameraControls;
