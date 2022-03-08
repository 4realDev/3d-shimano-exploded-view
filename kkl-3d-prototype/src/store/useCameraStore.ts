import * as THREE from 'three';
import create from 'zustand';
import { INTERACTABLE_MESH_NAMES } from '../data/roomData';
import { getMeshObjectInformationsByMeshName } from '../utils/room';
import { resetMeshVisibility, setMeshParentVisibility } from './useMeshStore';

export const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
export const defaultCameraTargetPosition = new THREE.Vector3(0, 0, 0);
export const overviewCameraPosition = new THREE.Vector3(0, 25, 2);

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
	cameraTarget: defaultCameraTargetPosition,
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
	setMeshParentVisibility(INTERACTABLE_MESH_NAMES.roof, false);
	const clickedRoom = getMeshObjectInformationsByMeshName(selectedMesh);
	if (typeof clickedRoom != 'undefined') {
		setSelectedMeshes([clickedRoom.model.meshName]);
		setCameraPosition(clickedRoom.model.camPos);
		setCameraTarget(clickedRoom.model.camTarget);
	}
};

export const showAndSelectRooms = (
	selectedMeshes: string[],
	camPos = overviewCameraPosition,
	camTarget = defaultCameraTargetPosition
) => {
	setIdleState(false);
	setHasAnimation(true);
	setMeshParentVisibility(INTERACTABLE_MESH_NAMES.roof, false);
	setSelectedMeshes(selectedMeshes);
	setCameraPosition(camPos);
	setCameraTarget(camTarget);
};

export const showRoomsOverview = (camPos = overviewCameraPosition, camTarget = defaultCameraTargetPosition) => {
	setIdleState(false);
	setHasAnimation(true);
	setMeshParentVisibility(INTERACTABLE_MESH_NAMES.roof, false);
	setCameraPosition(camPos);
	setCameraTarget(camTarget);
};

export const resetScene = (enableInitialAnimation = true) => {
	enableInitialAnimation && setHasAnimation(true);
	resetMeshVisibility();
	setSelectedMeshes([]);
	setFilteredMeshes([]);
	setCameraPosition(defaultCameraPosition);
	setCameraTarget(defaultCameraTargetPosition);
};
