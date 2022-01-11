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
import Beamer from '../../icons/Beamer';

type AccordionProps = {
	roomList: RoomItemsList[];
	activeRoom: string | null;
	roomAdditionsData: WizardRoomData[] | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
	handleAdditionsOnChange: (
		toggledRoomName: string,
		toggledMeshName: string,
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
				return <Stage fill='#000000' />;
			case EQUIPMENT.podium:
				return <Podium fill='#000000' />;
			case EQUIPMENT.beamer:
				return <Beamer fill='#000000' />;
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
			if (equipmentCorrespondingToAccordionItem === accordionItemRoomAddition) {
				return true;
			}
			return false;
		} else if (category === ROOM_ADDITIONS_CATEGORY.chair_formation) {
			const chairFormationCorrespondingToAccordionItem = roomAdditionsData?.find(
				(item) => item.room === accordionItemMeshName
			)?.chair_formation;
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
					key={roomIndex}
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
							{Object.values(room.info.chairFormations).map((formation, index) => {
								return (
									<MeshVisibilityButton
										key={index}
										toggledRoomName={roomList[roomIndex].model.meshName}
										toggledMeshName={formation}
										toggleIcon={getFormationIcon(formation)}
										category={ROOM_ADDITIONS_CATEGORY.chair_formation}
										isActive={getActiveStateOfRoomAdditionIcons(
											roomList[roomIndex].model.meshName,
											formation,
											ROOM_ADDITIONS_CATEGORY.chair_formation
										)}
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
										isActive={getActiveStateOfRoomAdditionIcons(
											roomList[roomIndex].model.meshName,
											equipment,
											ROOM_ADDITIONS_CATEGORY.equipment
										)}
										onClick={handleAdditionsOnChange}
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
