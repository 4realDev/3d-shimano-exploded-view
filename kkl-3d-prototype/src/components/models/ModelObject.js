import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Create Model Object with use gltf loader hook from drei
const ModelObject = ({ model, position, rotation, scale }) => {
	// path to model
	// "/" to access public directory
	// true - to use draco binaries?
	const gltf = useGLTF(model);

	// const ref = useRef();
	// useFrame(() => (ref.current.rotation.y += 0.005));

	return (
		<mesh /* ref={ref} */ position={position} rotation={rotation} scale={scale}>
			<primitive object={gltf.scene} dispose={null}></primitive>
		</mesh>
	);
};

export default ModelObject;
