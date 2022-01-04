import { CHAIR_FORMATION, EQUIPMENT, RoomItemsList, ROOM_ADDITIONS_CATEGORY } from '../../../data/roomData';
import ChairFormationCircle from '../../icons/ChairFormationCircle';
import ChairFormationShuffled from '../../icons/ChairFormationShuffled';
import ChairFormationSquare from '../../icons/ChairFormationSquare';
import MeshVisibilityButton from '../MeshVisibilityButton/MeshVisibilityButton';
// npm i classnames
import AccordionItem from '../AccordionItem/AccordionItem';
import styles from './Accordion.module.scss';
import Stage from '../../icons/Stage';
import Podium from '../../icons/Podium';
import { WizardRoomData } from '../../../store/useWizardStore';

type AccordionProps = {
	roomList: RoomItemsList[];
	activeRoom: string | null;
	roomAdditionsData: WizardRoomData[] | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
	handleOnEquipmentSelected: (toggledRoomName: string, toggledMeshName: string, category?: string) => void;
	handleOnChairFormationSelected: (toggledRoomName: string, toggledMeshName: string, category?: string) => void;
};

const Accordion = ({
	roomList,
	activeRoom,
	roomAdditionsData,
	handleOnOpen,
	handleOnClose,
	handleOnEquipmentSelected,
	handleOnChairFormationSelected,
}: AccordionProps) => {
	const getFormationIcon = (formation: string) => {
		switch (formation) {
			case CHAIR_FORMATION.shuffle:
				return <ChairFormationShuffled />;
			case CHAIR_FORMATION.square:
				return <ChairFormationSquare />;
			case CHAIR_FORMATION.circle:
				return <ChairFormationCircle />;
			default:
				return null;
		}
	};

	const getEquipmentIcon = (equipment: string) => {
		switch (equipment) {
			case EQUIPMENT.stage:
				return <Stage />;
			case EQUIPMENT.podium:
				return <Podium />;
			default:
				return null;
		}
	};

	const getActiveStateOfRoomAdditionIcons = (
		accordionItemMeshName: string,
		accordionItemRoomAddition: string,
		category: string
	) => {
		if (category === ROOM_ADDITIONS_CATEGORY.equipment) {
			const equipmentCorrespondingToAccordionItem = roomAdditionsData?.find(
				(item) => item.room === accordionItemMeshName
			)?.equipment;
			console.log(equipmentCorrespondingToAccordionItem);
			console.log(accordionItemRoomAddition);
			if (equipmentCorrespondingToAccordionItem === accordionItemRoomAddition) {
				return true;
			}
			return false;
		} else if (category === ROOM_ADDITIONS_CATEGORY.chairFormation) {
			const chairFormationCorrespondingToAccordionItem = roomAdditionsData?.find(
				(item) => item.room === accordionItemMeshName
			)?.chairFormation;
			console.log(chairFormationCorrespondingToAccordionItem);
			console.log(accordionItemRoomAddition);
			if (chairFormationCorrespondingToAccordionItem === accordionItemRoomAddition) {
				return true;
			}
			return false;
		}
		return false;
	};

	return (
		<div className={styles.accordion}>
			{roomList.map((room, roomIndex) => (
				<AccordionItem
					id={room.info.id}
					title={room.info.title}
					personCapacity={room.info.personCapacity}
					area={room.info.area}
					height={room.info.height}
					img={room.info.img}
					isActive={room.model.meshName === activeRoom}
					activeRoom={activeRoom}
					handleOnOpen={handleOnOpen}
					handleOnClose={handleOnClose}
				>
					{room.info.chairFormations && (
						<div className={styles.visibilityToggleContainer}>
							{Object.values(room.info.chairFormations).map((formation) => {
								return (
									<MeshVisibilityButton
										toggledRoomName={roomList[roomIndex].model.meshName}
										toggledMeshName={formation}
										toggleIcon={getFormationIcon(formation)}
										category={ROOM_ADDITIONS_CATEGORY.chairFormation}
										isActive={getActiveStateOfRoomAdditionIcons(
											roomList[roomIndex].model.meshName,
											formation,
											ROOM_ADDITIONS_CATEGORY.chairFormation
										)}
										onClick={handleOnChairFormationSelected}
									/>
								);
							})}
						</div>
					)}

					{room.info.equipment && (
						<div className={styles.visibilityToggleContainer}>
							{Object.values(room.info.equipment).map((equipment) => {
								return (
									<MeshVisibilityButton
										toggledRoomName={roomList[roomIndex].model.meshName}
										toggledMeshName={equipment}
										toggleIcon={getEquipmentIcon(equipment)}
										category={ROOM_ADDITIONS_CATEGORY.equipment}
										isActive={getActiveStateOfRoomAdditionIcons(
											roomList[roomIndex].model.meshName,
											equipment,
											ROOM_ADDITIONS_CATEGORY.equipment
										)}
										onClick={handleOnEquipmentSelected}
									/>
								);
							})}
						</div>
					)}
				</AccordionItem>
			))}
		</div>
	);
};

export default Accordion;
