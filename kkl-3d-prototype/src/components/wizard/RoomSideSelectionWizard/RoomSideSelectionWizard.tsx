import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import {
	INTERACTABLE_MESH_NAMES,
	RoomFetchedDataType,
	roomList,
	ROOM_ADDITIONS_CATEGORY,
} from '../../../data/roomData';
import {
	setFilteredMeshes,
	setSelectedMeshes,
	showAndSelectRoom,
	showAndSelectRooms,
	showRoomsOverview,
} from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import { handleRoomAdditionsChange, handleRoomDataChange, WizardDataType } from '../../../store/useWizardStore';
import { getMeshObjectByMeshName } from '../../../utils/room';
import Accordion from '../../ui/Accordion/Accordion';
import NoResults from '../../ui/NoResults/NoResults';

interface RoomSideSelectionWizardProps {
	wizardData: WizardDataType;
	handleChange: (value: any, inputField: any) => void;
}

const RoomSideSelectionWizard = ({ wizardData, handleChange }: RoomSideSelectionWizardProps) => {
	const accordionItemsMaximumRenderTime = 150;
	const [accordionItemsLoading, setAccordionItemsLoading] = useState(true);

	const [fittingSideRooms, setFittingSideRooms] = useState<RoomFetchedDataType[]>([]);

	useEffect(() => {
		const activeMainRoom = getMeshObjectByMeshName(wizardData.activeMainRoom);
		const fittingSideRooms = roomList.filter((room) => {
			return activeMainRoom?.info.fittingSideRoom?.includes(room.model.meshName);
		});
		const fittingSideRoomMeshNames = fittingSideRooms.map((sideRoom) => sideRoom.model.meshName);

		// if side room was already selected, show side room inside model (for stepping back and forth in stepper)
		// else show overview of all fitting side rooms
		wizardData.activeSideRoom !== ('' as INTERACTABLE_MESH_NAMES)
			? showAndSelectRoom(wizardData.activeSideRoom)
			: showAndSelectRooms(fittingSideRoomMeshNames);

		// clean activeSideRoom inside Wizard if it is not included in the fittingSideRooms list of the current selected main room
		// (for moving back to RoomMainSelectionWIzard and selecting a new main room, which does not include the before selected fitting side room)
		!fittingSideRoomMeshNames.includes(wizardData.activeSideRoom) && handleChange('', 'activeSideRoom');

		// set fitting side rooms state to update the accordion items
		setFittingSideRooms(fittingSideRooms);

		// update filteredMeshes inside useCameraStore to update visualisation on 3D Model
		setFilteredMeshes(fittingSideRoomMeshNames);

		setTimeout(() => {
			setAccordionItemsLoading(false);
		}, accordionItemsMaximumRenderTime);
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

	const renderAccordionItems = () => {
		if (accordionItemsLoading) {
			return <CircularProgress size={60} />;
		}
		if (fittingSideRooms.length === 0) {
			return (
				<NoResults
					message='Für diesen Raum stehen keine Nebenräume zur Verfügung.'
					hint='Sie können aber jeder Zeit einen Schritt zurück gehen und ihre Filterkriterien anpassen.'
				/>
			);
		}

		return (
			<Accordion
				roomList={fittingSideRooms}
				activeRoom={wizardData.activeSideRoom}
				roomAdditionsData={wizardData.sideRooms}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
				handleAdditionsOnChange={handleAdditionsOnChange}
			/>
		);
	};

	return renderAccordionItems();
};

export default RoomSideSelectionWizard;
