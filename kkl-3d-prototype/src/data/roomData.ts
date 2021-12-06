import * as THREE from 'three';
import { camHeightOffset } from '../store/useCameraStore';
// npm install three

export type RoomItemsList = {
	model: {
		meshName: string;
		camPos: THREE.Vector3;
		camTarget: THREE.Vector3;
		camAngle: number;
	};
	info: {
		id: number;
		title: string;
		seats: number;
		area: number;
		height: number;
		chairFormations?: string[];
	};
};

export type RoomModelsList = {
	meshName: string;
	camPos: THREE.Vector3;
	camTarget: THREE.Vector3;
	camAngle: number;
};

export type RoomInfosList = {
	id: number;
	title: string;
	seats: number;
	area: number;
	height: number;
	chairFormations?: string[];
};

export const CHAIR_FORMATION = {
	shuffle: 'chair_formation_shuffle',
	square: 'chair_formation_square',
	circle: 'chair_formation_circle',
};

export const roomList = [
	{
		model: {
			meshName: 'room_1',
			camPos: new THREE.Vector3(-3.8, -0.5 + camHeightOffset, 4),
			camTarget: new THREE.Vector3(-3.8, -0.5, 4),
			camAngle: 0,
		},
		info: {
			id: 1,
			title: 'LUZERNER SAAL',
			seats: 1989,
			area: 760,
			height: 12,
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.square, CHAIR_FORMATION.circle],
		},
	},
	{
		model: {
			meshName: 'room_2',
			camPos: new THREE.Vector3(-3.8, -0.5 + camHeightOffset, 0),
			camTarget: new THREE.Vector3(-3.8, -0.5, 0),
			camAngle: 90,
		},
		info: {
			id: 2,
			title: 'KONZERTSAAL',
			seats: 1989,
			area: 760,
			height: 12,
		},
	},
	{
		model: {
			meshName: 'room_3',
			camPos: new THREE.Vector3(-3.8, -0.5 + camHeightOffset, -4),
			camTarget: new THREE.Vector3(-3.8, -0.5, -4),
			camAngle: 180,
		},
		info: {
			id: 3,
			title: 'AUDITORIUM',
			seats: 1989,
			area: 760,
			height: 12,
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.square, CHAIR_FORMATION.circle],
		},
	},
	{
		model: {
			meshName: 'room_4',
			camPos: new THREE.Vector3(0.4, -0.5 + camHeightOffset, 4),
			camTarget: new THREE.Vector3(0.4, -0.5, 4),
			camAngle: 0,
		},
		info: {
			id: 4,
			title: 'BREAKOUT ROOM 1',
			seats: 1989,
			area: 760,
			height: 12,
		},
	},
	{
		model: {
			meshName: 'room_5',
			camPos: new THREE.Vector3(0.4, -0.5 + camHeightOffset, 0),
			camTarget: new THREE.Vector3(0.4, -0.5, 0),
			camAngle: 90,
		},
		info: {
			id: 5,
			title: 'BREAKOUT ROOM 2',
			seats: 1989,
			area: 760,
			height: 12,
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.square],
		},
	},
	{
		model: {
			meshName: 'room_6',
			camPos: new THREE.Vector3(0.4, -0.5 + camHeightOffset, -4),
			camTarget: new THREE.Vector3(0.4, -0.5, -4),
			camAngle: 180,
		},
		info: {
			id: 6,
			title: 'BREAKOUT ROOM 3',
			seats: 1989,
			area: 760,
			height: 12,
		},
	},
	{
		model: {
			meshName: 'room_7',
			camPos: new THREE.Vector3(3.9, -0.5 + camHeightOffset, -4),
			camTarget: new THREE.Vector3(3.9, -0.5, -4),
			camAngle: 90,
		},
		info: {
			id: 7,
			title: 'BREAKOUT ROOM 4',
			seats: 1989,
			area: 760,
			height: 12,
		},
	},
];

export const roomModelList = roomList.map((room) => room.model);
export const roomInfoList = roomList.map((room) => room.info);
