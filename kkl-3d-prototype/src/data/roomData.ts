import * as THREE from 'three';
// npm install three

export type RoomItemsList = {
	model: {
		meshName: string;
		camPos: THREE.Vector3;
		camTarget: THREE.Vector3;
	};
	info: {
		id: number;
		title: string;
		personCapacity: number;
		area: number;
		height: number;
		img: string;
		chairFormations?: string[];
		equipment?: string[];
		fittings?: {
			hasCatering?: boolean;
			hasApero?: boolean;
			hasAccessibleEnv?: boolean;
			hasSeats?: boolean;
			hasNoSeats?: boolean;
			hasAdditionalRooms?: boolean;
		};
		fittingEventTypes?: string[];
		bookedStartDate?: string;
		bookedEndDate?: string;
	};
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
	shuffle = 'chair_formation_shuffle',
	square = 'chair_formation_square',
	circle = 'chair_formation_circle',
	concert = 'chair_formation_concert',
	seminar = 'chair_formation_seminar',
	bankett = 'chair_formation_bankett',
}

export enum EQUIPMENT {
	stage = 'equipment_stage',
	podium = 'equipment_podium',
	beamer = 'beamer',
}

export enum ROOM_ADDITIONS_CATEGORY {
	chairFormation = 'chair_formation',
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
			chairFormation: [CHAIR_FORMATION.concert],
			fittings: {
				hasAccessibleEnv: true,
				hasSeats: true,
				hasAdditionalRooms: true,
			},
			fittingEventTypes: [EVENT_TYPES.concert],
			fittingSideRoom: [
				INTERACTABLE_MESH_NAMES.entryFoyer,
				INTERACTABLE_MESH_NAMES.clubroom,
				INTERACTABLE_MESH_NAMES.businessMediaRoom,
			],
			bookedStartDate: '2022-01-01',
			bookedEndDate: '2022-01-05',
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
			personCapacity: 1044,
			area: 760,
			height: 12,
			img: './images/LuzernerSaal.jpg',
			equipment: [EQUIPMENT.stage, EQUIPMENT.podium, EQUIPMENT.beamer],
			chairFormations: [CHAIR_FORMATION.shuffle, CHAIR_FORMATION.square, CHAIR_FORMATION.circle],
			fittings: {
				hasCatering: true,
				hasApero: true,
				hasAccessibleEnv: true,
				hasSeats: true,
				hasExhibition: true,
				hasAdditionalRooms: true,
			},
			fittingEventTypes: [EVENT_TYPES.concert, EVENT_TYPES.congress, EVENT_TYPES.apero],
			fittingSideRoom: [
				INTERACTABLE_MESH_NAMES.entryFoyer,
				INTERACTABLE_MESH_NAMES.clubroom,
				INTERACTABLE_MESH_NAMES.businessMediaRoom,
			],
			bookedStartDate: '2022-01-01',
			bookedEndDate: '2022-01-31',
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
			title: 'Clubraum',
			personCapacity: 150,
			area: 250,
			height: 12,
			img: './images/Clubraeume.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			chairFormations: [CHAIR_FORMATION.seminar, CHAIR_FORMATION.bankett],
			fittings: {
				hasCatering: true,
				hasApero: true,
				hasAccessibleEnv: true,
				hasSeats: true,
				hasExhibition: true,
				hasDayLight: true,
			},
			fittingEventTypes: [EVENT_TYPES.apero, EVENT_TYPES.exhibition, EVENT_TYPES.meeting, EVENT_TYPES.workshop],
			bookedStartDate: '2022-01-01',
			bookedEndDate: '2022-01-05',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.businessMediaRoom,
			camPos: new THREE.Vector3(4.4, -0.5 + camHeightOffset, 0),
			camTarget: new THREE.Vector3(0.4, -0.5, 0),
		},
		info: {
			id: 4,
			title: 'Medienraum',
			personCapacity: 15,
			area: 32,
			height: 12,
			img: './images/BusinessMedienraeume.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			chairFormations: [CHAIR_FORMATION.seminar, CHAIR_FORMATION.bankett],
			fittings: {
				hasAccessibleEnv: true,
				hasSeats: true,
				hasDayLight: true,
			},
			fittingEventTypes: [EVENT_TYPES.apero, EVENT_TYPES.exhibition, EVENT_TYPES.meeting, EVENT_TYPES.workshop],
			bookedStartDate: '2022-01-01',
			bookedEndDate: '2022-01-05',
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
			chairFormations: [CHAIR_FORMATION.concert],
			fittings: {
				hasAccessibleEnv: true,
				hasSeats: true,
				hasAdditionalRooms: true,
			},
			fittingEventTypes: [EVENT_TYPES.congress, EVENT_TYPES.exhibition, EVENT_TYPES.workshop],
			fittingSideRoom: [
				INTERACTABLE_MESH_NAMES.entryFoyer,
				INTERACTABLE_MESH_NAMES.clubroom,
				INTERACTABLE_MESH_NAMES.businessMediaRoom,
			],
			bookedStartDate: '2022-01-01',
			bookedEndDate: '2022-01-05',
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
			personCapacity: 50,
			area: 65,
			height: 12,
			img: './images/EingangsFoyer.jpg',
			equipment: [EQUIPMENT.podium, EQUIPMENT.beamer],
			fittings: {
				hasAccessibleEnv: true,
				hasApero: true,
				hasNoSeats: true,
				hasDayLight: true,
			},
			fittingEventTypes: [EVENT_TYPES.apero],
			bookedStartDate: '2022-01-01',
			bookedEndDate: '2022-01-05',
		},
	},
];
