import './App.scss';

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
	const isModelLoading = useDebugStore((state) => state.isModelLoading);
	const isThreeJsDataDebuggerActive = useDebugStore((state) => state.isThreeJsDataDebuggerActive);
	const isWizardDataDebuggerActive = useDebugStore((state) => state.isWizardDataDebuggerActive);
	return (
		<ThemeProvider theme={theme}>
			<div className='container'>
				<Cursor />
				<RoomSelection />
				{isModelLoading && (
					<div className='modelCanvasLoadingScreen'>
						<p>Um das Model zu laden, aktivieren Sie die Checkbox "3D Model"</p>
						<p>Die Ladezeit des Models beträgt 15-30 Sekunden.</p>
						<p>Wir danken Ihnen für ihre Gedult.</p>
						<img src='./images/modelOverlay.png' alt='model overlay' />
						{isModelLoading && <p className='loadingText'>LOADING ...</p>}
					</div>
				)}
				{isModelActive && <ModelCanvas />}
				{isThreeJsDataDebuggerActive && <ThreeJsDataDebugger />}
				{isWizardDataDebuggerActive && <WizardDataDebugger />}
			</div>
		</ThemeProvider>
	);
}

export default App;
