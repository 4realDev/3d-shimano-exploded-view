import create from 'zustand';
import { EVENT_TYPES } from '../data/roomData';

export type WizardRoomData = {
	room: string;
	equipment: string;
	chairFormation: string;
};

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
}));

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
