import './App.css';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './components/models/PrototypeHouse';
import { useSnapshot } from 'valtio';
import { state } from './common/state';

function App() {
	const snap = useSnapshot(state);
	return (
		<div className='container' style={{ height: 50 + 'vh', width: 100 + '%' }}>
			<Canvas camera={{ position: [0, -40, 0], fov: 40 }}>
				{/* create Loader UI as fallback before useLoader promise is returned */}
				<Suspense fallback={null}>
					{/* <Stage> will center and light the contents, create ground-shadows, and zoom the camera */}
					<Stage intensity={0.25} contactShadowOpacity={0}>
						<Model />
					</Stage>
				</Suspense>
				<OrbitControls />
			</Canvas>
			<div className='card-container'>
				<div className='card-heading'>
					<h1>{snap.current ? snap.current.replace('_', ' ') : ''}</h1>
				</div>

				<div className='product-button-container'>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'stairs';
							console.log(state.selected);
						}}
					>
						Stairs
					</button>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'doors';
							console.log(state.selected);
						}}
					>
						Doors
					</button>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'outer_walls';
							console.log(state.selected);
						}}
					>
						Outer Walls
					</button>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'inner_walls';
							console.log(state.selected);
						}}
					>
						Inner Walls
					</button>

					<button
						className='product-button'
						onClick={() => {
							state.selected = 'floor';
							console.log(state.selected);
						}}
					>
						Floor
					</button>
				</div>
				<div className='product-button-container'>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'windows';
							console.log(state.selected);
						}}
					>
						Window
					</button>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'roof';
							console.log(state.selected);
						}}
					>
						Roof
					</button>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'balcony';
							console.log(state.selected);
						}}
					>
						Balcony
					</button>
					<button
						className='product-button'
						onClick={() => {
							state.selected = 'fence';
							console.log(state.selected);
						}}
					>
						Fence
					</button>
					<button
						className='product-button'
						onClick={() => {
							state.selected = null;
							console.log(state.selected);
						}}
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
