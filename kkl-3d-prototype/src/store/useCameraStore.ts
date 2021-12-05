import * as THREE from 'three';
import create from 'zustand';
import { RoomModelsList } from '../data/roomData';
import { resetMeshVisibility, setMeshVisibility } from './useMeshStore';

export const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
export const defaultCameraFocusPosition = new THREE.Vector3(0, 0, 0);
export const camHeightOffset = 15;

// Define a type for the slice state
interface CameraStore {
	cameraPosition: THREE.Vector3;
	cameraTarget: THREE.Vector3;
	hasAnimation: boolean;
	hoveredMesh: string | null;
	clickedMesh: string | null;
	selectedMeshes: string[];
}

export const useCameraStore = create<CameraStore>((set) => ({
	cameraPosition: defaultCameraPosition,
	cameraTarget: defaultCameraFocusPosition,
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

export const setHasAnimation = (hasAnimation: boolean) => {
	useCameraStore.setState((state) => ({ hasAnimation: hasAnimation }));
};

export const showAllRoomsFromAbove = () => {
	// setIdleState(false);
	useCameraStore.setState((state) => ({ hasAnimation: true, cameraPosition: new THREE.Vector3(0, 25, 2) }));
};

export const showClickedRoom = (roomModels: RoomModelsList[], clickedMesh: string) => {
	// setIdleState(false);
	useCameraStore.setState((state) => ({ hasAnimation: true }));
	const clickedRoom = roomModels.find((room) => {
		if (room.meshName === clickedMesh) return room;
	});
	if (typeof clickedRoom != 'undefined') {
		useCameraStore.setState((state) => ({
			cameraPosition: clickedRoom.camPos,
			cameraTarget: clickedRoom.camTarget,
			selectedMeshes: [clickedRoom.meshName],
		}));
	}
};

export const showAndSelectAllRooms = (roomListModel: RoomModelsList[]) => {
	// setIdleState(false);
	setHasAnimation(true);
	setMeshVisibility('roof', false);
	setSelectedMeshes(roomListModel.map((room) => room.meshName));
	setCameraPosition(new THREE.Vector3(0, 25 + camHeightOffset, 2));
	setCameraTarget(defaultCameraFocusPosition);
};

export const resetScene = () => {
	setHasAnimation(true);
	setCameraPosition(defaultCameraPosition);
	setCameraTarget(defaultCameraFocusPosition);
	setSelectedMeshes([]);
	resetMeshVisibility();

	// TODO: Figure out better way to deactivate hasAnimation
	// after the position as damped to the defaultCameraPosition
	// setTimeout(() => {
	// 	setIdleState(true);
	// 	setHasAnimation(false);
	// }, 2250);
};
