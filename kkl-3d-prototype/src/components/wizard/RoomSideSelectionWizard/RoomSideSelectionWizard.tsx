import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import {
	CHAIR_FORMATION,
	EQUIPMENT,
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
import { toggleMeshChildVisibility } from '../../../store/useMeshStore';
import { handleRoomAdditionsChange, handleRoomDataChange, WizardDataType } from '../../../store/useWizardStore';
import { getMeshObjectInformationsByMeshName } from '../../../utils/room';
import Accordion from '../../ui/Accordion/Accordion';
import NoResults from '../../ui/NoResults/NoResults';
import { filterAfterDate } from '../RoomMainSelectionWizard/RoomMainSelectionWizard';

interface RoomSideSelectionWizardProps {
	wizardData: WizardDataType;
	handleChange: (value: any, inputField: any) => void;
}

const RoomSideSelectionWizard = ({ wizardData, handleChange }: RoomSideSelectionWizardProps) => {
	const accordionItemsMaximumRenderTime = 150;
	const [accordionItemsLoading, setAccordionItemsLoading] = useState(true);

	const [fittingSideRooms, setFittingSideRooms] = useState<RoomFetchedDataType[]>([]);

	useEffect(() => {
		const activeMainRoom = getMeshObjectInformationsByMeshName(wizardData.activeMainRoom);
		const fittingSideRooms = roomList.filter((room) => {
			return activeMainRoom?.info.fittingSideRooms?.includes(room.model.meshName);
		});
		const filteredFittingSideRooms = filterAfterDate(fittingSideRooms, wizardData.startDate, wizardData.endDate);
		const fittingSideRoomMeshNames = filteredFittingSideRooms.map((sideRoom) => sideRoom.model.meshName);

		// If the activeMainRoom was already set and the filter was adjusted again (by stepping back to RoomFilterWizard and changing filter criteria),
		// check if the activeMainRoom is still fitting the new filter criteria -> if not, empty activeMainRoom

		// If active activeSideRoom was already set and a new activeMainRoom was selected, which does not include the current activeSideRoom in its fittingSideRooms list
		// (Edge Case which appears when user steps back and forth in wizard)
		!fittingSideRoomMeshNames.includes(wizardData.activeSideRoom) && handleChange('', 'activeSideRoom');

		// If side room was already selected, show side room inside model
		// else show overview of all fitting side rooms
		// (Edge Case which appears when user steps back and forth in wizard)
		wizardData.activeSideRoom !== ('' as INTERACTABLE_MESH_NAMES)
			? showAndSelectRoom(wizardData.activeSideRoom)
			: showAndSelectRooms(fittingSideRoomMeshNames);

		// set fitting side rooms state to update the accordion items
		setFittingSideRooms(filteredFittingSideRooms);

		// update filteredMeshes inside useCameraStore to update visualisation on 3D Model
		setFilteredMeshes(fittingSideRoomMeshNames);

		const timeout = setTimeout(() => {
			setAccordionItemsLoading(false);
		}, accordionItemsMaximumRenderTime);
		return () => {
			clearTimeout(timeout);
		};
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
		toggledRoomName: INTERACTABLE_MESH_NAMES,
		toggledMeshName: CHAIR_FORMATION | EQUIPMENT,
		category: ROOM_ADDITIONS_CATEGORY
	) => {
		handleRoomAdditionsChange(toggledRoomName, toggledMeshName, category);
		toggleMeshChildVisibility(toggledRoomName, toggledMeshName, category);
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
