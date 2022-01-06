import './App.css';

import RoomSelection from './components/blocks/RoomSelection/RoomSelection';
import Cursor from './components/Cursor';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import ModelCanvas from './components/blocks/ModelCanvas/ModelCanvas';
import ThreeJsDataDebugger from './components/debug/ThreeJsDataDebugger/ThreeJsDataDebugger';
import WizardDataDebugger from './components/debug/WizardDataDebugger/WizardDataDebugger';
import { useDebugStore } from './store/useDebugStore';

function App() {
	const isModelActive = useDebugStore((state) => state.isModelActive);
	const isThreeJsDataDebuggerActive = useDebugStore((state) => state.isThreeJsDataDebuggerActive);
	const isWizardDataDebuggerActive = useDebugStore((state) => state.isWizardDataDebuggerActive);
	return (
		<ThemeProvider theme={theme}>
			<div className='container' /*style={{ backgroundImage: `url(${'/images/waves.png'})` }}*/>
				<Cursor />
				<RoomSelection />
				{isModelActive && <ModelCanvas />}
				{isThreeJsDataDebuggerActive && <ThreeJsDataDebugger />}
				{isWizardDataDebuggerActive && <WizardDataDebugger />}
			</div>
		</ThemeProvider>
	);
}

export default App;
