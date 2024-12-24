import './App.scss';

import Selection from './components/blocks/Selection/Selection';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import ModelCanvas from './components/blocks/ModelCanvas/ModelCanvas';
import ResizablePanel from './components/ui/ResizablePanel/ResizablePanel';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className='container'>
				<ResizablePanel>
					<ModelCanvas />
				</ResizablePanel>
				<Selection />
			</div>
		</ThemeProvider>
	);
}

export default App;
