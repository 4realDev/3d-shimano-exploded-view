import { PerspectiveCameraProps, useFrame, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from '@react-three/drei';
import { useCameraStore } from '../../store/useCameraStore';
// npm install @react-three/drei

// Side note:
// camera: any -> should be camera: React.MutableRefObject<PerspectiveCameraProps | undefined>
// controls: any -> should be controls: React.MutableRefObject<OrbitControlsProps | undefined>
// But this does not work with camera.current.update() OR cameraCurrent.updateProjectionMatrix();
// Result: "Cannot invoke an object which is possibly 'undefined'.ts(2722)"

type CameraControlsProps = {
	camera: React.MutableRefObject<PerspectiveCameraProps | undefined>;
	controls: React.MutableRefObject<OrbitControlsProps | undefined>;
	controlsIdleState: boolean;
	hasAnimation: boolean;
	mouseDown: boolean;
	fov: number;
	far: number;
};

const CameraControls = ({
	camera,
	controls,
	controlsIdleState,
	hasAnimation,
	mouseDown,
	fov,
	far,
}: CameraControlsProps) => {
	const cameraPosition = useCameraStore((state) => state.cameraPosition);
	const cameraTarget = useCameraStore((state) => state.cameraTarget);
	const cameraAngle = useCameraStore((state) => state.cameraAngle);

	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);
	const dampSpeed = 2;

	const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

	const damp = (target: Vector3 | undefined, to: THREE.Vector3, speed: number, delta: number) => {
		if (target instanceof THREE.Vector3) {
			target.x = THREE.MathUtils.damp(target.x, to.x, speed, delta);
			target.y = THREE.MathUtils.damp(target.y, to.y, speed, delta);
			target.z = THREE.MathUtils.damp(target.z, to.z, speed, delta);
		}
	};

	const dampAzimuthalAngle = (startAnlge: number, to: number, speed: number, delta: number) => {
		const dampedAzimuthalAngle = THREE.MathUtils.damp(startAnlge, to, speed, delta);
		(controls.current as any).setAzimuthalAngle(dampedAzimuthalAngle);
	};

	// ANIMATED UPDATE FOR CAMERA MOVEMENT ONCLICK/ONSELECT
	useFrame((state, delta) => {
		if (!mouseDown && hasAnimation && camera.current && controls.current) {
			// (controls.current as any).setAzimuthalAngle(deg2rad(90));

			selectedMeshes.length !== 0 &&
				dampAzimuthalAngle((controls.current as any).getAzimuthalAngle(), deg2rad(cameraAngle), 20, delta);

			damp(camera.current.position, cameraPosition, dampSpeed, delta);
			// Focus point of controls. Can be updated manually at any point.
			damp(controls.current.target, cameraTarget, dampSpeed, delta);
		}

		/* #region  TODO: Search for alternative rotation-possibilities (current solution: AzimuthalAngle) */
		// TODO: Figure out how to rotate camera
		// camera.current.rotation.set(new THREE.Euler(deg2rad(45), 0, 0));
		// camera.current.rotation.x = (90 * Math.PI) / 180;
		// camera.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.2);

		// const cameraType = camera as React.MutableRefObject<PerspectiveCameraProps | undefined>;
		// camera?.current?.rotateX((75 * Math.PI) / 180);
		// camera.current.rotation.x = (180 * Math.PI) / 180;
		// camera.current.rotation.y = (90 * Math.PI) / 180;
		// camera.current.rotation.z = (-180 * Math.PI) / 180;
		// camera.current.rotateOnAxis(new THREE.Vector3(0.2, 0, 0), 0.6);

		// camera.current.position.y = 20;
		// controls.current.target.x = 0;

		// (controls.current as any).object.rotateX(deg2rad(29));
		// (controls.current as any).object.rotation.x = deg2rad(29);
		// (controls.current as any).object.rotateOnWorldAxis(new THREE.Vector3(1, 1, 1), deg2rad(50));
		// (controls.current as any).object.rotateOnAxis(new THREE.Vector3(1, 0, 1), deg2rad(45));
		// (camera.current as any).setRotationFromEuler(new THREE.Euler(-10, deg2rad(-49), deg2rad(-23)));
		// (controls.current as any).object.setRotationFromEuler(new THREE.Euler(-10, deg2rad(-49), deg2rad(-23)));
		/* #endregion */

		(controls.current as any).update(); // Workaround
		(camera.current as any).updateProjectionMatrix(); // Workaround
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
				// onUpdate={(self) => self.updateProjectionMatrix()}
			/>
			<OrbitControls
				ref={controls as any}
				enableZoom={false}
				enablePan={false}
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
