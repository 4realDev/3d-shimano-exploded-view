import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { AxesHelper } from 'three';

const CameraControls = ({ cameraPosition, controlsIdleState, hasAnimation, mouseDown, fov, far }) => {
	// const [ref, camera] = useResource();
	// const camera = useThree((state) => state.camera);

	// https://codesandbox.io/s/orbitcontrols-react-three-fiber-9iotf?file=/src/index.js:488-545
	// const { camera, gl } = useThree();

	const controls = useRef();
	const camera = useRef();

	const dampSpeed = 2;

	const deg2rad = (degrees) => degrees * (Math.PI / 180);

	const damp = (target, to, step, delta, heightOffset) => {
		if (target instanceof THREE.Vector3) {
			target.x = THREE.MathUtils.damp(target.x, to.x, step, delta);
			target.y = THREE.MathUtils.damp(target.y, to.y + heightOffset, step, delta);
			target.z = THREE.MathUtils.damp(target.z, to.z, step, delta);
		}
	};

	// const initCamera = () => {
	// 	// camera.position.x = 10;
	// 	// camera.position.y = 10;
	// 	// camera.position.z = 10;
	// 	camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
	// 	camera.fov = fov;
	// 	camera.far = far;
	// };

	// const initOrbitControls = () => {
	// 	console.log(controls);
	// 	// const controls = new OrbitControls(camera, gl.domElement);
	// 	controls.current.enableZoom = true;
	// 	controls.current.enablePan = true;
	// 	// controls.current.minPolarAngle = Math.PI / 2
	// 	controls.current.maxPolarAngle = Math.PI / 2;
	// 	controls.current.autoRotate = { controlsIdleState };
	// 	controls.current.autoRotateSpeed = 1;
	// 	controls.current.minDistance = 3;
	// 	controls.current.maxDistance = 60;
	// 	controls.current.args = [camera, gl.domElement];
	// 	// Update the controls.current. Must be called after any manual changes to the camera's transform, or in the update loop if .autoRotate or .enableDamping are set
	// 	controls.current.update();
	// 	// return () => {
	// 	// 	// Remove all the event listeners.
	// 	// 	controls.current.dispose();
	// 	// };
	// };

	// INITIAL SETUP OF CAMERA
	// useEffect(() => {
	// initCamera();
	// initOrbitControls();
	// }, []);

	// ANIMATED UPDATE FOR CAMERA MOVEMENT ONCLICK/ONSELECT
	useFrame((state, delta) => {
		if (!mouseDown && hasAnimation) {
			damp(camera.current.position, cameraPosition, dampSpeed, delta, 10);
			damp(controls.current.target, cameraPosition, delta, dampSpeed, 0);
		}
		controls.current.update();
		camera.current.updateProjectionMatrix();
	});

	return (
		<>
			{/* <perspectiveCamera makeDefault onUpdate={(self) => self.updateProjectionMatrix()} />
			 */}
			<PerspectiveCamera
				ref={camera}
				makeDefault
				position={[20, 15, 0]}
				// rotation={cameraRotation}
				fov={fov}
				far={far}
				aspect={window.innerWidth / window.innerHeight}
				onUpdate={(self) => self.updateProjectionMatrix()}
			/>
			<OrbitControls
				ref={controls}
				enableZoom={true}
				enablePan={true}
				// minPolarAngle={Math.PI / 2}
				maxPolarAngle={Math.PI / 2}
				autoRotate={controlsIdleState}
				autoRotateSpeed={1.5}
				minDistance={3}
				maxDistance={20}
			/>
			<primitive object={new THREE.AxesHelper(100)} />
		</>
	);
};

export default CameraControls;