import * as THREE from 'three';
import create from 'zustand';
import { getMeshObjectInformationsByMeshName } from '../utils/room';
import { useDebugStore } from './useDebugStore';

export const defaultCameraPosition = new THREE.Vector3(0, 0, 20);
export const defaultCameraTarget = new THREE.Vector3(0, 0, 0);
export const defaultCameraPositionEv = new THREE.Vector3(0, 0, 18);
export const defaultCameraTargetEv = new THREE.Vector3(0, 1.25, 0);

interface CameraStore {
	cameraPosition: THREE.Vector3;
	cameraTarget: THREE.Vector3;
	hasAnimation: boolean;
	idleState: boolean;
	hoveredMesh: string | null;
	selectedMeshes: string[];
	filteredMeshes: string[];
}

export const useCameraStore = create<CameraStore>((set) => ({
	cameraPosition: defaultCameraPosition,
	cameraTarget: defaultCameraTarget,
	hasAnimation: false, // initially false so idleRotation in idleState works
	idleState: true,
	hoveredMesh: null,
	selectedMeshes: [],
	filteredMeshes: [],
}));

export const setSelectedMeshes = (selectedMeshes: string[]) =>
	useCameraStore.setState((state) => ({ selectedMeshes: selectedMeshes }));

export const setFilteredMeshes = (filteredMeshes: string[]) =>
	useCameraStore.setState((state) => ({ filteredMeshes: filteredMeshes }));

export const setHoveredMesh = (hoveredMesh: string | null) =>
	useCameraStore.setState((state) => ({ hoveredMesh: hoveredMesh }));

export const setCameraPosition = (cameraPosition: THREE.Vector3) =>
	useCameraStore.setState((state) => ({ cameraPosition: cameraPosition }));

export const setCameraTarget = (cameraTarget: THREE.Vector3) =>
	useCameraStore.setState((state) => ({ cameraTarget: cameraTarget }));

export const setHasAnimation = (hasAnimation: boolean) =>
	useCameraStore.setState((state) => ({ hasAnimation: hasAnimation }));

export const setIdleState = (idleState: boolean) => useCameraStore.setState((state) => ({ idleState: idleState }));

export const showAndSelectRoom = (selectedMesh: string) => {
	setIdleState(false);
	setHasAnimation(true);
	const clickedRoom = getMeshObjectInformationsByMeshName(selectedMesh);
	if (typeof clickedRoom != 'undefined') {
		setSelectedMeshes([clickedRoom.model.meshName]);

		let isExplodedViewActive = useDebugStore.getState().isExplodedViewActive;
		setCameraPosition(isExplodedViewActive ? clickedRoom.model.camPosEv : clickedRoom.model.camPos);
		setCameraTarget(isExplodedViewActive ? clickedRoom.model.camTargetEv : clickedRoom.model.camTarget);
	}
};

// TODO: ADJUST CAMPOS AND CAMTAGET TO EXPLODED VIEW AS WELL
export const showAndSelectRooms = (
	selectedMeshes: string[],
	camPos = defaultCameraPosition,
	camTarget = defaultCameraTarget
) => {
	setIdleState(false);
	setHasAnimation(true);
	setSelectedMeshes(selectedMeshes);

	let isExplodedViewActive = useDebugStore.getState().isExplodedViewActive;
	setCameraPosition(isExplodedViewActive ? defaultCameraPositionEv : camPos);
	setCameraTarget(isExplodedViewActive ? defaultCameraTargetEv : camTarget);
};

// TODO: ADJUST CAMPOS AND CAMTAGET TO EXPLODED VIEW AS WELL
export const showRoomsOverview = (camPos = defaultCameraPosition, camTarget = defaultCameraTarget) => {
	setIdleState(false);
	setHasAnimation(true);

	let isExplodedViewActive = useDebugStore.getState().isExplodedViewActive;
	setCameraPosition(isExplodedViewActive ? defaultCameraPositionEv : camPos);
	setCameraTarget(isExplodedViewActive ? defaultCameraTargetEv : camTarget);
};

// TODO: ADJUST CAMPOS AND CAMTAGET TO EXPLODED VIEW AS WELL
export const resetScene = (enableInitialAnimation = true) => {
	enableInitialAnimation && setHasAnimation(true);
	setSelectedMeshes([]);
	setFilteredMeshes([]);
	setCameraPosition(defaultCameraPosition);
	setCameraTarget(defaultCameraTarget);
};
