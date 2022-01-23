import * as THREE from 'three';

export type RoomFetchedDataType = {
	model: {
		meshName: string;
		camPos: THREE.Vector3;
		camTarget: THREE.Vector3;
	};
	info: {
		id: number;
		title: string;
		personCapacity: number | number[];
		area: number;
		height: number;
		img: string;
		chairFormations?: { name: CHAIR_FORMATION; capacity: number }[];
		equipment?: EQUIPMENT[];
		fittings?: ROOM_FITTINGS[];
		fittingEventTypes?: EVENT_TYPES[];
		bookedDates: { start: string; end: string }[];
	};
};

export type ChairFormationType = {
	name: CHAIR_FORMATION;
	capacity: number;
};

export enum INTERACTABLE_MESH_NAMES {
	concertRoom = 'room_1',
	luzernerRoom = 'room_2',
	clubroom = 'room_3',
	businessMediaRoom = 'room_4',
	auditorium = 'room_5',
	entryFoyer = 'room_6',
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
	additionalRooms = 'additionalRooms',
	dayLight = 'dayLight',
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
	fair = 'fair',
	exhibition = 'exhibition',
	meeting = 'meeting',
	workshop = 'workshop',
}

export const camHeightOffset = 15;

export const roomList = [
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.concertRoom,
			camPos: new THREE.Vector3(-3.8, -6.5 + camHeightOffset, -4),
			camTarget: new THREE.Vector3(-3.8, -0.5, 2),
		},
		info: {
			id: 1,
			title: 'Konzertsaal',
			personCapacity: 1898,
			area: 2100,
			height: 12,
			img: './images/Konzertsaal.jpg',
			equipment: [EQUIPMENT.stage, EQUIPMENT.podium],
			fittings: [ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.seats, ROOM_FITTINGS.additionalRooms],
			fittingEventTypes: [EVENT_TYPES.concert],
			fittingSideRoom: [INTERACTABLE_MESH_NAMES.clubroom, INTERACTABLE_MESH_NAMES.businessMediaRoom],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-18', end: '2022-02-20' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.luzernerRoom,
			camPos: new THREE.Vector3(-7.8, -6.5 + camHeightOffset, -8),
			camTarget: new THREE.Vector3(-3.8, -0.5, -4),
		},
		info: {
			id: 2,
			title: 'Luzerner Saal',
			personCapacity: [470, 1044],
			area: 760,
			height: 12,
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
				ROOM_FITTINGS.additionalRooms,
			],
			fittingEventTypes: [EVENT_TYPES.concert, EVENT_TYPES.congress, EVENT_TYPES.apero],
			fittingSideRoom: [
				INTERACTABLE_MESH_NAMES.entryFoyer,
				INTERACTABLE_MESH_NAMES.clubroom,
				INTERACTABLE_MESH_NAMES.businessMediaRoom,
			],
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
			camPos: new THREE.Vector3(2.4, -6.5 + camHeightOffset, 6),
			camTarget: new THREE.Vector3(0.4, -0.5, 4),
		},
		info: {
			id: 3,
			title: 'Clubraum (Gross)',
			personCapacity: [120, 300],
			area: 250,
			height: 12,
			img: './images/Clubraeume.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			chairFormations: [
				{ name: CHAIR_FORMATION.seminar, capacity: 120 },
				{ name: CHAIR_FORMATION.bankett, capacity: 160 },
				{ name: CHAIR_FORMATION.concert, capacity: 300 },
			],
			fittings: [
				ROOM_FITTINGS.catering,
				ROOM_FITTINGS.apero,
				ROOM_FITTINGS.accessibleEnv,
				ROOM_FITTINGS.seats,
				ROOM_FITTINGS.exhibition,
				ROOM_FITTINGS.dayLight,
			],
			fittingEventTypes: [EVENT_TYPES.apero, EVENT_TYPES.exhibition, EVENT_TYPES.meeting, EVENT_TYPES.workshop],
			bookedDates: [
				{ start: '2022-01-01', end: '2022-01-05' },
				{ start: '2022-01-07', end: '2022-01-08' },
				{ start: '2022-01-10', end: '2022-01-11' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.businessMediaRoom,
			camPos: new THREE.Vector3(0.6, -7.5 + camHeightOffset, 0),
			camTarget: new THREE.Vector3(0.4, -0.5, 0),
		},
		info: {
			id: 4,
			title: 'Medienraum (Gross)',
			personCapacity: [20, 50],
			area: 32,
			height: 12,
			img: './images/BusinessMedienraeume.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			chairFormations: [
				{ name: CHAIR_FORMATION.seminar, capacity: 20 },
				{ name: CHAIR_FORMATION.bankett, capacity: 50 },
			],
			fittings: [ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.seats, ROOM_FITTINGS.dayLight],
			fittingEventTypes: [EVENT_TYPES.apero, EVENT_TYPES.exhibition, EVENT_TYPES.meeting, EVENT_TYPES.workshop],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-18', end: '2022-02-20' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.auditorium,
			camPos: new THREE.Vector3(4.4, -6.5 + camHeightOffset, -8),
			camTarget: new THREE.Vector3(0.4, -0.5, -4),
		},
		info: {
			id: 5,
			title: 'Auditorium',
			personCapacity: 271,
			area: 200,
			height: 12,
			img: './images/Auditorium.jpg',
			equipment: [EQUIPMENT.podium],
			fittings: [ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.seats, ROOM_FITTINGS.additionalRooms],
			fittingEventTypes: [EVENT_TYPES.congress, EVENT_TYPES.exhibition, EVENT_TYPES.workshop],
			fittingSideRoom: [INTERACTABLE_MESH_NAMES.entryFoyer, INTERACTABLE_MESH_NAMES.businessMediaRoom],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-18', end: '2022-02-20' },
			],
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.entryFoyer,
			camPos: new THREE.Vector3(4, -4.5 + camHeightOffset, -4),
			camTarget: new THREE.Vector3(3.9, -0.5, -4),
		},
		info: {
			id: 6,
			title: 'Eingangsfoyer',
			personCapacity: 200,
			area: 520,
			height: 12,
			img: './images/EingangsFoyer.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			fittings: [ROOM_FITTINGS.apero, ROOM_FITTINGS.accessibleEnv, ROOM_FITTINGS.noSeats, ROOM_FITTINGS.dayLight],
			fittingEventTypes: [EVENT_TYPES.apero],
			bookedDates: [
				{ start: '2022-02-10', end: '2022-02-12' },
				{ start: '2022-02-14', end: '2022-02-16' },
				{ start: '2022-02-18', end: '2022-02-20' },
			],
		},
	},
];
