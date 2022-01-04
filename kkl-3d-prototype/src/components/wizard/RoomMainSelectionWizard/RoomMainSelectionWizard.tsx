import { useEffect, useState } from 'react';
import { EVENT_TYPES, RoomItemsList, roomList } from '../../../data/roomData';
import { showSelectedRoom, showSelectedRooms } from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import { WizardData } from '../../../store/useWizardStore';
import Accordion from '../../ui/Accordion/Accordion';

interface RoomMainSelectionWizardProps {
	handleChange: (value: any, inputField: any) => void;
	wizardData: WizardData;
}

const RoomMainSelectionWizard = ({ handleChange, wizardData }: RoomMainSelectionWizardProps) => {
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

		// Setting selectedMeshes inside the store, will automatically refilter the selectedFilteredRooms, which is passed into the Accordion
		if (filteredRoomMeshNames.length === 1) {
			showSelectedRoom(filteredRoomMeshNames[0]);
			handleChange(filteredRoomMeshNames[0], 'activeMainRoom');
		} else {
			showSelectedRooms(filteredRoomMeshNames);
		}
		setFilteredRoomMeshesNames(filteredRoomMeshNames);
	};

	const handleOnOpen = (meshName: string) => {
		showSelectedRoom(meshName);

		const mainRoomAdditions = wizardData.mainRoom;

		if (wizardData.mainRoom.map((item) => item.room).includes(meshName)) {
			console.log('OVERWRITE EXISTING ITEM');
			const index = wizardData.mainRoom.findIndex((item) => item.room === meshName);
			mainRoomAdditions[index] = {
				room: meshName,
				equipment: wizardData.mainRoom[index].equipment,
				chairFormation: wizardData.mainRoom[index].chairFormation,
			};
			handleChange(mainRoomAdditions, 'mainRoom');
		} else {
			console.log('ADD NEW ITEM');
			const newRoomValue = [
				...wizardData.mainRoom,
				{
					room: meshName,
					equipment: '',
					chairFormation: '',
				},
			];
			handleChange(newRoomValue, 'mainRoom');
		}
		handleChange(meshName, 'activeMainRoom');
	};

	const handleOnClose = (meshNameCorrespondingToId: string) => {
		filteredRoomMeshesNames && showSelectedRooms(filteredRoomMeshesNames, false);
	};

	const handleOnEquipmentSelected = (toggledRoomName: string, toggledMeshName: string, category?: string) => {
		const newMainRoomAdditions = wizardData.mainRoom;

		if (newMainRoomAdditions.map((item) => item.room).includes(toggledRoomName)) {
			console.log('OVERWRITE EXISTING ITEM');
			const index = newMainRoomAdditions.findIndex((item) => item.room === toggledRoomName);

			if (
				newMainRoomAdditions[index].room === toggledRoomName &&
				newMainRoomAdditions[index].equipment === toggledMeshName
			) {
				console.log('RESET EXISTING ITEM');
				newMainRoomAdditions[index] = {
					room: toggledRoomName,
					equipment: '', // reset the selected equipment to empty string
					chairFormation: newMainRoomAdditions[index].chairFormation, // set the already existing chairFormation value of this room
				};
			} else {
				newMainRoomAdditions[index] = {
					room: toggledRoomName,
					equipment: toggledMeshName, // set the selected equipment
					chairFormation: newMainRoomAdditions[index].chairFormation, // set the already existing chairFormation value of this room
				};
			}

			handleChange(newMainRoomAdditions, 'mainRoom');
		} else {
			console.log('ADD NEW ITEM');
			// add the selected room (toggledRoomName) with the selected equipment (toggledMeshName) to the wizardData
			const newRoomEquipmentValue = [
				...wizardData.mainRoom,
				{ room: toggledRoomName, equipment: toggledMeshName, chairFormation: '' },
			];
			handleChange(newRoomEquipmentValue, 'mainRoom');
		}
		setMeshChildVisibility(toggledRoomName, toggledMeshName, category);
	};

	const handleOnChairFormationSelected = (toggledRoomName: string, toggledMeshName: string, category?: string) => {
		const newEquipmentList = wizardData.mainRoom;

		if (newEquipmentList.map((item) => item.room).includes(toggledRoomName)) {
			console.log('OVERWRITE EXISTING ITEM');
			const index = newEquipmentList.findIndex((item) => item.room === toggledRoomName);

			if (
				newEquipmentList[index].room === toggledRoomName &&
				newEquipmentList[index].chairFormation === toggledMeshName
			) {
				console.log('RESET EXISTING ITEM');
				newEquipmentList[index] = {
					room: toggledRoomName,
					equipment: newEquipmentList[index].equipment, // set the already existing chairFormation value of this room
					chairFormation: '', // reset the selected chairFormation to empty string
				};
			} else {
				newEquipmentList[index] = {
					room: toggledRoomName,
					equipment: newEquipmentList[index].equipment, // set the already existing equipment value of this room
					chairFormation: toggledMeshName, // set the selected chairFormation
				};
			}
			handleChange(newEquipmentList, 'mainRoom');
		} else {
			console.log('ADD NEW ITEM');
			// add the selected room (toggledRoomName) with the selected chairFormation (toggledMeshName) to the wizardData
			const newRoomEquipmentValue = [
				...wizardData.mainRoom,
				{ room: toggledRoomName, equipment: '', chairFormation: toggledMeshName },
			];
			handleChange(newRoomEquipmentValue, 'mainRoom');
		}
		setMeshChildVisibility(toggledRoomName, toggledMeshName, category);
	};

	return (
		<Accordion
			roomList={filteredRoomMeshes}
			activeRoom={wizardData.activeMainRoom}
			roomAdditionsData={wizardData.mainRoom}
			handleOnOpen={handleOnOpen}
			handleOnClose={handleOnClose}
			handleOnEquipmentSelected={handleOnEquipmentSelected}
			handleOnChairFormationSelected={handleOnChairFormationSelected}
		/>
	);
};

export default RoomMainSelectionWizard;
