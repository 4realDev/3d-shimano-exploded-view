import { useEffect, useState } from 'react';
import { EVENT_TYPES, RoomItemsList, roomList, ROOM_ADDITIONS_CATEGORY } from '../../../data/roomData';
import {
	setSelectedMeshes,
	showAndSelectRoom,
	showAndSelectRooms,
	showRoomsOverview,
} from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import { handleRoomAdditionsChange, handleRoomDataChange, WizardData } from '../../../store/useWizardStore';
import Accordion from '../../ui/Accordion/Accordion';

interface RoomMainSelectionWizardProps {
	wizardData: WizardData;
	handleChange: (value: any, inputField: any) => void;
}

const RoomMainSelectionWizard = ({ wizardData, handleChange }: RoomMainSelectionWizardProps) => {
	const [filteredRoomMeshesNames, setFilteredRoomMeshesNames] = useState<string[] | null>([]);
	const filteredRoomMeshes = roomList.filter((room) => {
		return filteredRoomMeshesNames?.includes(room.model.meshName);
	});

	useEffect(() => {
		filterRoomSelection();
	}, []);

	const filterMainRooms = (roomList: RoomItemsList[]) => {
		return roomList.filter((room) => room.info.fittings?.hasAdditionalRooms === true);
	};

	const filterAfterPersonNum = (roomList: RoomItemsList[]) => {
		if (wizardData.personNum !== '') {
			return roomList.filter((room) => room.info.personCapacity >= parseInt(wizardData.personNum));
		}
		return roomList;
	};

	const filterAfterEventType = (roomList: RoomItemsList[]) => {
		if (wizardData.eventType !== EVENT_TYPES.all) {
			return roomList.filter((room) => room.info.fittingEventTypes?.includes(wizardData.eventType!!));
		}
		return roomList;
	};

	const filterAfterDate = (roomList: RoomItemsList[]) => {
		// only startDate was entred
		if (wizardData.startDate !== null && wizardData.endDate === null) {
			return roomList.filter(
				(room) =>
					wizardData.startDate!! < new Date(room.info.bookedStartDate!!) ||
					wizardData.startDate!! > new Date(room.info.bookedEndDate!!)
			);
		}
		// only endDate was entred
		else if (wizardData.endDate !== null && wizardData.startDate === null) {
			return roomList.filter(
				(room) =>
					wizardData.endDate!! < new Date(room.info.bookedStartDate!!) ||
					wizardData.endDate!! > new Date(room.info.bookedEndDate!!)
			);
		}
		// both dates were entred
		else if (wizardData.startDate !== null && wizardData.endDate !== null) {
			return roomList.filter(
				(room) =>
					(wizardData.startDate!! < new Date(room.info.bookedStartDate!!) &&
						wizardData.endDate!! < new Date(room.info.bookedStartDate!!)) ||
					(wizardData.startDate!! > new Date(room.info.bookedEndDate!!) &&
						wizardData.endDate!! > new Date(room.info.bookedEndDate!!))
			);
		}
		return roomList;
	};

	const filterRoomSelection = () => {
		let filteredList = roomList;
		let filteredMainRoomList = filterMainRooms(filteredList);

		// Step by step filtering allows to only filter according to the provided fields
		// If a field is not provided, the passed list will be directly returned
		filteredMainRoomList = filterAfterPersonNum(filteredMainRoomList);
		filteredMainRoomList = filterAfterEventType(filteredMainRoomList);
		filteredMainRoomList = filterAfterDate(filteredMainRoomList);
		const filteredRoomMeshNames = filteredMainRoomList.map((room) => room.model.meshName);

		// if there is only one resulting fitting mainRoom,
		// set it as the activeMainRoom and show it inside the model (make it the only selectedModel)
		if (filteredMainRoomMeshNames.length === 1) {
			showAndSelectRoom(filteredMainRoomMeshNames[0]);
			handleChange(filteredMainRoomMeshNames[0], 'activeMainRoom');
		}
		// show overview of all filteredMainRooms
		else {
			showAndSelectRooms(filteredMainRoomMeshNames);
		}
		setFilteredRoomMeshesNames(filteredRoomMeshNames);
	};

	const handleOnOpen = (toggledMeshName: string) => {
		handleRoomDataChange(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = (toggledMeshName: string) => {
		filteredRoomMeshesNames && showSelectedRooms(filteredRoomMeshesNames, false);
		showRoomsOverview();
		wizardData.activeMainRoom === toggledMeshName && handleChange('', 'activeMainRoom');
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
			roomList={filteredRoomMeshes}
			activeRoom={wizardData.activeMainRoom}
			roomAdditionsData={wizardData.mainRoom}
			handleOnOpen={handleOnOpen}
			handleOnClose={handleOnClose}
			handleAdditionsOnChange={handleAdditionsOnChange}
		/>
	);
};

export default RoomMainSelectionWizard;
