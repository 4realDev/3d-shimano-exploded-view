import create from 'zustand';

interface MeshState {
	isExplodedViewActive: boolean;
	isAnnotationActive: boolean;
	isResizedContentClosed: boolean;
	isCameraBackLerpingActive: boolean;
}

export const useMeshStore = create<MeshState>((set, get) => ({
	isExplodedViewActive: false,
	isAnnotationActive: false,
	isResizedContentClosed: false,
	isCameraBackLerpingActive: false,
}));

export const toggleIsExplodedViewActive = () => {
	useMeshStore.setState({
		isExplodedViewActive: !useMeshStore.getState().isExplodedViewActive,
	});
};

export const toggleIsAnnotationActive = (activeState?: boolean) => {
	useMeshStore.setState({
		isAnnotationActive:
			activeState !== undefined ? activeState : !useMeshStore.getState().isAnnotationActive,
	});
};

export const setIsAnnotationActive = (activeState: boolean) => {
	useMeshStore.setState({
		isAnnotationActive: activeState,
	});
};

export const toggleIsResizedContentClosed = (activeState: boolean) => {
	useMeshStore.setState({
		isResizedContentClosed: activeState,
	});
};

export const toggleIsCameraBackLerpingActive = () => {
	useMeshStore.setState({
		isCameraBackLerpingActive: !useMeshStore.getState().isCameraBackLerpingActive,
	});
};
