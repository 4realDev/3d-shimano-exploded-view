import create from 'zustand';
import { EVENT_TYPES, INTERACTABLE_MESH_NAMES } from '../data/roomData';

export type WizardRoomDataType = {
	room: string;
	chair_formation: string;
	equipment: string;
	capacity?: number;
};

export enum ROOM_TYPE {
	mainRooms = 'mainRooms',
	sideRooms = 'sideRooms',
}

export type WizardDataType = {
	eventType: EVENT_TYPES;
	personNum: string;
	startDate: Date | null;
	endDate: Date | null;
	additionalRooms: boolean;
	additionalService: string;
	mainRooms: WizardRoomDataType[];
	sideRooms: WizardRoomDataType[];
	activeMainRoom: INTERACTABLE_MESH_NAMES;
	activeSideRoom: INTERACTABLE_MESH_NAMES;
};

type WizardState = {
	wizardData: WizardDataType;
	step: number;
};

export const useWizardStore = create<WizardState>((set, get) => ({
	wizardData: {
		eventType: EVENT_TYPES.all,
		personNum: '',
		startDate: null,
		endDate: null,
		additionalRooms: true,
		additionalService: '',
		mainRooms: [],
		sideRooms: [],
		activeMainRoom: '' as INTERACTABLE_MESH_NAMES,
		activeSideRoom: '' as INTERACTABLE_MESH_NAMES,
	},
	step: 0,
}));

export const setStep = (step: number) => {
	useWizardStore.setState({ step: step });
};

export const resetWizardData = () => {
	useWizardStore.setState({
		wizardData: {
			eventType: EVENT_TYPES.all,
			personNum: '',
			startDate: null,
			endDate: null,
			additionalRooms: true,
			additionalService: '',
			mainRooms: [],
			sideRooms: [],
			activeMainRoom: '' as INTERACTABLE_MESH_NAMES,
			activeSideRoom: '' as INTERACTABLE_MESH_NAMES,
		},
	});
};

export const updateWizardData = (value: any, inputField: any) => {
	const updatedWizardData = { ...useWizardStore.getState().wizardData, [inputField]: value };
	useWizardStore.setState({ wizardData: updatedWizardData });
};

export const handleRoomDataChange = (toggledRoomName: string) => {
	const wizardData = useWizardStore.getState().wizardData;

	// ADJUSTED
	// const roomType = getMeshObjectInformationsByMeshName(toggledRoomName)?.info.fittingSideRooms
	// 	? ROOM_TYPE.mainRooms
	// 	: ROOM_TYPE.sideRooms;
	const roomType = ROOM_TYPE.mainRooms;

	const mainRoomAdditions = wizardData[roomType];

	if (wizardData[roomType].map((item) => item.room).includes(toggledRoomName)) {
		// OVERWRITE EXISTING ROOM ITEM
		const index = wizardData[roomType].findIndex((item) => item.room === toggledRoomName);
		mainRoomAdditions[index] = {
			...wizardData[roomType][index],
			room: toggledRoomName,
		};
		updateWizardData(mainRoomAdditions, roomType);
	} else {
		// ADD NEW ROOM ITEM
		const newRoomValue = [
			...wizardData[roomType],
			{
				room: toggledRoomName,
			},
		];
		updateWizardData(newRoomValue, roomType);
	}
	updateWizardData(toggledRoomName, roomType === ROOM_TYPE.mainRooms ? 'activeMainRoom' : 'activeSideRoom');
};
