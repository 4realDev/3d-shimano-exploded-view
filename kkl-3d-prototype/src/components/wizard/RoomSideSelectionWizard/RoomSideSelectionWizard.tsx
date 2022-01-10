import { useEffect, useState } from 'react';
import { RoomItemsList, roomList, ROOM_ADDITIONS_CATEGORY } from '../../../data/roomData';
import {
	showAndSelectRoom,
	showRoomsOverview,
} from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import { handleRoomAdditionsChange, handleRoomDataChange, WizardData } from '../../../store/useWizardStore';
import { getMeshObjectByMeshName } from '../../../utils/formatRoom';
import Accordion from '../../ui/Accordion/Accordion';

interface RoomSideSelectionWizardProps {
	wizardData: WizardData;
	handleChange: (value: any, inputField: any) => void;
}

const RoomSideSelectionWizard = ({ wizardData, handleChange }: RoomSideSelectionWizardProps) => {
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);

	const [fittingSideRooms, setFittingSideRooms] = useState<RoomItemsList[]>([]);

	useEffect(() => {
		const activeMainRoom = getMeshObjectByMeshName(wizardData.activeMainRoom);
		const fittingSideRooms = roomList.filter((room) => {
			return activeMainRoom?.info.fittingSideRoom?.includes(room.model.meshName);
		});
		setFittingSideRooms(fittingSideRooms);
	}, []);

	const handleOnOpen = (toggledMeshName: string) => {
		handleRoomDataChange(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = (toggledMeshName: string) => {
		showRoomsOverview();
		wizardData.activeSideRoom === toggledMeshName && handleChange('', 'activeSideRoom');
	};

	const handleAdditionsOnChange = (
		toggledRoomName: string,
		toggledMeshName: string,
		category: ROOM_ADDITIONS_CATEGORY
	) => {
		handleRoomAdditionsChange(toggledRoomName, toggledMeshName, category);
		setMeshChildVisibility(toggledRoomName, toggledMeshName, category);
	};

	return (
		<Accordion
			roomList={fittingSideRooms}
			activeRoom={wizardData.activeSideRoom}
			roomAdditionsData={wizardData.sideRoom}
			handleOnOpen={handleOnOpen}
			handleOnClose={handleOnClose}
			handleAdditionsOnChange={handleAdditionsOnChange}
		/>
	);
};

export default RoomSideSelectionWizard;
