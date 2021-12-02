import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as THREE from 'three';
import { RoomListModel } from '../../data/roomData';

const defaultCameraPosition = new THREE.Vector3(20, 15, 0);
const defaultCameraFocusPosition = new THREE.Vector3(0, 0, 0);

// Define a type for the slice state
interface CameraState {
	cameraPosition: THREE.Vector3;
	cameraTarget: THREE.Vector3;
	hasAnimation: boolean;
	hoveredMesh: string | null;
	clickedMesh: string | null;
	selectedMeshes: string[];
}

// Define the initial state using that type
const initialState: CameraState = {
	cameraPosition: defaultCameraPosition,
	cameraTarget: defaultCameraFocusPosition,
	hasAnimation: true,
	hoveredMesh: null,
	clickedMesh: null,
	selectedMeshes: [],
};

export const cameraSlice = createSlice({
	name: 'camera',
	initialState,
	reducers: {
		setSelectedMeshesInStore: (state, { payload }: PayloadAction<string[]>) => {
			state.selectedMeshes = payload;
		},

		setCameraPositionInStore: (state, { payload }: PayloadAction<THREE.Vector3>) => {
			state.cameraPosition = payload;
		},

		setCameraTargetInStore: (state, { payload }: PayloadAction<THREE.Vector3>) => {
			state.cameraTarget = payload;
		},

		setHasAnimationInStore: (state, { payload }: PayloadAction<boolean>) => {
			state.hasAnimation = payload;
		},

		showAllRoomsFromAbove: (state) => {
			// setIdleState(false);
			state.hasAnimation = true;
			state.cameraPosition = new THREE.Vector3(0, 25, 2);
		},

		showClickedRoom: (state, { payload }: PayloadAction<{ roomModels: RoomListModel[]; clickedMesh: string }>) => {
			// setIdleState(false);
			state.hasAnimation = true;
			const clickedRoom = payload.roomModels.find((room) => {
				if (room.meshName === payload.clickedMesh) return room;
			});
			if (typeof clickedRoom != 'undefined') {
				state.cameraPosition = clickedRoom.camPos;
				state.cameraTarget = clickedRoom.camTarget;
				state.selectedMeshes = [clickedRoom.meshName];
			}
		},
	},
});

export const {
	setSelectedMeshesInStore,
	setCameraPositionInStore,
	setCameraTargetInStore,
	setHasAnimationInStore,
	showAllRoomsFromAbove,
	showClickedRoom,
} = cameraSlice.actions;
export default cameraSlice.reducer;
