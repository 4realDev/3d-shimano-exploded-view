import * as THREE from 'three';
import create from 'zustand';
import { getMeshObjectInformationsByMeshName } from '../utils/room';
import { setSelectedMeshes, useMeshStore } from './useMeshStore';

export const defaultCameraPosition = new THREE.Vector3(0, 0, 20);
export const defaultCameraTarget = new THREE.Vector3(0, 0, 0);
export const defaultCameraPositionEv = new THREE.Vector3(0, 0, 18);
export const defaultCameraTargetEv = new THREE.Vector3(0, 1.25, 0);

interface CameraStore {
	cameraPosition: THREE.Vector3;
	cameraTarget: THREE.Vector3;
	hasAnimation: boolean;
	idleState: boolean;
	isCameraBackLerpingActive: boolean;
	isCameraPositionMarkersActive: boolean;
	isCameraPositionMarkersExplodedViewActive: boolean;
}

export const useCameraStore = create<CameraStore>((set) => ({
	cameraPosition: defaultCameraPosition,
	cameraTarget: defaultCameraTarget,
	hasAnimation: false, // initially false so idleRotation in idleState works
	idleState: true,
	isCameraBackLerpingActive: false,
	isCameraPositionMarkersActive: false,
	isCameraPositionMarkersExplodedViewActive: false,
}));

export const setCameraPosition = (cameraPosition: THREE.Vector3) =>
	useCameraStore.setState((state) => ({ cameraPosition: cameraPosition }));

export const setCameraTarget = (cameraTarget: THREE.Vector3) =>
	useCameraStore.setState((state) => ({ cameraTarget: cameraTarget }));

export const setHasAnimation = (hasAnimation: boolean) =>
	useCameraStore.setState((state) => ({ hasAnimation: hasAnimation }));

export const setIdleState = (idleState: boolean) =>
	useCameraStore.setState((state) => ({ idleState: idleState }));

export const showAndSelectRoom = (selectedMesh: string) => {
	setIdleState(false);
	setHasAnimation(true);
	const clickedRoom = getMeshObjectInformationsByMeshName(selectedMesh);
	if (typeof clickedRoom != 'undefined') {
		setSelectedMeshes([clickedRoom.model.meshName]);

		let isExplodedViewActive = useMeshStore.getState().isExplodedViewActive;
		setCameraPosition(isExplodedViewActive ? clickedRoom.model.camPosEv : clickedRoom.model.camPos);
		setCameraTarget(
			isExplodedViewActive ? clickedRoom.model.camTargetEv : clickedRoom.model.camTarget
		);
	}
};

export const showRoomsOverview = (
	camPos = defaultCameraPosition,
	camTarget = defaultCameraTarget
) => {
	setIdleState(false);
	setHasAnimation(true);

	let isExplodedViewActive = useMeshStore.getState().isExplodedViewActive;
	setCameraPosition(isExplodedViewActive ? defaultCameraPositionEv : camPos);
	setCameraTarget(isExplodedViewActive ? defaultCameraTargetEv : camTarget);
};
