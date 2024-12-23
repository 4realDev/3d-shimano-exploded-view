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
		img: string;
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
	insideBaffle = 'derailleur09',
	outsideBaffle = 'derailleur02',
	boltSet = 'derailleur06',
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
			title: 'Shimano Führungsrolle RD-M71XX',
			articleIndex: 1,
			articleNr: '60.76556',
			price: 5.95,
			category: 'Zubehör',
			group: 'SLX',
			img: './leadRoll.jpg',
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
			title: 'Shimano Spannrolle RD-M6100',
			articleIndex: 2,
			articleNr: '60.76556',
			price: 5.95,
			category: 'Zubehör',
			group: 'SLX',
			img: './tensionRoll.jpg',
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
			title: 'Shimano Achse Wechselkäfig hinten RD-M7100',
			articleIndex: 3,
			articleNr: '60.77741',
			price: 16.9,
			category: 'Ersatzteile',
			group: 'SLX',
			img: './cage1.jpg',
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
			title: 'Shimano Achse Wechselkäfig mitte RD-M7100',
			articleIndex: 4,
			articleNr: '60.77742',
			price: 21.9,
			category: 'Ersatzteile',
			group: 'SLX',
			img: './cage2.jpg',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.auditorium,
			camPos: new THREE.Vector3(-2, 4, 8),
			camTarget: new THREE.Vector3(-1.5, 0.8, 1),
			camPosEv: new THREE.Vector3(-3.75, 5.5, 5),
			camTargetEv: new THREE.Vector3(-3.75, 5, 1),
			markerPos: new THREE.Vector3(-1.25, 0, 0),
			markerPosEv: new THREE.Vector3(-1.25, 0.25, 0),
		},
		info: {
			title: 'Shimano Achse Wechselkäfig vorne RD-M7100',
			articleIndex: 5,
			articleNr: '60.77743',
			price: 21.9,
			category: 'Ersatzteile',
			group: 'SLX',
			img: './cage3.jpg',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.clubroom,
			camPos: new THREE.Vector3(3.9, -0.8, 8),
			camTarget: new THREE.Vector3(1.9, -1.3, 1),
			camPosEv: new THREE.Vector3(3.25, 3.63, 4.29),
			camTargetEv: new THREE.Vector3(1.9, 2.3, 1),
			markerPos: new THREE.Vector3(-1, 0.5, 1),
			markerPosEv: new THREE.Vector3(-1.5, 1, 0.75),
		},
		info: {
			title: 'Shimano Abdeckung RD-M7120',
			articleIndex: 6,
			articleNr: '60.77749',
			price: 5.9,
			category: 'Ersatzteile',
			group: 'SLX',
			img: './cover.png',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.entryFoyer,
			camPos: new THREE.Vector3(1, 2.25, 4.4),
			camTarget: new THREE.Vector3(1, -0.25, 0.4),
			camPosEv: new THREE.Vector3(1.3022, 4.848, 3.176),
			camTargetEv: new THREE.Vector3(0.75, 5, 0.75),
			markerPos: new THREE.Vector3(0, 0, 0),
			markerPosEv: new THREE.Vector3(-0.75, 0, -0.75),
		},
		info: {
			title: 'Shimano Wechselhebel-Einheit RD-M8000',
			articleIndex: 7,
			articleNr: '60.22228',
			price: 6.9,
			category: 'Käfig, Kleinteile',
			group: 'Mechanical',
			img: './switcher.jpg',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.insideBaffle,
			camPos: new THREE.Vector3(-3.4474402814221587, -1.228989986835589, 8.744637126863875),
			camTarget: new THREE.Vector3(-0.7579496335634667, -1.4722184977656254, -2.2088694386955297),
			camPosEv: new THREE.Vector3(-4.47430733582917, -1.4878241185260523, 7.15682079175347),
			camTargetEv: new THREE.Vector3(-4.356471365076946, -1.8443722738163078, -3.034106715496906),
			markerPos: new THREE.Vector3(0, 0, 0),
			markerPosEv: new THREE.Vector3(-0.75, 1, 0.65),
		},
		info: {
			title: 'Shimano Leitblech RD-M7120-SGS innen',
			articleIndex: 8,
			articleNr: '60.77745',
			price: 14.9,
			category: 'Ersatzteile',
			group: 'SLX',
			img: './insideBaffle.jpg',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.outsideBaffle,
			camPos: new THREE.Vector3(6.822881989975051, -4.439214490892574, 8.721184429432745),
			camTarget: new THREE.Vector3(0.4597798123763912, -1.5414641818502712, -0.2525211492771198),
			camPosEv: new THREE.Vector3(2.1809003937892846, -1.1713579737484248, 8.99932266798197),
			camTargetEv: new THREE.Vector3(2.996795623221593, -1.5601175313200915, -0.5097183821159816),
			markerPos: new THREE.Vector3(0, 5, 2),
			markerPosEv: new THREE.Vector3(-0.75, 2.1, 2.9),
		},
		info: {
			title: 'Shimano Leitblech RD-M8120-SGS aussen',
			articleIndex: 9,
			articleNr: '60.77656',
			price: 29.9,
			category: 'Ersatzteile',
			group: 'Deore XT',
			img: './outsideBaffle.png',
		},
	},
	{
		model: {
			meshName: INTERACTABLE_MESH_NAMES.boltSet,
			camPos: new THREE.Vector3(-0.3558424730859525, 1.4014842471872897, 2.6862227545425643),
			camTarget: new THREE.Vector3(-1.0478564133759947, 0.6150090145787438, 0.6173910524438967),
			camPosEv: new THREE.Vector3(-4.532068144479163, 5.467289212640876, 2.5452362693909043),
			camTargetEv: new THREE.Vector3(-5.195032302260144, 5.71814427700639, 0.2091539229667393),
			markerPos: new THREE.Vector3(0, 5, 2),
			markerPosEv: new THREE.Vector3(0.75, 0.95, -0.45),
		},
		info: {
			title: 'Shimano Schraubenset XX1/X01 B-Bolt',
			articleIndex: 10,
			articleNr: '60.74387',
			price: 12.9,
			category: 'Ersatzteile',
			group: 'Deore XT',
			img: './boltSet.jpg',
		},
	},
];
