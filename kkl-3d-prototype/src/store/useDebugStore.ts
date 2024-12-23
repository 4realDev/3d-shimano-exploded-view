import create from 'zustand';

interface DebugStore {
	isExplodedViewActive: boolean;
	isAnnotationActive: boolean;
	isResizedContentClosed: boolean;
	isCameraBackLerpingActive: boolean;
}

export const useDebugStore = create<DebugStore>((set) => ({
	isExplodedViewActive: false,
	isAnnotationActive: false,
	isResizedContentClosed: false,
	isCameraBackLerpingActive: false,
}));

export const toggleIsExplodedViewActive = () => {
	useDebugStore.setState({
		isExplodedViewActive: !useDebugStore.getState().isExplodedViewActive,
	});
};

export const toggleIsAnnotationActive = (activeState?: boolean) => {
	useDebugStore.setState({
		isAnnotationActive:
			activeState !== undefined ? activeState : !useDebugStore.getState().isAnnotationActive,
	});
};

export const setIsAnnotationActive = (activeState: boolean) => {
	useDebugStore.setState({
		isAnnotationActive: activeState,
	});
};

export const toggleIsResizedContentClosed = (activeState: boolean) => {
	useDebugStore.setState({
		isResizedContentClosed: activeState,
	});
};

export const toggleIsCameraBackLerpingActive = () => {
	useDebugStore.setState({
		isCameraBackLerpingActive: !useDebugStore.getState().isCameraBackLerpingActive,
	});
};
