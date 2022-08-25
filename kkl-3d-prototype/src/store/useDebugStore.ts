import create from 'zustand';

interface DebugStore {
	isWizardDataDebuggerActive: boolean;
	isThreeJsDataDebuggerActive: boolean;
	isCameraPositionMarkersActive: boolean;
	isCameraPositionMarkersEvActive: boolean;
	isStatesActive: boolean;
	isAxisHelperActive: boolean;
	isBoxHelperActive: boolean;
	isLineSegementMaterialActive: boolean;
	isExplodedViewActive: boolean;
	isMaterialActive: boolean;
	isAnnotationActive: boolean;
	isCameraBackLerpingActive: boolean;
	isResizedContentClosed: boolean;
}

export const useDebugStore = create<DebugStore>((set) => ({
	isWizardDataDebuggerActive: false,
	isThreeJsDataDebuggerActive: false,
	isCameraPositionMarkersActive: false,
	isCameraPositionMarkersEvActive: false,
	isStatesActive: false,
	isAxisHelperActive: false,
	isBoxHelperActive: false,
	isLineSegementMaterialActive: false,
	isExplodedViewActive: false,
	isMaterialActive: false,
	isAnnotationActive: false,
	isCameraBackLerpingActive: false,
	isResizedContentClosed: false,
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

export const toggleIsCameraPositionMarkersEvActive = () => {
	useDebugStore.setState({
		isCameraPositionMarkersEvActive: !useDebugStore.getState().isCameraPositionMarkersEvActive,
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

export const toggleIsExplodedViewActive = () => {
	useDebugStore.setState({
		isExplodedViewActive: !useDebugStore.getState().isExplodedViewActive,
	});
};

export const toggleIsMaterialActive = () => {
	useDebugStore.setState({
		isMaterialActive: !useDebugStore.getState().isMaterialActive,
	});
};

export const toggleIsAnnotationActive = (activeState?: boolean) => {
	useDebugStore.setState({
		isAnnotationActive: activeState !== undefined ? activeState : !useDebugStore.getState().isAnnotationActive,
	});
};

export const setIsAnnotationActive = (activeState: boolean) => {
	useDebugStore.setState({
		isAnnotationActive: activeState,
	});
};

export const toggleIsCameraBackLerpingActive = () => {
	useDebugStore.setState({
		isCameraBackLerpingActive: !useDebugStore.getState().isCameraBackLerpingActive,
	});
};

export const toggleIsResizedContentClosed = (activeState: boolean) => {
	useDebugStore.setState({
		isResizedContentClosed: activeState,
	});
};
