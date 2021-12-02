import * as THREE from 'three';
// npm install three

export type RoomListItem = {
	model: {
		meshName: string;
		camPos: THREE.Vector3;
		camTarget: THREE.Vector3;
	};
	card: {
		id: number;
		title: string;
		seats: number;
		area: number;
		height: number;
		chairFormations?: string[];
	};
};

export type RoomListModel = {
	meshName: string;
	camPos: THREE.Vector3;
	camTarget: THREE.Vector3;
};

export const CHAIR_FORMATION = {
	shuffle: 'chair_formation_shuffle',
	square: 'chair_formation_square',
	circle: 'chair_formation_circle',
};

const camHeightOffset = 15;

export const roomList = [
	{
		model: {
			meshName: 'room_1',
			camPos: new THREE.Vector3(-3.8, -0.5 + camHeightOffset, 4),
			camTarget: new THREE.Vector3(-3.8, -0.5, 4),
		},
		card: {
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
		},
		card: {
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
		},
		card: {
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
		},
		card: {
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
		},
		card: {
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
		},
		card: {
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
		},
		card: {
			id: 7,
			title: 'BREAKOUT ROOM 4',
			seats: 1989,
			area: 760,
			height: 12,
		},
	},
];
