import { useEffect, useState } from 'react';
import { RoomItemsList, roomList } from '../../../data/roomData';
import { showSelectedRoom, showSelectedRooms, useCameraStore } from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import { WizardData } from '../../../store/useWizardStore';
import { getMeshObjectByMeshName } from '../../../utils/formatRoom';
import Accordion from '../../ui/Accordion/Accordion';

interface RoomSideSelectionWizardProps {
	handleChange: (value: any, inputField: any) => void;
	wizardData: WizardData;
}

const RoomSideSelectionWizard = ({ handleChange, wizardData }: RoomSideSelectionWizardProps) => {
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);

	const [fittingSideRooms, setFittingSideRooms] = useState<RoomItemsList[]>([]);

	useEffect(() => {
		const activeMainRoom = getMeshObjectByMeshName(wizardData.activeMainRoom);
		const fittingSideRooms = roomList.filter((room) => {
			return activeMainRoom?.info.fittingSideRoom?.includes(room.model.meshName);
		});
		setFittingSideRooms(fittingSideRooms);
	}, []);

	const handleOnOpen = (meshName: string) => {
		showSelectedRoom(meshName);

		const sideRoomAdditions = wizardData.sideRoom;

		if (wizardData.sideRoom.map((item) => item.room).includes(meshName)) {
			console.log('OVERWRITE EXISTING ITEM');
			const index = wizardData.sideRoom.findIndex((item) => item.room === meshName);
			sideRoomAdditions[index] = {
				room: meshName,
				equipment: wizardData.sideRoom[index].equipment,
				chairFormation: wizardData.sideRoom[index].chairFormation,
			};
			handleChange(sideRoomAdditions, 'sideRoom');
		} else {
			console.log('ADD NEW ITEM');
			const newRoomValue = [
				...wizardData.sideRoom,
				{
					room: meshName,
					equipment: '',
					chairFormation: '',
				},
			];
			handleChange(newRoomValue, 'sideRoom');
		}
		handleChange(meshName, 'activeSideRoom');
	};

	const handleOnClose = (meshNameCorrespondingToId: string) => {
		showSelectedRooms(selectedMeshes, false);
	};

	const handleOnEquipmentSelected = (toggledRoomName: string, toggledMeshName: string, category?: string) => {
		const sideRoomAdditions = wizardData.sideRoom;

		if (sideRoomAdditions.map((item) => item.room).includes(toggledRoomName)) {
			console.log('OVERWRITE EXISTING ITEM');
			const index = sideRoomAdditions.findIndex((item) => item.room === toggledRoomName);

			if (sideRoomAdditions[index].room === toggledRoomName && sideRoomAdditions[index].equipment === toggledMeshName) {
				console.log('RESET EXISTING ITEM');
				sideRoomAdditions[index] = {
					room: toggledRoomName,
					equipment: '', // reset the selected equipment to empty string
					chairFormation: sideRoomAdditions[index].chairFormation, // set the already existing chairFormation value of this room
				};
			} else {
				sideRoomAdditions[index] = {
					room: toggledRoomName,
					equipment: toggledMeshName, // set the selected equipment
					chairFormation: sideRoomAdditions[index].chairFormation, // set the already existing chairFormation value of this room
				};
			}

			handleChange(sideRoomAdditions, 'sideRoom');
		} else {
			console.log('ADD NEW ITEM');
			// add the selected room (toggledRoomName) with the selected equipment (toggledMeshName) to the wizardData
			const newSideRoomAdditions = [
				...wizardData.sideRoom,
				{ room: toggledRoomName, equipment: toggledMeshName, chairFormation: '' },
			];
			handleChange(newSideRoomAdditions, 'sideRoom');
		}
		setMeshChildVisibility(toggledRoomName, toggledMeshName, category);
	};

	const handleOnChairFormationSelected = (toggledRoomName: string, toggledMeshName: string, category?: string) => {
		const sideRoomAdditions = wizardData.sideRoom;

		if (sideRoomAdditions.map((item) => item.room).includes(toggledRoomName)) {
			console.log('OVERWRITE EXISTING ITEM');
			const index = sideRoomAdditions.findIndex((item) => item.room === toggledRoomName);

			if (
				sideRoomAdditions[index].room === toggledRoomName &&
				sideRoomAdditions[index].chairFormation === toggledMeshName
			) {
				console.log('RESET EXISTING ITEM');
				sideRoomAdditions[index] = {
					room: toggledRoomName,
					equipment: sideRoomAdditions[index].equipment, // set the already existing chairFormation value of this room
					chairFormation: '', // reset the selected chairFormation to empty string
				};
			} else {
				sideRoomAdditions[index] = {
					room: toggledRoomName,
					equipment: sideRoomAdditions[index].equipment, // set the already existing equipment value of this room
					chairFormation: toggledMeshName, // set the selected chairFormation
				};
			}
			handleChange(sideRoomAdditions, 'sideRoom');
		} else {
			console.log('ADD NEW ITEM');
			// add the selected room (toggledRoomName) with the selected chairFormation (toggledMeshName) to the wizardData
			const sideRoomAdditions = [
				...wizardData.sideRoom,
				{ room: toggledRoomName, equipment: '', chairFormation: toggledMeshName },
			];
			handleChange(sideRoomAdditions, 'sideRoom');
		}
		setMeshChildVisibility(toggledRoomName, toggledMeshName, category);
	};

	return (
		<Accordion
			roomList={fittingSideRooms}
			activeRoom={wizardData.activeSideRoom}
			roomAdditionsData={wizardData.sideRoom}
			handleOnOpen={handleOnOpen}
			handleOnClose={handleOnClose}
			handleOnEquipmentSelected={handleOnEquipmentSelected}
			handleOnChairFormationSelected={handleOnChairFormationSelected}
		/>
	);
};

export default RoomSideSelectionWizard;
