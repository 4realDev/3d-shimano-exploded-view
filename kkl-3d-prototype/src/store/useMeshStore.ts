import create from 'zustand';

interface MeshState {
	isExplodedViewActive: boolean;
	isAnnotationActive: boolean;
	isResizedContentClosed: boolean;

	hoveredMesh: string | null;
	selectedMesh: string | null;
	selectedMeshes: string[];
	filteredMeshes: string[];
}

export const useMeshStore = create<MeshState>((set, get) => ({
	isExplodedViewActive: false,
	isAnnotationActive: false,
	isResizedContentClosed: false,
	isCameraBackLerpingActive: false,
	hoveredMesh: null,
	selectedMesh: null,
	selectedMeshes: [],
	filteredMeshes: [],
}));

export const setSelectedMeshes = (selectedMeshes: string[]) =>
	useMeshStore.setState((state) => ({ selectedMeshes: selectedMeshes }));

export const setFilteredMeshes = (filteredMeshes: string[]) =>
	useMeshStore.setState((state) => ({ filteredMeshes: filteredMeshes }));

export const setHoveredMesh = (hoveredMesh: string | null) =>
	useMeshStore.setState((state) => ({ hoveredMesh: hoveredMesh }));

export const setSelectedMesh = (selectedMesh: string | null) =>
	useMeshStore.setState((state) => ({
		selectedMesh: selectedMesh === state.selectedMesh ? null : selectedMesh,
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
