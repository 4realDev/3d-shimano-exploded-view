import {
	ChairFormationType,
	CHAIR_FORMATION,
	EQUIPMENT,
	INTERACTABLE_MESH_NAMES,
	RoomFetchedDataType,
	ROOM_ADDITIONS_CATEGORY,
} from '../../../data/roomData';
import MeshVisibilityButton from '../MeshVisibilityButton/MeshVisibilityButton';
import AccordionItem from '../AccordionItem/AccordionItem';
import styles from './Accordion.module.scss';
import { useWizardStore, WizardRoomDataType } from '../../../store/useWizardStore';
import { getFormationIcon, getEquipmentIcon, getMeshObjectInformationsByMeshName } from '../../../utils/room';

type AccordionProps = {
	roomList: RoomFetchedDataType[];
	activeRoom: string | null;
	roomAdditionsData: WizardRoomDataType[] | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
	handleAdditionsOnChange: (
		toggledRoomName: INTERACTABLE_MESH_NAMES,
		toggledMeshName: CHAIR_FORMATION | EQUIPMENT,
		category: ROOM_ADDITIONS_CATEGORY
	) => void;
};

const Accordion = ({
	roomList,
	activeRoom,
	roomAdditionsData,
	handleOnOpen,
	handleOnClose,
	handleAdditionsOnChange,
}: AccordionProps) => {
	const wizardData = useWizardStore((state) => state.wizardData);
	const getRoomChairFormationPersonCapacity = (accordionItemRoom: RoomFetchedDataType) => {
		const roomDataCorrespondingToAccordionItemRoom = roomAdditionsData?.find(
			(data) => data.room === accordionItemRoom.model.meshName
		);
		if (
			roomDataCorrespondingToAccordionItemRoom !== undefined &&
			roomDataCorrespondingToAccordionItemRoom.capacity !== undefined
		) {
			return roomDataCorrespondingToAccordionItemRoom.capacity!!;
		}
		return accordionItemRoom.info.personCapacity;
	};

	const getActiveStateOfRoomChairFormationMeshButton = (
		accordionItemRoomMeshName: string,
		accordionItemMeshButtonChairFormation: string
	) => {
		// get current selected chairFormation of room shown in the AccordionItem (if any is selected)
		const chairFormation = roomAdditionsData?.find((item) => item.room === accordionItemRoomMeshName)?.chair_formation;
		// check if this selected chairFormation is the chairFormation shown in the MeshButton
		if (chairFormation === accordionItemMeshButtonChairFormation) {
			return true;
		}
		return false;
	};

	const getActiveStateOfRoomEquipmentMeshButton = (
		accordionItemRoomMeshName: string,
		accordionItemMeshButtonEquipment: string
	) => {
		// get current selected equipment of room shown in the AccordionItem (if any is selected)
		const equipment = roomAdditionsData?.find((item) => item.room === accordionItemRoomMeshName)?.equipment;
		// check if this selected equipment is the equipment shown in the MeshButton
		if (equipment === accordionItemMeshButtonEquipment) {
			return true;
		}
		return false;
	};

	const isChairFormationImpossible = (accordionItemRoom: RoomFetchedDataType, formation: ChairFormationType) => {
		// for SideRooms all chair_formations should be possible
		if (accordionItemRoom.info.fittingSideRooms === undefined) return false;

		// get the person capacity (seats) of the passed chair formation related to the passed accordionItemRoom
		const toggledChairFormationCapacity = getMeshObjectInformationsByMeshName(
			accordionItemRoom.model.meshName
		)?.info.chairFormations?.find((chairFormation) => chairFormation.name === formation.name)?.capacity;

		// for MainRooms the chair formations which offer less seats then the chosen personNum, are impossible and should be disabled
		if (
			!Array.isArray(toggledChairFormationCapacity) &&
			toggledChairFormationCapacity !== undefined &&
			toggledChairFormationCapacity <= parseInt(wizardData.personNum)
		) {
			return true;
		} else return false;
	};

	return (
		<>
			{roomList.map((room, roomIndex) => (
				<AccordionItem
					key={roomIndex}
					title={room.info.title}
					personCapacity={getRoomChairFormationPersonCapacity(room)}
					area={room.info.area}
					img={room.info.img}
					roomFittings={room.info.fittings}
					roomMeshName={room.model.meshName}
					activeRoom={activeRoom}
					handleOnOpen={handleOnOpen}
					handleOnClose={handleOnClose}
				>
					{room.info.chairFormations && (
						<div className={styles.visibilityToggleContainer}>
							{Object.values(room.info.chairFormations).map((formation, index) => {
								return (
									<MeshVisibilityButton
										key={index}
										toggledRoomName={roomList[roomIndex].model.meshName}
										toggledMeshName={formation.name}
										toggleIcon={getFormationIcon(formation.name)}
										category={ROOM_ADDITIONS_CATEGORY.chair_formation}
										isActive={getActiveStateOfRoomChairFormationMeshButton(
											roomList[roomIndex].model.meshName,
											formation.name
										)}
										isDisabled={isChairFormationImpossible(room, formation)}
										isFixed={room.info.chairFormations !== undefined && room.info.chairFormations.length === 1}
										onClick={handleAdditionsOnChange}
									/>
								);
							})}
						</div>
					)}

					{room.info.equipment && (
						<div className={styles.visibilityToggleContainer}>
							{Object.values(room.info.equipment).map((equipment, index) => {
								return (
									<MeshVisibilityButton
										key={index}
										toggledRoomName={roomList[roomIndex].model.meshName}
										toggledMeshName={equipment}
										toggleIcon={getEquipmentIcon(equipment)}
										category={ROOM_ADDITIONS_CATEGORY.equipment}
										isActive={getActiveStateOfRoomEquipmentMeshButton(roomList[roomIndex].model.meshName, equipment)}
										onClick={handleAdditionsOnChange}
									/>
								);
							})}
						</div>
					)}
				</AccordionItem>
			))}
		</>
	);
};

export default Accordion;
