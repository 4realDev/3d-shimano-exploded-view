import create from 'zustand';
import {
	CHAIR_FORMATION,
	EQUIPMENT,
	EVENT_TYPES,
	INTERACTABLE_MESH_NAMES,
	ROOM_ADDITIONS_CATEGORY,
} from '../data/roomData';
import { getMeshObjectInformationsByMeshName } from '../utils/room';

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
	const roomType = getMeshObjectInformationsByMeshName(toggledRoomName)?.info.fittingSideRooms
		? ROOM_TYPE.mainRooms
		: ROOM_TYPE.sideRooms;

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
		// CHECK OF NEW ROOM ITEM HAS ONLY ONE POSSIBLE CHAIR_FORMATION
		const newRoomChairFormation = getMeshObjectInformationsByMeshName(toggledRoomName)?.info.chairFormations;
		// IF YES, SET IT AS THE DEFAULT VALUE
		const newRoomChairFormationValue = newRoomChairFormation?.length === 1 ? newRoomChairFormation[0].name : '';
		// ADD NEW ROOM ITEM
		const newRoomValue = [
			...wizardData[roomType],
			{
				room: toggledRoomName,
				equipment: '',
				chair_formation: newRoomChairFormationValue,
			},
		];
		updateWizardData(newRoomValue, roomType);
	}
	updateWizardData(toggledRoomName, roomType === ROOM_TYPE.mainRooms ? 'activeMainRoom' : 'activeSideRoom');
};

// Room additions can only be changed on rooms which are already inside either mainRoom[] or sideRoom[]
// Therefore, the AccordionItem must be already opened to click on the MeshVisibilityButtons and to selected either Equipment or ChairFormation
export const handleRoomAdditionsChange = (
	toggledRoomName: INTERACTABLE_MESH_NAMES,
	toggledMeshName: CHAIR_FORMATION | EQUIPMENT,
	category: ROOM_ADDITIONS_CATEGORY
) => {
	const wizardData = useWizardStore.getState().wizardData;
	const roomType = getMeshObjectInformationsByMeshName(toggledRoomName)?.info.fittingSideRooms
		? ROOM_TYPE.mainRooms
		: ROOM_TYPE.sideRooms;
	const newRoomAdditions = wizardData[roomType];

	// OVERWRITE EXISTING ITEM BY ...
	const index = newRoomAdditions.findIndex((item) => item.room === toggledRoomName);

	if (newRoomAdditions[index].room === toggledRoomName && newRoomAdditions[index][category] === toggledMeshName) {
		// RESETTING EXISTING ITEM IF VALUE IS THE SAME
		newRoomAdditions[index] = {
			...wizardData[roomType][index], // e.g. wizardData.mainRoom[2]
			room: toggledRoomName,
			[category]: '', // reset the selected chair_formation / equipment to empty string
			capacity: undefined,
		};
	} else {
		// UPDATING EXISTING ITEM IF VALUE IS NEW
		// if chair_formation is selected, update the room personCapacity value as well
		if (category === ROOM_ADDITIONS_CATEGORY.chair_formation) {
			const toggledChairFormationCapacity = getMeshObjectInformationsByMeshName(
				toggledRoomName
			)?.info.chairFormations?.find((chairFormation) => chairFormation.name === toggledMeshName)?.capacity;
			newRoomAdditions[index] = {
				...wizardData[roomType][index], // e.g. wizardData.mainRoom[2]
				room: toggledRoomName,
				chair_formation: toggledMeshName, // set the selected chair_formation / equipment
				capacity: toggledChairFormationCapacity,
			};
		} else {
			newRoomAdditions[index] = {
				...wizardData[roomType][index], // e.g. wizardData.mainRoom[2]
				room: toggledRoomName,
				[category]: toggledMeshName, // set the selected chair_formation / equipment
			};
		}
	}
	updateWizardData(newRoomAdditions, roomType);
};

// After every update of the personNum TextField in the RoomFilteringWizard, the before chosen saved chair_formation and their capacity needs to be checked again
// If they don't match the new selected personNum, the chair_formation as well as their capacity have to be resetted to keep the wizardData valid
export const checkAllRoomsChairFormationAndCapacityAfterPersonNumUpdate = () => {
	const wizardData = useWizardStore.getState().wizardData;
	const newRoomAdditions = wizardData.mainRooms;
	wizardData.mainRooms.forEach((mainRoom, index) => {
		if (mainRoom.capacity !== undefined && mainRoom.capacity < parseInt(wizardData.personNum)) {
			// OVERWRITE EXISTING ITEM WITH EMPTY capacity AND chair_formation
			newRoomAdditions[index] = {
				...wizardData.mainRooms[index],
				chair_formation: '',
				capacity: undefined,
			};

			updateWizardData(newRoomAdditions, 'mainRooms');
		}
	});
};
