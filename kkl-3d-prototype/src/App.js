import './App.css';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './components/models/PrototypeHouse';

function App() {
	return (
		<div className='container'>
			<Canvas
				style={{ height: 100 + 'vh', width: 100 + '%' }}
				camera={{ position: [0, -40, 0], fov: 40 }}
			>
				<spotLight
					intensity={0.5}
					angle={0.1}
					penumbra={1}
					position={[10, 15, 10]}
					castShadow
				/>
				{/* create Loader UI as fallback before useLoader promise is returned */}
				<Suspense fallback={null}>
					{/* <Stage> will center and light the contents, create ground-shadows, and zoom the camera */}
					<Stage environment={null} intensity={0.25} contactShadowOpacity={0}>
						<Model />
					</Stage>
				</Suspense>
				<OrbitControls />
			</Canvas>
		</div>
	);
}

export default App;
