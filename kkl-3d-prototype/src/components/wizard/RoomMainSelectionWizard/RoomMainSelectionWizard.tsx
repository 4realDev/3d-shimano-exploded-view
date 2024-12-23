import { roomList } from '../../../data/roomData';
import {
	setSelectedMeshes,
	showAndSelectRoom,
	showRoomsOverview,
} from '../../../store/useCameraStore';
import { handleRoomDataChange, WizardDataType } from '../../../store/useWizardStore';
import List from '../../ui/List/List';

interface RoomMainSelectionWizardProps {
	wizardData: WizardDataType;
	handleChange: (value: any, inputField: any) => void;
}

const RoomMainSelectionWizard = ({ wizardData, handleChange }: RoomMainSelectionWizardProps) => {
	const handleOnOpen = (toggledMeshName: string) => {
		handleRoomDataChange(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = (toggledMeshName: string) => {
		setSelectedMeshes([]);
		showRoomsOverview();
		wizardData.activeMainRoom === toggledMeshName && handleChange('', 'activeMainRoom');
	};

	// ADJUSTED
	const renderAccordionItems = () => {
		return (
			<List
				roomList={roomList}
				activeRoom={wizardData.activeMainRoom}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
			/>
		);
	};

	return renderAccordionItems();
};

export default RoomMainSelectionWizard;
