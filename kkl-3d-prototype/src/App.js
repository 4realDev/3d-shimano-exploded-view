import './App.scss';

import RoomSelection from './components/blocks/RoomSelection/RoomSelection';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import ModelCanvas from './components/blocks/ModelCanvas/ModelCanvas';
import ThreeJsDataDebugger from './components/debug/ThreeJsDataDebugger/ThreeJsDataDebugger';
import WizardDataDebugger from './components/debug/WizardDataDebugger/WizardDataDebugger';
import { useDebugStore } from './store/useDebugStore';
import ResizablePanel from './components/ui/ResizablePanel/ResizablePanel';

function App() {
	const isThreeJsDataDebuggerActive = useDebugStore((state) => state.isThreeJsDataDebuggerActive);
	const isWizardDataDebuggerActive = useDebugStore((state) => state.isWizardDataDebuggerActive);
	return (
		<ThemeProvider theme={theme}>
			<div className='container'>
				<ResizablePanel>
					<ModelCanvas />
				</ResizablePanel>
				<RoomSelection />
				{isThreeJsDataDebuggerActive && <ThreeJsDataDebugger />}
				{isWizardDataDebuggerActive && <WizardDataDebugger />}
			</div>
		</ThemeProvider>
	);
}

export default App;
