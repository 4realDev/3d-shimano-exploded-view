import * as THREE from 'three';
// npm install three
import { camHeightOffset } from '../store/useCameraStore';

export type RoomItemsList = {
	model: {
		meshName: string;
		camPos: THREE.Vector3;
		camTarget: THREE.Vector3;
	};
	info: {
		id: number;
		title: string;
		seats: number;
		area: number;
		height: number;
		img: string;
		chairFormations?: string[];
		equipment?: string[];
		fittings?: {
			hasBuffet?: boolean;
			hasService?: boolean;
			hasDrinks?: boolean;
			hasInvalid?: boolean;
			hasSeats?: boolean;
		};
	};
};

export type RoomModelsList = {
	meshName: string;
	camPos: THREE.Vector3;
	camTarget: THREE.Vector3;
};

export type RoomInfosList = {
	id: number;
	title: string;
	seats: number;
	area: number;
	height: number;
	img: string;
	chairFormations?: string[];
	equipment?: string[];
	fittings: {
		hasBuffet: boolean;
		hasService: boolean;
		hasDrinks: boolean;
		hasInvalid: boolean;
		hasSeats: boolean;
	};
};

export enum CHAIR_FORMATION {
	shuffle = 'chair_formation_shuffle',
	square = 'chair_formation_square',
	circle = 'chair_formation_circle',
}

export enum EQUIPMENT {
	stage = 'equipment_stage',
	podium = 'equipment_podium',
}

export enum ROOM_ADDITIONS_CATEGORY {
	chairFormation = 'chair_formation',
	equipment = 'equipment',
}

export const roomList = [
	{
		model: {
			meshName: 'room_1',
			camPos: new THREE.Vector3(-3.8, -6.5 + camHeightOffset, -4),
			camTarget: new THREE.Vector3(-3.8, -0.5, 2),
		},
		info: {
			id: 1,
			title: 'Konzertsaal',
			seats: 1898,
			area: 2100,
			height: 12,
			img: './images/Konzertsaal.jpg',
			chairFormations: [CHAIR_FORMATION.square, CHAIR_FORMATION.circle],
			equipment: [EQUIPMENT.stage, EQUIPMENT.podium],
			fittings: {
				hasService: true,
				hasInvalid: true,
				hasSeats: true,
			},
		},
	},
	{
		model: {
			meshName: 'room_2',
			camPos: new THREE.Vector3(-7.8, -6.5 + camHeightOffset, -8),
			camTarget: new THREE.Vector3(-3.8, -0.5, -4),
		},
		info: {
			id: 2,
			title: 'Luzerner Saal',
			seats: 1044,
			area: 760,
			height: 12,
			img: './images/LuzernerSaal.jpg',
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.square, CHAIR_FORMATION.circle],
			fittings: {
				hasBuffet: true,
				hasInvalid: true,
			},
		},
	},
	{
		model: {
			meshName: 'room_3',
			camPos: new THREE.Vector3(2.4, -6.5 + camHeightOffset, 6),
			camTarget: new THREE.Vector3(0.4, -0.5, 4),
		},
		info: {
			id: 3,
			title: 'Auditorium',
			seats: 271,
			area: 200,
			height: 12,
			img: './images/Auditorium.jpg',
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.circle],
			fittings: {
				hasBuffet: true,
				hasService: true,
				hasDrinks: true,
				hasInvalid: true,
				hasSeats: true,
			},
		},
	},
	{
		model: {
			meshName: 'room_4',
			camPos: new THREE.Vector3(4.4, -0.5 + camHeightOffset, 0),
			camTarget: new THREE.Vector3(0.4, -0.5, 0),
		},
		info: {
			id: 4,
			title: 'BREAKOUT ROOM 1',
			seats: 15,
			area: 32,
			height: 12,
			img: './images/Clubraeume.jpg',
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.square],
			fittings: {
				hasDrinks: true,
				hasInvalid: true,
			},
		},
	},
	{
		model: {
			meshName: 'room_5',
			camPos: new THREE.Vector3(4.4, -6.5 + camHeightOffset, -8),
			camTarget: new THREE.Vector3(0.4, -0.5, -4),
		},
		info: {
			id: 5,
			title: 'BREAKOUT ROOM 2',
			seats: 30,
			area: 48,
			height: 12,
			img: './images/Clubraeume.jpg',
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.square, CHAIR_FORMATION.circle],
			fittings: {
				hasBuffet: true,
				hasService: true,
				hasDrinks: false,
				hasInvalid: true,
				hasSeats: true,
			},
		},
	},
	{
		model: {
			meshName: 'room_6',
			camPos: new THREE.Vector3(4, -4.5 + camHeightOffset, -4),
			camTarget: new THREE.Vector3(3.9, -0.5, -4),
		},
		info: {
			id: 6,
			title: 'BREAKOUT ROOM 3',
			seats: 50,
			area: 65,
			height: 12,
			img: './images/Clubraeume.jpg',
			chairFormations: [CHAIR_FORMATION.square],
			fittings: {
				hasBuffet: true,
				hasDrinks: true,
				hasSeats: true,
			},
		},
	},
];

export const roomModelList = roomList.map((room) => room.model);
export const roomInfoList = roomList.map((room) => room.info);
