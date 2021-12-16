import {
	CHAIR_FORMATION,
	EQUIPMENT,
	roomInfoList,
	RoomItemsList,
	ROOM_ADDITIONS_CATEGORY,
} from '../../../data/roomData';
import { useCameraStore } from '../../../store/useCameraStore';
import { setMeshChildVisibility } from '../../../store/useMeshStore';
import ChairFormationCircle from '../../icons/ChairFormationCircle';
import ChairFormationShuffled from '../../icons/ChairFormationShuffled';
import ChairFormationSquare from '../../icons/ChairFormationSquare';
import MeshVisibilityButton from '../MeshVisibilityButton/MeshVisibilityButton';
// npm i classnames
import AccordionItem from '../AccordionItem/AccordionItem';
import styles from './Accordion.module.scss';
import Stage from '../../icons/Stage';
import Podium from '../../icons/Podium';

type Accordion = {
	roomList: RoomItemsList[];
};

const Accordion = ({ roomList }: Accordion) => {
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);
	const onMeshVisibilityButtonClicked = (toggledRoomName: string, toggledMeshName: string, category?: string) => {
		setMeshChildVisibility(toggledRoomName, toggledMeshName, category);
	};

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

	const getEquipmentIcon = (formation: string) => {
		switch (formation) {
			case EQUIPMENT.stage:
				return <Stage />;
			case EQUIPMENT.podium:
				return <Podium />;
			default:
				return null;
		}
	};

	return (
		<div className={styles.accordion}>
			{roomInfoList.map((room, roomIndex) => (
				<AccordionItem
					id={room.id}
					title={room.title}
					personCapacity={room.personCapacity}
					area={room.area}
					height={room.height}
					img={room.img}
					selectedMeshes={selectedMeshes}
				>
					{room.chairFormations && (
						<div className={styles.visibilityToggleContainer}>
							{Object.values(room.chairFormations).map((formation) => {
								return (
									<MeshVisibilityButton
										toggledRoomName={roomList[roomIndex].model.meshName}
										toggledMeshName={formation}
										toggleIcon={getFormationIcon(formation)}
										category={ROOM_ADDITIONS_CATEGORY.chairFormation}
										onClick={onMeshVisibilityButtonClicked}
									/>
								);
							})}
						</div>
					)}

					{room.equipment && (
						<div className={styles.visibilityToggleContainer}>
							{Object.values(room.equipment).map((equipment) => {
								return (
									<MeshVisibilityButton
										toggledRoomName={roomList[roomIndex].model.meshName}
										toggledMeshName={equipment}
										toggleIcon={getEquipmentIcon(equipment)}
										category={ROOM_ADDITIONS_CATEGORY.equipment}
										onClick={onMeshVisibilityButtonClicked}
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
