import './App.css';

import RoomSelection from './components/blocks/RoomSelection/RoomSelection';
import Cursor from './components/Cursor';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import ModelCanvas from './components/blocks/ModelCanvas/ModelCanvas';
import ThreeJsDataDebugger from './components/blocks/ThreeJsDataDebugger/ThreeJsDataDebugger';
import WizardDataDebugger from './components/blocks/WizardDataDebugger/WizardDataDebugger';

export const CANVAS_DEBUG = false;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='container' /*style={{ backgroundImage: `url(${'/images/waves.png'})` }}*/>
				<Cursor />
				<RoomSelection />
				<ModelCanvas />
				<ThreeJsDataDebugger />
				<WizardDataDebugger />
			</div>
		</ThemeProvider>
	);
}

export default App;
