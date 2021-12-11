import './App.css';

import RoomSelection from './components/blocks/RoomSelection/RoomSelection';
import ModelCanvas from './components/blocks/ModelCanvas/ModelCanvas';

export const CANVAS_DEBUG = false;

function App() {
	return (
		<div className='container' /*style={{ backgroundImage: `url(${'/images/waves.png'})` }}*/>
			<RoomSelection />
			<ModelCanvas />
		</div>
	);
}

export default App;
