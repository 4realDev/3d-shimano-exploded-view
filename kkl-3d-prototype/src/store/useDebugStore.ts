import create from 'zustand';

interface DebugStore {
	isWizardDataDebuggerActive: boolean;
	isThreeJsDataDebuggerActive: boolean;
	isCameraPositionMarkersActive: boolean;
	isStatesActive: boolean;
	isAxisHelperActive: boolean;
	isBoxHelperActive: boolean;
	isLineSegementMaterialActive: boolean;
	isCameraBackLerpingActive: boolean;
}

export const useDebugStore = create<DebugStore>((set) => ({
	isWizardDataDebuggerActive: false,
	isThreeJsDataDebuggerActive: false,
	isCameraPositionMarkersActive: false,
	isStatesActive: false,
	isAxisHelperActive: false,
	isBoxHelperActive: false,
	isLineSegementMaterialActive: false,
	isCameraBackLerpingActive: false,
}));

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

export const toggleIsLineSegmentMaterialActive = () => {
	useDebugStore.setState({
		isLineSegementMaterialActive: !useDebugStore.getState().isLineSegementMaterialActive,
	});
};

export const toggleIsCameraBackLerpingActive = () => {
	useDebugStore.setState({
		isCameraBackLerpingActive: !useDebugStore.getState().isCameraBackLerpingActive,
	});
};
