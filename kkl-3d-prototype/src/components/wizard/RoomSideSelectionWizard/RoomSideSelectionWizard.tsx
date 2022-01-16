import { useEffect, useState } from 'react';
import { RoomFetchedInfo, roomList, ROOM_ADDITIONS_CATEGORY } from '../../../data/roomData';
import {
	setFilteredMeshes,
	setSelectedMeshes,
	showAndSelectRoom,
	showAndSelectRooms,
	showRoomsOverview,
} from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import { handleRoomAdditionsChange, handleRoomDataChange, WizardData } from '../../../store/useWizardStore';
import { getMeshObjectByMeshName } from '../../../utils/formatRoom';
import Accordion from '../../ui/Accordion/Accordion';
import NoResults from '../../ui/NoResults/NoResults';

interface RoomSideSelectionWizardProps {
	wizardData: WizardData;
	handleChange: (value: any, inputField: any) => void;
}

const RoomSideSelectionWizard = ({ wizardData, handleChange }: RoomSideSelectionWizardProps) => {
	const [fittingSideRooms, setFittingSideRooms] = useState<RoomFetchedInfo[]>([]);

	useEffect(() => {
		const activeMainRoom = getMeshObjectByMeshName(wizardData.activeMainRoom);
		const fittingSideRooms = roomList.filter((room) => {
			return activeMainRoom?.info.fittingSideRoom?.includes(room.model.meshName);
		});
		const fittingSideRoomMeshNames = fittingSideRooms.map((sideRoom) => sideRoom.model.meshName);

		// show overview of all fittingSideRooms
		showAndSelectRooms(fittingSideRoomMeshNames);

		// set fitting side rooms state to update the accordion items
		setFittingSideRooms(fittingSideRooms);

		// update filteredMeshes inside useCameraStore to update visualisation on 3D Model
		setFilteredMeshes(fittingSideRoomMeshNames);
	}, []);

	const handleOnOpen = (toggledMeshName: string) => {
		handleRoomDataChange(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = (toggledMeshName: string) => {
		setSelectedMeshes([]);
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

	return fittingSideRooms.length === 0 ? (
		<NoResults message='Für diesen Raum stehen keine Nebenräume zur Verfügung.' />
	) : (
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
