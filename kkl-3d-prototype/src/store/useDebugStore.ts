import create from 'zustand';
import { resetScene } from './useCameraStore';
import { resetWizardData, setStep } from './useWizardStore';

interface DebugStore {
	isModelActive: boolean;
	isWizardDataDebuggerActive: boolean;
	isThreeJsDataDebuggerActive: boolean;
	isCameraPositionMarkersActive: boolean;
	isStatesActive: boolean;
	isAxisHelperActive: boolean;
	isBoxHelperActive: boolean;
}

export const useDebugStore = create<DebugStore>((set) => ({
	isModelActive: false,
	isWizardDataDebuggerActive: false,
	isThreeJsDataDebuggerActive: false,
	isCameraPositionMarkersActive: false,
	isStatesActive: false,
	isAxisHelperActive: false,
	isBoxHelperActive: false,
}));

export const toggleIsModelActive = () => {
	useDebugStore.setState({ isModelActive: !useDebugStore.getState().isModelActive });
	setStep(0);
	resetScene(false);
	resetWizardData();
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

export const toggleIsWizardDataDebuggerActive = () => {
	useDebugStore.setState({
		isWizardDataDebuggerActive: !useDebugStore.getState().isWizardDataDebuggerActive,
	});
};

export const toggleIsThreeJsDataDebuggerActive = () => {
	useDebugStore.setState({
		isThreeJsDataDebuggerActive: !useDebugStore.getState().isThreeJsDataDebuggerActive,
	});
};

export const toggleIsCameraPositionMarkersActive = () => {
	useDebugStore.setState({
		isCameraPositionMarkersActive: !useDebugStore.getState().isCameraPositionMarkersActive,
	});
};

export const toggleIsStatesActive = () => {
	useDebugStore.setState({
		isStatesActive: !useDebugStore.getState().isStatesActive,
	});
};

export const toggleIsAxisHelperActive = () => {
	useDebugStore.setState({
		isAxisHelperActive: !useDebugStore.getState().isAxisHelperActive,
	});
};

export const toggleIsBoxHelperActive = () => {
	useDebugStore.setState({
		isBoxHelperActive: !useDebugStore.getState().isBoxHelperActive,
	});
};
