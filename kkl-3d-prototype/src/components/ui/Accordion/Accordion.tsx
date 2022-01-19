import { CHAIR_FORMATION, EQUIPMENT, RoomFetchedInfo, ROOM_ADDITIONS_CATEGORY } from '../../../data/roomData';
import MeshVisibilityButton from '../MeshVisibilityButton/MeshVisibilityButton';
import AccordionItem from '../AccordionItem/AccordionItem';
import styles from './Accordion.module.scss';
import Stage from '../../icons/Stage';
import Podium from '../../icons/Podium';
import { WizardRoomData } from '../../../store/useWizardStore';
import Beamer from '../../icons/Beamer';
import ChairFormationBankett from '../../icons/ChairFormationBankett';
import ChairFormationConcert from '../../icons/ChairFormationConcert';
import ChairFormationSeminar from '../../icons/ChairFormationSeminar';

type AccordionProps = {
	roomList: RoomFetchedInfo[];
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
			case CHAIR_FORMATION.bankett:
				return <ChairFormationBankett />;
			case CHAIR_FORMATION.seminar:
				return <ChairFormationSeminar />;
			case CHAIR_FORMATION.concert:
				return <ChairFormationConcert />;
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

	const getActiveStateOfRoomChairFormationMeshButton = (
		accordionItemRoomName: string,
		accordionItemMeshButtonChairFormation: string
	) => {
		// get current selected chairFormation of room shown in the AccordionItem (if any is selected)
		const chairFormation = roomAdditionsData?.find((item) => item.room === accordionItemRoomName)?.chair_formation;
		// check if this selected chairFormation is the chairFormation shown in the MeshButton
		if (chairFormation === accordionItemMeshButtonChairFormation) {
			return true;
		}
		return false;
	};

	const getActiveStateOfRoomEquipmentMeshButton = (
		accordionItemRoomName: string,
		accordionItemMeshButtonEquipment: string
	) => {
		// get current selected equipment of room shown in the AccordionItem (if any is selected)
		const equipment = roomAdditionsData?.find((item) => item.room === accordionItemRoomName)?.equipment;
		// check if this selected equipment is the equipment shown in the MeshButton
		if (equipment === accordionItemMeshButtonEquipment) {
			return true;
		}
		return false;
	};

	return (
		<div>
			{roomList.map((room, roomIndex) => (
				<AccordionItem
					key={roomIndex}
					id={room.info.id}
					title={room.info.title}
					personCapacity={room.info.personCapacity}
					area={room.info.area}
					roomHeight={room.info.height}
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
										isActive={getActiveStateOfRoomChairFormationMeshButton(
											roomList[roomIndex].model.meshName,
											formation
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
										isActive={getActiveStateOfRoomEquipmentMeshButton(roomList[roomIndex].model.meshName, equipment)}
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
