import './App.css';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './components/models/PrototypeHouse';
import { useSnapshot } from 'valtio';
import { state } from './common/state';

function App() {
	const snap = useSnapshot(state);
	const [meshList, setMeshList] = useState([]);
	return (
		<div className='container'>
			<div className='inner-container'>
				<div className='canvas-wrapper'>
					<Canvas camera={{ position: [0, -40, 0], fov: 40 }}>
						{/* create Loader UI as fallback before useLoader promise is returned */}
						<Suspense fallback={null}>
							{/* <Stage> will center and light the contents, create ground-shadows, and zoom the camera */}
							<Stage
								environment={null}
								intensity={0.25}
								contactShadowOpacity={0}
							>
								<Model meshList={meshList} setMeshList={setMeshList} />
							</Stage>
						</Suspense>
						<OrbitControls />
					</Canvas>
				</div>
			</div>
			<div className='card-container'>
				<div className='card-heading'>
					<h1>{snap.current ? snap.current.replace('_', ' ') : ''}</h1>
				</div>

				<div className='product-button-container'>
					{meshList.map((mesh) => {
						return (
							<button
								className='product-button'
								onClick={() => {
									state.selected = mesh.name;
								}}
							>
								{mesh.name.replace('_', ' ')}
							</button>
						);
					})}
					<button
						className='product-button'
						onClick={() => {
							state.selected = null;
						}}
					>
						RESET
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
