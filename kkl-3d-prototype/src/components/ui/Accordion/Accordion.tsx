import { useEffect } from 'react';
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
	refs: any;
};

const Accordion = ({ roomList, refs }: Accordion) => {
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);

	// TODO: Move this logic inside AccordionItem component itself
	// TODO: Find a way to focus on the item / show that it is active
	// TODO: Closing AccordionItem should trigger the reset of the model
	// TODO: Hardcoded Logic enforcing naming convetion of "xyz_1" -> maybe found another way, if possible
	useEffect(() => {
		if (selectedMeshes.length === 1) {
			const roomNumber = parseInt(selectedMeshes[0].split('_')[1]);
			window.scrollTo({
				top: refs[roomNumber].current.offsetTop - 100,
				behavior: 'smooth',
			});
		} else {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	}, [selectedMeshes]);

	const executeScroll = (id: number) => {
		if (refs && refs.current) {
			// myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			refs[id].current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

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
					seats={room.seats}
					area={room.area}
					height={room.height}
					selectedMeshes={selectedMeshes}
					executeScroll={executeScroll}
					ref={refs[room.id]}
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
