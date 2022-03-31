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
		personCapacity: number | [number, number];
		area: number;
		img: string;
		chairFormations?: { name: CHAIR_FORMATION; capacity: number }[];
		equipment?: EQUIPMENT[];
		fittings?: ROOM_FITTINGS[];
		fittingEventTypes?: EVENT_TYPES[];
		fittingSideRooms?: INTERACTABLE_MESH_NAMES[];
		bookedDates: { start: string; end: string }[];
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
			personCapacity: 1898,
			area: 17823,
			chairFormations: [{ name: CHAIR_FORMATION.concert, capacity: 1898 }],
			img: './images/Konzertsaal.jpg',
			equipment: [EQUIPMENT.stage, EQUIPMENT.podium],
			fittings: [ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.seats],
			fittingEventTypes: [EVENT_TYPES.concert],
			// fittingSideRooms: [INTERACTABLE_MESH_NAMES.clubroom, INTERACTABLE_MESH_NAMES.businessMediaRoom],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-22', end: '2022-02-24' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.luzernerRoom,
			camPos: new THREE.Vector3(0.35, -0.5, -6.35),
			camTarget: new THREE.Vector3(0.35, -0.5, -1.35),
			camPosEv: new THREE.Vector3(-0.65, -0.5, 4.35),
			camTargetEv: new THREE.Vector3(-0.65, -0.5, -1.35),
			markerPos: new THREE.Vector3(-1.5, 0, 0),
			markerPosEv: new THREE.Vector3(1, 0, 0),
		},
		info: {
			title: 'Oberes Zahnrad',
			personCapacity: [470, 1044],
			area: 760,
			img: './images/LuzernerSaal.jpg',
			equipment: [EQUIPMENT.stage, EQUIPMENT.podium, EQUIPMENT.beamer],
			chairFormations: [
				{ name: CHAIR_FORMATION.bankett, capacity: 940 },
				{ name: CHAIR_FORMATION.seminar, capacity: 470 },
				{ name: CHAIR_FORMATION.concert, capacity: 1044 },
			],
			fittings: [
				ROOM_FITTINGS.catering,
				ROOM_FITTINGS.apero,
				ROOM_FITTINGS.accessibleEnv,
				ROOM_FITTINGS.seats,
				ROOM_FITTINGS.exhibition,
			],
			fittingEventTypes: [EVENT_TYPES.concert, EVENT_TYPES.congress, EVENT_TYPES.apero],
			// fittingSideRooms: [
			// 	INTERACTABLE_MESH_NAMES.entryFoyer,
			// 	INTERACTABLE_MESH_NAMES.clubroom,
			// 	INTERACTABLE_MESH_NAMES.businessMediaRoom,
			// ],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-22', end: '2022-02-24' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.businessMediaRoom,
			camPos: new THREE.Vector3(2, 1, 4.75),
			camTarget: new THREE.Vector3(0, 0, 1.25),
			camPosEv: new THREE.Vector3(-1.75, 4.5, 4.9),
			camTargetEv: new THREE.Vector3(-1.75, 4, 0.9),
			markerPos: new THREE.Vector3(-1, 0, 0),
			markerPosEv: new THREE.Vector3(-1, 0.25, 0),
		},
		info: {
			title: 'Connector #1',
			personCapacity: 200,
			area: 520,
			img: './images/EingangsFoyer.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			fittings: [ROOM_FITTINGS.apero, ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.noSeats],
			fittingEventTypes: [EVENT_TYPES.apero],
			// fittingSideRooms: [INTERACTABLE_MESH_NAMES.entryFoyer, INTERACTABLE_MESH_NAMES.businessMediaRoom],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-22', end: '2022-02-24' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.auditorium,
			camPos: new THREE.Vector3(-4, 3.4, 6),
			camTarget: new THREE.Vector3(-1, 0.4, 1),
			camPosEv: new THREE.Vector3(-3.75, 5.5, 5),
			camTargetEv: new THREE.Vector3(-3.75, 5, 1),
			markerPos: new THREE.Vector3(-1.25, 0, 0),
			markerPosEv: new THREE.Vector3(-1.25, 0.25, 0),
		},
		info: {
			title: 'Connector #2',
			personCapacity: 271,
			area: 200,
			img: './images/Auditorium.jpg',
			equipment: [EQUIPMENT.podium],
			chairFormations: [{ name: CHAIR_FORMATION.concert, capacity: 200 }],
			fittings: [ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.seats],
			fittingEventTypes: [EVENT_TYPES.congress, EVENT_TYPES.exhibition, EVENT_TYPES.workshop],
			// fittingSideRooms: [INTERACTABLE_MESH_NAMES.entryFoyer, INTERACTABLE_MESH_NAMES.businessMediaRoom],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-22', end: '2022-02-24' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.clubroom,
			camPos: new THREE.Vector3(3.9, -0.8, 4),
			camTarget: new THREE.Vector3(1.9, -1.3, 1),
			camPosEv: new THREE.Vector3(2.59, 3.63, 4.29),
			camTargetEv: new THREE.Vector3(1.9, 2.3, 1),
			markerPos: new THREE.Vector3(-1, 0.5, 1),
			markerPosEv: new THREE.Vector3(-1.5, 1, 0.75),
		},
		info: {
			title: 'Akkumulator',
			personCapacity: [120, 300],
			area: 250,
			img: './images/Clubraeume.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			chairFormations: [
				{ name: CHAIR_FORMATION.seminar, capacity: 120 },
				{ name: CHAIR_FORMATION.bankett, capacity: 160 },
			],
			fittings: [
				ROOM_FITTINGS.catering,
				ROOM_FITTINGS.apero,
				ROOM_FITTINGS.accessibleEnv,
				ROOM_FITTINGS.seats,
				ROOM_FITTINGS.exhibition,
			],
			fittingEventTypes: [EVENT_TYPES.apero, EVENT_TYPES.exhibition, EVENT_TYPES.meeting, EVENT_TYPES.workshop],
			// fittingSideRooms: [INTERACTABLE_MESH_NAMES.entryFoyer, INTERACTABLE_MESH_NAMES.businessMediaRoom],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-22', end: '2022-02-24' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.entryFoyer,
			camPos: new THREE.Vector3(1.75, 0, 1.4),
			camTarget: new THREE.Vector3(1.75, -0.25, 0.4),
			camPosEv: new THREE.Vector3(1.3022, 4.848, 3.176),
			camTargetEv: new THREE.Vector3(0.75, 5, 0.75),
			markerPos: new THREE.Vector3(0, 0, 0),
			markerPosEv: new THREE.Vector3(0.5, 0, 0),
		},
		info: {
			title: 'Schutzplatte',
			personCapacity: 200,
			area: 520,
			img: './images/EingangsFoyer.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			fittings: [ROOM_FITTINGS.apero, ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.noSeats],
			fittingEventTypes: [EVENT_TYPES.apero],
			// fittingSideRooms: [INTERACTABLE_MESH_NAMES.entryFoyer, INTERACTABLE_MESH_NAMES.businessMediaRoom],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-22', end: '2022-02-24' },
			],
		},
	},
];
