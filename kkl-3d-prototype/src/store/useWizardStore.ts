import create from 'zustand';
import { EVENT_TYPES, ROOM_ADDITIONS_CATEGORY } from '../data/roomData';
import { getMeshObjectByMeshName } from '../utils/formatRoom';

export type WizardRoomData = {
	room: string;
	chair_formation: string;
	equipment: string;
};

export enum ROOM_TYPE {
	mainRoom = 'mainRoom',
	sideRoom = 'sideRoom',
}

export type WizardData = {
	eventType: EVENT_TYPES;
	personNum: string;
	startDate: Date | null;
	endDate: Date | null;
	mainRoom: WizardRoomData[];
	sideRoom: WizardRoomData[];
	activeMainRoom: string;
	activeSideRoom: string;
};

type WizardState = {
	wizardData: WizardData;
	step: number;
};

export const useWizardStore = create<WizardState>((set, get) => ({
	wizardData: {
		eventType: EVENT_TYPES.all,
		personNum: '0',
		startDate: null,
		endDate: null,
		mainRoom: [],
		sideRoom: [],
		activeMainRoom: '',
		activeSideRoom: '',
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
			personNum: '0',
			startDate: null,
			endDate: null,
			mainRoom: [],
			sideRoom: [],
			activeMainRoom: '',
			activeSideRoom: '',
		},
	});
};

export const updateWizardData = (value: any, inputField: any) => {
	const updatedWizardData = { ...useWizardStore.getState().wizardData, [inputField]: value };
	useWizardStore.setState({ wizardData: updatedWizardData });
};

export const handleRoomDataChange = (toggledRoomName: string) => {
	const wizardData = useWizardStore.getState().wizardData;
	const roomType = getMeshObjectByMeshName(toggledRoomName)?.info.fittingSideRoom
		? ROOM_TYPE.mainRoom
		: ROOM_TYPE.sideRoom;

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
				equipment: '',
				chair_formation: '',
			},
		];
		updateWizardData(newRoomValue, roomType);
	}
	updateWizardData(toggledRoomName, roomType === ROOM_TYPE.mainRoom ? 'activeMainRoom' : 'activeSideRoom');
};

export const handleRoomAdditionsChange = (
	toggledRoomName: string,
	toggledMeshName: string,
	category: ROOM_ADDITIONS_CATEGORY
) => {
	const wizardData = useWizardStore.getState().wizardData;
	const roomType = getMeshObjectByMeshName(toggledRoomName)?.info.fittingSideRoom
		? ROOM_TYPE.mainRoom
		: ROOM_TYPE.sideRoom;
	const newRoomAdditions = wizardData[roomType];

	if (newRoomAdditions.map((item) => item.room).includes(toggledRoomName)) {
		// OVERWRITE EXISTING ITEM BY ...
		const index = newRoomAdditions.findIndex((item) => item.room === toggledRoomName);

		if (newRoomAdditions[index].room === toggledRoomName && newRoomAdditions[index][category] === toggledMeshName) {
			// RESETTING EXISTING ITEM IF VALUE IS THE SAME
			newRoomAdditions[index] = {
				...wizardData[roomType][index], // e.g. wizardData.mainRoom[2]
				room: toggledRoomName,
				[category]: '', // reset the selected chair_formation to empty string
			};
		} else {
			// UPDATING EXISTING ITEM IF VALUE IS NEW
			newRoomAdditions[index] = {
				...wizardData[roomType][index], // e.g. wizardData.mainRoom[2]
				room: toggledRoomName,
				[category]: toggledMeshName, // set the selected chair_formation
			};
		}
		updateWizardData(newRoomAdditions, roomType);
	} else {
		// ADD NEW SELECTED ROOM (toggledRoomName) WITH NEW SELECTED ITEM (toggledMeshName) IF ROOM AND ITEM ARE NOT EXISTING YET
		// Create empty WizardRoomData element as base
		const emptyRoomAdditions: WizardRoomData = { room: '', equipment: '', chair_formation: '' };
		// Overwrite empty WizardRoomData with new selected item in the corresponding category
		const newRoomAdditions = [
			...wizardData[roomType],
			{ ...emptyRoomAdditions, room: toggledRoomName, [category]: toggledMeshName },
		];
		updateWizardData(newRoomAdditions, roomType);
	}
};
