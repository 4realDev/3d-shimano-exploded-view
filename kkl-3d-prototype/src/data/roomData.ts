import * as THREE from 'three';

export type RoomFetchedDataType = {
	model: {
		meshName: INTERACTABLE_MESH_NAMES;
		camPos: THREE.Vector3;
		camTarget: THREE.Vector3;
		camPosEv: THREE.Vector3;
		camTargetEv: THREE.Vector3;
		markerPos?: THREE.Vector3;
		markerPosEv?: THREE.Vector3;
	};
	info: {
		title: string;
		articleIndex: number;
		articleNr: string;
		category: string;
		group: string;
		price: number;
	};
};

export type ChairFormationType = {
	name: CHAIR_FORMATION;
	capacity: number;
};

export enum INTERACTABLE_MESH_NAMES {
	concertRoom = 'derailleur26',
	luzernerRoom = 'derailleur27',
	clubroom = 'derailleur14',
	businessMediaRoom = 'derailleur03',
	auditorium = 'derailleur05',
	entryFoyer = 'derailleur04',
	newPart = 'derailleur15',
	roof = 'roof',
}

export enum CHAIR_FORMATION {
	concert = 'chair_formation_concert',
	seminar = 'chair_formation_seminar',
	bankett = 'chair_formation_bankett',
}

export enum EQUIPMENT {
	stage = 'equipment_stage',
	podium = 'equipment_podium',
	beamer = 'equipment_beamer',
}

export enum ROOM_FITTINGS {
	catering = 'catering',
	apero = 'apero',
	accessibleEnv = 'accessibleEnv',
	seats = 'seats',
	noSeats = 'noSeats',
	exhibition = 'exhibition',
}

export enum ROOM_ADDITIONS_CATEGORY {
	chair_formation = 'chair_formation',
	equipment = 'equipment',
}

export enum EVENT_TYPES {
	all = 'all',
	concert = 'concert',
	apero = 'apero',
	congress = 'congress',
	exhibition = 'exhibition',
	meeting = 'meeting',
	workshop = 'workshop',
}

export const camHeightOffset = 15;

export const roomList: RoomFetchedDataType[] = [
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.concertRoom,
			camPos: new THREE.Vector3(-0.925, -3.825, 5),
			camTarget: new THREE.Vector3(-0.925, -3.825, -1),
			camPosEv: new THREE.Vector3(-1.95, -3.825, 5),
			camTargetEv: new THREE.Vector3(-1.95, -3.825, -1),
			markerPos: new THREE.Vector3(1, 0, 0),
			markerPosEv: new THREE.Vector3(1.25, 0, 0),
		},
		info: {
			title: 'Unteres Zahnrad',
			articleIndex: 1,
			articleNr: '5UG 9801',
			price: 23.5,
			category: 'Bike-Parts',
			group: 'Mechanical',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.luzernerRoom,
			camPos: new THREE.Vector3(0.35, -0.5, 6.35),
			camTarget: new THREE.Vector3(0.35, -0.5, -1),
			camPosEv: new THREE.Vector3(-0.65, -0.5, 4.35),
			camTargetEv: new THREE.Vector3(-0.65, -0.5, -1),
			markerPos: new THREE.Vector3(-1.5, 0, 0),
			markerPosEv: new THREE.Vector3(1, 0, 0),
		},
		info: {
			title: 'Oberes Zahnrad',
			articleIndex: 2,
			articleNr: '5UG 9801',
			price: 23.5,
			category: 'Bike-Parts',
			group: 'Mechanical',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.newPart,
			camPos: new THREE.Vector3(2.75, 1, 5.4),
			camTarget: new THREE.Vector3(1, -0.25, 0.4),
			camPosEv: new THREE.Vector3(1.25, 4.5, 3.75),
			camTargetEv: new THREE.Vector3(0.1, 3.5, 0.75),
			markerPos: new THREE.Vector3(-1.75, 0, 0),
			markerPosEv: new THREE.Vector3(-0.75, 0, 0),
		},
		info: {
			title: 'Connector #0',
			articleIndex: 3,
			articleNr: '5UG 9801',
			price: 23.5,
			category: 'Bike-Parts',
			group: 'Mechanical',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.businessMediaRoom,
			camPos: new THREE.Vector3(1.25, 1, 5.25),
			camTarget: new THREE.Vector3(0, 0, 1.25),
			camPosEv: new THREE.Vector3(-1.75, 4.5, 4.9),
			camTargetEv: new THREE.Vector3(-1.75, 4, 0.9),
			markerPos: new THREE.Vector3(-1, 0, 0),
			markerPosEv: new THREE.Vector3(-1.25, 0.25, 0),
		},
		info: {
			title: 'Connector #1',
			articleIndex: 4,
			articleNr: '5UG 9801',
			price: 23.5,
			category: 'Bike-Parts',
			group: 'Mechanical',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.auditorium,
			camPos: new THREE.Vector3(-2, 1.4, 6),
			camTarget: new THREE.Vector3(-1.5, 0.8, 1),
			camPosEv: new THREE.Vector3(-3.75, 5.5, 5),
			camTargetEv: new THREE.Vector3(-3.75, 5, 1),
			markerPos: new THREE.Vector3(-1.25, 0, 0),
			markerPosEv: new THREE.Vector3(-1.25, 0.25, 0),
		},
		info: {
			title: 'Connector #2',
			articleIndex: 5,
			articleNr: '5UG 9801',
			price: 23.5,
			category: 'Bike-Parts',
			group: 'Mechanical',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.clubroom,
			camPos: new THREE.Vector3(3.9, -0.8, 4),
			camTarget: new THREE.Vector3(1.9, -1.3, 1),
			camPosEv: new THREE.Vector3(3.25, 3.63, 4.29),
			camTargetEv: new THREE.Vector3(1.9, 2.3, 1),
			markerPos: new THREE.Vector3(-1, 0.5, 1),
			markerPosEv: new THREE.Vector3(-1.5, 1, 0.75),
		},
		info: {
			title: 'Akkumulator',
			articleIndex: 6,
			articleNr: '5UG 9801',
			price: 23.5,
			category: 'Bike-Parts',
			group: 'Mechanical',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.entryFoyer,
			camPos: new THREE.Vector3(1, 0.25, 4.4),
			camTarget: new THREE.Vector3(1, -0.25, 0.4),
			camPosEv: new THREE.Vector3(1.3022, 4.848, 3.176),
			camTargetEv: new THREE.Vector3(0.75, 5, 0.75),
			markerPos: new THREE.Vector3(0, 0, 0),
			markerPosEv: new THREE.Vector3(-0.75, 0, -0.75),
		},
		info: {
			title: 'Schutzplatte',
			articleIndex: 7,
			articleNr: '5UG 9801',
			price: 23.5,
			category: 'Bike-Parts',
			group: 'Mechanical',
		},
	},
];
