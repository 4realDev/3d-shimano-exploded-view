import * as THREE from 'three';
import create from 'zustand';
import { roomModelList } from '../data/roomData';
import { resetMeshVisibility, setMeshVisibility } from './useMeshStore';

export const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
export const defaultCameraTargetPosition = new THREE.Vector3(0, 0, 0);
export const overviewCameraPosition = new THREE.Vector3(0, 25, 2);
export const camHeightOffset = 15;

interface CameraStore {
	cameraPosition: THREE.Vector3;
	cameraTarget: THREE.Vector3;
	hasAnimation: boolean;
	idleState: boolean;
	hoveredMesh: string | null;
	clickedMesh: string | null;
	selectedMeshes: string[];
	filteredMeshes: string[];
}

export const useCameraStore = create<CameraStore>((set) => ({
	cameraPosition: defaultCameraPosition,
	cameraTarget: defaultCameraTargetPosition,
	hasAnimation: false, // initially false so idleRotation in idleState works
	idleState: true,
	hoveredMesh: null,
	clickedMesh: null,
	selectedMeshes: [],
	filteredMeshes: [],
}));

export const setSelectedMeshes = (selectedMeshes: string[]) =>
	useCameraStore.setState((state) => ({ selectedMeshes: selectedMeshes }));

export const setFilteredMeshes = (filteredMeshes: string[]) =>
	useCameraStore.setState((state) => ({ filteredMeshes: filteredMeshes }));

export const setCameraPosition = (cameraPosition: THREE.Vector3) =>
	useCameraStore.setState((state) => ({ cameraPosition: cameraPosition }));

export const setCameraTarget = (cameraTarget: THREE.Vector3) =>
	useCameraStore.setState((state) => ({ cameraTarget: cameraTarget }));

export const setHasAnimation = (hasAnimation: boolean) =>
	useCameraStore.setState((state) => ({ hasAnimation: hasAnimation }));

export const setIdleState = (idleState: boolean) => useCameraStore.setState((state) => ({ idleState: idleState }));

export const showSelectedRoom = (selectedMesh: string) => {
	setIdleState(false);
	setHasAnimation(true);
	setMeshVisibility('roof', false);
	const clickedRoom = roomModelList.find((room) => {
		if (room.meshName === selectedMesh) return room;
	});
	if (typeof clickedRoom != 'undefined') {
		setSelectedMeshes([clickedRoom.meshName]);
		setCameraPosition(clickedRoom.camPos);
		setCameraTarget(clickedRoom.camTarget);
	}
};

export const showSelectedRooms = (
	selectedMeshes: string[],
	selectMesh = true,
	camPos = overviewCameraPosition,
	camTarget = defaultCameraTargetPosition
) => {
	setIdleState(false);
	setHasAnimation(true);
	setMeshVisibility('roof', false);
	selectMesh && setSelectedMeshes(selectedMeshes);
	setCameraPosition(camPos);
	setCameraTarget(camTarget);
};

export const resetScene = () => {
	setIdleState(true);
	setHasAnimation(true);
	resetMeshVisibility();
	setSelectedMeshes([]);
	setCameraPosition(defaultCameraPosition);
	setCameraTarget(defaultCameraTargetPosition);

	// TODO: Figure out better way to deactivate hasAnimation
	// after the position as damped to the defaultCameraPosition
	// setTimeout(() => {
	// 	setIdleState(true);
	// 	setHasAnimation(false);
	// }, 2250);
};
