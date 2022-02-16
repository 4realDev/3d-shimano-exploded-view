import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import {
	CHAIR_FORMATION,
	EQUIPMENT,
	EVENT_TYPES,
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
	useCameraStore,
} from '../../../store/useCameraStore';
import { toggleMeshChildVisibility } from '../../../store/useMeshStore';
import { handleRoomAdditionsChange, handleRoomDataChange, WizardDataType } from '../../../store/useWizardStore';
import Accordion from '../../ui/Accordion/Accordion';
import NoResults from '../../ui/NoResults/NoResults';

interface RoomMainSelectionWizardProps {
	wizardData: WizardDataType;
	handleChange: (value: any, inputField: any) => void;
}

/**
 * Returns only the rooms, where the optional selected start and / or enddate in the wizard does not intersect
 * with the already booked dates inside the bookedDates array of the RoomFetchedItems.
 * If neither the start or the end dates are selected, the passed roomList will not be filtered and will be returned as it was.
 * @param roomList List of rooms which will be filtered according to the selected date.
 * @param selectedWizardStartDate Start Date which was selected by the user in the wizard in RoomFilteringWizard
 * @param selectedWizardEndDate End Date which was selected by the user in the wizard in RoomFilteringWizard
 */
export const filterAfterDate = (
	roomList: RoomFetchedDataType[],
	selectedWizardStartDate: Date | null,
	selectedWizardEndDate: Date | null
) => {
	return roomList.filter((room) => {
		let notBooked = true;
		for (let date of room.info.bookedDates) {
			const bookedStartDate = new Date(date.start);
			const bookedEndDate = new Date(date.end);

			// only startDate was entred
			if (selectedWizardStartDate !== null && selectedWizardEndDate === null) {
				// checks if selected date is NOT intersecting with all booked dates
				if (selectedWizardStartDate < bookedStartDate || selectedWizardStartDate > bookedEndDate) {
					// if selected date is not intersecting, continue checking all other dates of this room
					continue;
				}
				// if selected date intersects with one of the booked dates
				else {
					// set flag false (room already booked), break loop and return false to filter room out of the list
					notBooked = false;
					break;
				}
			}

			// only endDate was entred
			else if (selectedWizardEndDate !== null && selectedWizardStartDate === null) {
				if (selectedWizardEndDate < bookedStartDate || selectedWizardEndDate > bookedEndDate) {
					continue;
				} else {
					notBooked = false;
					break;
				}
			}

			// both dates were entred
			else if (selectedWizardStartDate !== null && selectedWizardEndDate !== null) {
				if (
					(selectedWizardStartDate < bookedStartDate && selectedWizardEndDate < bookedStartDate) ||
					(selectedWizardStartDate > bookedEndDate && selectedWizardEndDate > bookedEndDate)
				) {
					continue;
				} else {
					notBooked = false;
					break;
				}
			}
		}
		return notBooked;
	});
};

const RoomMainSelectionWizard = ({ wizardData, handleChange }: RoomMainSelectionWizardProps) => {
	const accordionItemsMaximumRenderTime = 150;
	const [accordionItemsLoading, setAccordionItemsLoading] = useState(true);

	const filteredMeshes = useCameraStore((state) => state.filteredMeshes);
	const filteredRoomMeshes = roomList.filter((room) => {
		return filteredMeshes?.includes(room.model.meshName);
	});

	useEffect(() => {
		filterRoomSelection();
		const timeout = setTimeout(() => {
			setAccordionItemsLoading(false);
		}, accordionItemsMaximumRenderTime);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const filterMainRooms = (roomList: RoomFetchedDataType[]) => {
		return roomList.filter((room) => room.info.fittingSideRooms);
	};

	const filterAfterPersonNum = (roomList: RoomFetchedDataType[]) => {
		if (wizardData.personNum !== '') {
			return roomList.filter((room) => {
				// When room has extensions, therefore an array with a min and max number of personCapacity
				// check if the largest personCapacity is greater or equal to the entered number of participants in the wizard
				if (Array.isArray(room.info.personCapacity))
					return room.info.personCapacity[1] >= parseInt(wizardData.personNum);
				else return room.info.personCapacity >= parseInt(wizardData.personNum);
			});
		}
		return roomList;
	};

	const filterAfterEventType = (roomList: RoomFetchedDataType[]) => {
		if (wizardData.eventType !== EVENT_TYPES.all) {
			return roomList.filter((room) => room.info.fittingEventTypes?.includes(wizardData.eventType!!));
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
		filteredMainRoomList = filterAfterDate(filteredMainRoomList, wizardData.startDate, wizardData.endDate);
		const filteredMainRoomMeshNames = filteredMainRoomList.map((room) => room.model.meshName);

		// If the activeMainRoom was already set and the filter was adjusted again (by stepping back to RoomFilterWizard and changing filter criteria),
		// check if the activeMainRoom is still fitting the new filter criteria -> if not, empty activeMainRoom
		filteredMainRoomMeshNames.includes(wizardData.activeMainRoom) === false && handleChange('', 'activeMainRoom');

		// if main room was already selected
		// show main room inside model (for stepping back and forth with stepper)
		// else show overview of all filtered main rooms
		wizardData.activeMainRoom !== ('' as INTERACTABLE_MESH_NAMES)
			? showAndSelectRoom(wizardData.activeMainRoom)
			: showAndSelectRooms(filteredMainRoomMeshNames);

		// Setting selectedMeshes inside the store, will automatically refilter the selectedFilteredRooms, which is passed into the Accordion
		// setFilteredRoomMeshesNames(filteredMainRoomMeshNames);
		setFilteredMeshes(filteredMainRoomMeshNames);
	};

	const handleOnOpen = (toggledMeshName: string) => {
		handleRoomDataChange(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = (toggledMeshName: string) => {
		setSelectedMeshes([]);
		showRoomsOverview();
		wizardData.activeMainRoom === toggledMeshName && handleChange('', 'activeMainRoom');
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
		if (filteredMeshes.length === 0) {
			return (
				<NoResults
					message='Leider entspricht kein Raum den angegebenen Filterkriterien.'
					hint='Sie können aber jeder Zeit einen Schritt zurück gehen und ihre Filterkriterien anpassen.'
				/>
			);
		}

		return (
			<Accordion
				roomList={filteredRoomMeshes}
				activeRoom={wizardData.activeMainRoom}
				roomAdditionsData={wizardData.mainRooms}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
				handleAdditionsOnChange={handleAdditionsOnChange}
			/>
		);
	};

	return renderAccordionItems();
};

export default RoomMainSelectionWizard;
