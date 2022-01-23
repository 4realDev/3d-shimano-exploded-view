import React from 'react';
import Accessibility from '../components/icons/Accessibility';
import AdditionalRooms from '../components/icons/AdditionalRooms';
import Apero from '../components/icons/Apero';
import Beamer from '../components/icons/Beamer';
import Catering from '../components/icons/Catering';
import ChairFormationBankett from '../components/icons/ChairFormationBankett';
import ChairFormationConcert from '../components/icons/ChairFormationConcert';
import ChairFormationSeminar from '../components/icons/ChairFormationSeminar';
import DayLight from '../components/icons/DayLight';
import Exhibition from '../components/icons/Exhibition';
import NoSeats from '../components/icons/NoSeats';
import Podium from '../components/icons/Podium';
import Seats from '../components/icons/Seats';
import Stage from '../components/icons/Stage';
import { CHAIR_FORMATION, EQUIPMENT, RoomFetchedDataType, roomList, ROOM_FITTINGS } from '../data/roomData';
import { WizardRoomDataType } from '../store/useWizardStore';

// Takes meshname like "room_3" and returns the title of the room like "Konzertsaal"
export const getRoomTitleByMeshName = (meshName: string) => {
	return roomList.find((room) => room.model.meshName === meshName)?.info.title;
};

// Takes id like 3 and returns the meshname of the room like "room_3"
export const getMeshNameById = (id: number) => {
	return roomList.find((room) => room.info.id === id);
};

// Takes meshname like "room_3" and returns the MeshObjectType of the room
export const getMeshObjectByMeshName = (meshName: string) => {
	return roomList.find((room) => room.model.meshName === meshName);
};

// Mapping functions
export const getFormationIcon = (formation: string): JSX.Element | null => {
	switch (formation) {
		case CHAIR_FORMATION.bankett:
			return <ChairFormationBankett />;
		case CHAIR_FORMATION.seminar:
			return <ChairFormationSeminar />;
		case CHAIR_FORMATION.concert:
			return <ChairFormationConcert />;
		default:
			return null;
	}
};

export const getEquipmentIcon = (equipment: string) => {
	switch (equipment) {
		case EQUIPMENT.stage:
			return <Stage fill='#000000' />;
		case EQUIPMENT.podium:
			return <Podium fill='#000000' />;
		case EQUIPMENT.beamer:
			return <Beamer fill='#000000' />;
		default:
			return null;
	}
};

export const getFittingIcon = (fitting: ROOM_FITTINGS) => {
	switch (fitting) {
		case ROOM_FITTINGS.catering:
			return <Catering />;
		case ROOM_FITTINGS.apero:
			return <Apero />;
		case ROOM_FITTINGS.accessibleEnv:
			return <Accessibility />;
		case ROOM_FITTINGS.seats:
			return <Seats />;
		case ROOM_FITTINGS.noSeats:
			return <NoSeats />;
		case ROOM_FITTINGS.exhibition:
			return <Exhibition />;
		case ROOM_FITTINGS.additionalRooms:
			return <AdditionalRooms />;
		case ROOM_FITTINGS.dayLight:
			return <DayLight />;
		default:
			return null;
	}
};

export const getFormationText = (formation: string) => {
	switch (formation) {
		case CHAIR_FORMATION.bankett:
			return 'Bankett';
		case CHAIR_FORMATION.seminar:
			return 'Seminar';
		case CHAIR_FORMATION.concert:
			return 'Konzert';
		default:
			return null;
	}
};

export const getEquipmentText = (equipment: string) => {
	switch (equipment) {
		case EQUIPMENT.stage:
			return 'Bühne';
		case EQUIPMENT.podium:
			return 'Podium';
		case EQUIPMENT.beamer:
			return 'Beamer';
		default:
			return null;
	}
};
