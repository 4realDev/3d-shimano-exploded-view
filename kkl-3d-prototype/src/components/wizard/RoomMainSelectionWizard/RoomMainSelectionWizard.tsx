import { CircularProgress } from '@mui/material';
import { EVENT_TYPES, RoomFetchedInfo, roomList, ROOM_ADDITIONS_CATEGORY, ROOM_FITTINGS } from '../../../data/roomData';
import {
	setFilteredMeshes,
	setSelectedMeshes,
	showAndSelectRoom,
	showAndSelectRooms,
	showRoomsOverview,
	useCameraStore,
} from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import { handleRoomAdditionsChange, handleRoomDataChange, WizardData } from '../../../store/useWizardStore';
import Accordion from '../../ui/Accordion/Accordion';
import NoResults from '../../ui/NoResults/NoResults';

interface RoomMainSelectionWizardProps {
	wizardData: WizardData;
	handleChange: (value: any, inputField: any) => void;
}

const RoomMainSelectionWizard = ({ wizardData, handleChange }: RoomMainSelectionWizardProps) => {
	const accordionItemsMaximumRenderTime = 150;
	const [accordionItemsLoading, setAccordionItemsLoading] = useState(true);

	const filteredMeshes = useCameraStore((state) => state.filteredMeshes);
	const filteredRoomMeshes = roomList.filter((room) => {
		return filteredMeshes?.includes(room.model.meshName);
	});

	useEffect(() => {
		filterRoomSelection();

		setTimeout(() => {
			setAccordionItemsLoading(false);
		}, accordionItemsMaximumRenderTime);
	}, []);

	const filterMainRooms = (roomList: RoomFetchedInfo[]) => {
		return roomList.filter((room) => room.info.fittings?.includes(ROOM_FITTINGS.additionalRooms));
	};

	const filterAfterPersonNum = (roomList: RoomFetchedInfo[]) => {
		if (wizardData.personNum !== '') {
			return roomList.filter((room) => room.info.personCapacity >= parseInt(wizardData.personNum));
		}
		return roomList;
	};

	const filterAfterEventType = (roomList: RoomFetchedInfo[]) => {
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
		const filteredMainRoomMeshNames = filteredMainRoomList.map((room) => room.model.meshName);

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
				roomAdditionsData={wizardData.mainRoom}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
				handleAdditionsOnChange={handleAdditionsOnChange}
			/>
		);
	};

	return renderAccordionItems();
};

export default RoomMainSelectionWizard;
