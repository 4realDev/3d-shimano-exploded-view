import * as THREE from 'three';
import create from 'zustand';
import { RoomModelsList } from '../data/roomData';
import { resetMeshVisibility, setMeshVisibility } from './useMeshStore';

export const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
export const defaultCameraTargetPosition = new THREE.Vector3(0, 0, 0);
export const defaultCameraAngle = 0;
export const camHeightOffset = 15;

// Define a type for the slice state
interface CameraStore {
	cameraPosition: THREE.Vector3;
	cameraTarget: THREE.Vector3;
	cameraAngle: number;
	hasAnimation: boolean;
	hoveredMesh: string | null;
	clickedMesh: string | null;
	selectedMeshes: string[];
}

export const useCameraStore = create<CameraStore>((set) => ({
	cameraPosition: defaultCameraPosition,
	cameraTarget: defaultCameraTargetPosition,
	cameraAngle: defaultCameraAngle,
	hasAnimation: true,
	hoveredMesh: null,
	clickedMesh: null,
	selectedMeshes: [],
}));

export const setSelectedMeshes = (selectedMeshes: string[]) =>
	useCameraStore.setState((state) => ({ selectedMeshes: selectedMeshes }));

export const setCameraPosition = (cameraPosition: THREE.Vector3) => {
	useCameraStore.setState((state) => ({ cameraPosition: cameraPosition }));
};

export const setCameraTarget = (cameraTarget: THREE.Vector3) => {
	useCameraStore.setState((state) => ({ cameraTarget: cameraTarget }));
};

export const setCameraAngle = (cameraAngle: number) => {
	useCameraStore.setState((state) => ({ cameraAngle: cameraAngle }));
};

export const setHasAnimation = (hasAnimation: boolean) => {
	useCameraStore.setState((state) => ({ hasAnimation: hasAnimation }));
};

export const showClickedRoom = (roomModels: RoomModelsList[], clickedMesh: string) => {
	// setIdleState(false);
	setHasAnimation(true);
	setMeshVisibility('roof', false);
	const clickedRoom = roomModels.find((room) => {
		if (room.meshName === clickedMesh) return room;
	});
	if (typeof clickedRoom != 'undefined') {
		setSelectedMeshes([clickedRoom.meshName]);
		setCameraPosition(clickedRoom.camPos);
		setCameraTarget(clickedRoom.camTarget);
		setCameraAngle(clickedRoom.camAngle);
	}
};

export const showAllRoomsFromAbove = () => {
	// setIdleState(false);
	setHasAnimation(true);
	setMeshVisibility('roof', false);
	setCameraPosition(new THREE.Vector3(0, 25, 2));
	setCameraTarget(defaultCameraTargetPosition);
	setCameraAngle(0);
};

export const showAndSelectAllRooms = (roomListModel: RoomModelsList[]) => {
	// setIdleState(false);
	setHasAnimation(true);
	setMeshVisibility('roof', false);
	setSelectedMeshes(roomListModel.map((room) => room.meshName));
	setCameraPosition(new THREE.Vector3(0, 25 + camHeightOffset, 2));
	setCameraTarget(defaultCameraTargetPosition);
	setCameraAngle(0);
};

export const resetScene = () => {
	// setIdleState(true);
	setHasAnimation(true);
	resetMeshVisibility();
	setSelectedMeshes([]);
	setCameraPosition(defaultCameraPosition);
	setCameraTarget(defaultCameraTargetPosition);
	setCameraAngle(defaultCameraAngle);

	// TODO: Figure out better way to deactivate hasAnimation
	// after the position as damped to the defaultCameraPosition
	// setTimeout(() => {
	// 	setIdleState(true);
	// 	setHasAnimation(false);
	// }, 2250);
};
