import './App.css';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './components/models/PrototypeHouse';

function App() {
	const [meshList, setMeshList] = useState([]);
	const [hoveredMesh, setHoveredMesh] = useState(null);
	const [clickedMesh, setClickedMesh] = useState(null);
	const [selectedMesh, setSelectedMesh] = useState(null);
	return (
		<div className='container'>
			<div className='inner-container'>
				<div className='canvas-wrapper'>
					<Canvas camera={{ position: [0, -40, 0], fov: 40 }}>
						{/* create Loader UI as fallback before useLoader promise is returned */}
						<Suspense fallback={null}>
							{/* <Stage> will center and light the contents, create ground-shadows, and zoom the camera */}
							<Stage environment={null} intensity={0.25} contactShadowOpacity={0}>
								<Model
									meshList={meshList}
									setMeshList={setMeshList}
									hoveredMesh={hoveredMesh}
									setHoveredMesh={setHoveredMesh}
									clickedMesh={clickedMesh}
									setClickedMesh={setClickedMesh}
									selectedMesh={selectedMesh}
									setSelectedMesh={setSelectedMesh}
								/>
							</Stage>
						</Suspense>
						<OrbitControls />
					</Canvas>
				</div>
			</div>
			<div className='card-container'>
				<h1>Debug Console:</h1>
				<p style={{ lineHeight: 0 }}>hovered: {hoveredMesh ? hoveredMesh : ''}</p>
				<p style={{ lineHeight: 0 }}>clicked: {clickedMesh ? clickedMesh : ''}</p>
				<p style={{ lineHeight: 0, marginBottom: 50 }}>selected: {selectedMesh ? selectedMesh : ''}</p>
				{/* <div className='card-heading'>
					<h1>{clickedMesh ? clickedMesh.replace('_', ' ') : ''}</h1>
				</div> */}

				<div className='product-button-container'>
					{meshList.map((mesh) => {
						return (
							<button
								className='product-button'
								onClick={() => {
									setSelectedMesh(mesh.name);
								}}
							>
								{mesh.name.replace('_', ' ')}
							</button>
						);
					})}
					<button
						className='product-button'
						onClick={() => {
							setSelectedMesh(null);
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
