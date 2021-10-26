import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Camera = ({ cameraPosition, cameraRotation, cameraAnimation, mouseDown, fov, far }) => {
	// const [ref, camera] = useResource();
	// const ref = useRef();
	const camera = useThree((state) => state.camera);
	const dampSpeed = 2;

	const deg2rad = (degrees) => degrees * (Math.PI / 180);

	const damp = (target, to, step, delta, v = new THREE.Vector3()) => {
		if (target instanceof THREE.Vector3) {
			target.x = THREE.MathUtils.damp(target.x, to[0], step, delta);
			target.y = THREE.MathUtils.damp(target.y, to[1], step, delta);
			target.z = THREE.MathUtils.damp(target.z, to[2], step, delta);
		}
	};

	// INITIAL SETUP OF CAMERA
	useEffect(() => {
		// camera.position.x = 10;
		// camera.position.y = 10;
		// camera.position.z = 10;
		camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
		camera.fov = fov;
		camera.far = far;
	}, []);

	// ANIMATED UPDATE FOR CAMERA MOVEMENT ONCLICK/ONSELECT
	useFrame((state, delta) => {
		// console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
		if (!mouseDown && cameraAnimation) {
			// state.camera.rotation.set([0.2 + 1, 0, 0]);
			damp(camera.position, cameraPosition, dampSpeed, delta);
			damp(camera.rotation, cameraRotation, dampSpeed, delta);
			// camera.fov = THREE.MathUtils.damp(camera.fov, 30, dampSpeed, delta);
			// camera.rotation.set(THREE.MathUtils.damp(camera.rotation, (0, 0, 1.0 + 1.0), dampSpeed, delta));
			// camera.lookAt(0, 0, 0);
		}
		state.camera.updateProjectionMatrix();
	});

	// SETTING PROPS INSIDE <perspectiveCamera /> SEEMS NOT TO WORK
	// INSTEAD SET PROPS ON useEffect HOOK
	return <perspectiveCamera makeDefault />;

	// return (
	// 	<PerspectiveCamera
	// 		makeDefault
	// 		ref={camera}
	// 		position={cameraPosition}
	// 		rotation={cameraRotation}
	// 		fov={fov}
	// 		far={far}
	// 	/>
	// );
	// return (
	// 	<perspectiveCamera
	// 		makeDefault
	// 		fov={fov}
	// 		far={far}
	// 		aspect={1200 / 600}
	// 		radius={(1200 + 600) / 4}
	// 		position={[20, -40, 0]}
	// 		onUpdate={(self) => self.updateProjectionMatrix()}
	// 	/>
	// );
};

export default Camera;
