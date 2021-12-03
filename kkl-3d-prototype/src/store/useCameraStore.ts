import * as THREE from 'three';
import create from 'zustand';
import { RoomListModel } from '../data/roomData';
// import { RoomListModel } from '../../data/roomData';

const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
const defaultCameraFocusPosition = new THREE.Vector3(0, 0, 0);

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

export const setSelectedMeshesInStore = (selectedMeshes: string[]) =>
	useCameraStore.setState((state) => ({ selectedMeshes: selectedMeshes }));

export const setCameraPositionInStore = (cameraPosition: THREE.Vector3) => {
	useCameraStore.setState((state) => ({ cameraPosition: cameraPosition }));
};

export const setCameraTargetInStore = (cameraTarget: THREE.Vector3) => {
	useCameraStore.setState((state) => ({ cameraTarget: cameraTarget }));
};

export const setHasAnimationInStore = (hasAnimation: boolean) => {
	useCameraStore.setState((state) => ({ hasAnimation: hasAnimation }));
};

export const showAllRoomsFromAbove = () => {
	// setIdleState(false);
	useCameraStore.setState((state) => ({ hasAnimation: true, cameraPosition: new THREE.Vector3(0, 25, 2) }));
};

export const showClickedRoom = (roomModels: RoomListModel[], clickedMesh: string) => {
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
