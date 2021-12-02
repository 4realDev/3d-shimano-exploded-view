import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAIR_FORMATION, RoomListItem } from '../../../data/roomData';
import { setMeshChildVisibility } from '../../../store/mesh/meshSlice';
import { RootState } from '../../../store/store';
import ChairFormationCircle from '../../icons/ChairFormationCircle';
import ChairFormationShuffled from '../../icons/ChairFormationShuffled';
import ChairFormationSquare from '../../icons/ChairFormationSquare';
import MeshVisibilityButton from '../MeshVisibilityButton/MeshVisibilityButton';
import styles from './Accordion.module.css';
// npm i classnames
import AccordionItem from './AccordionItem';

type Accordion = {
	roomList: RoomListItem[];
	executeScroll: (id: number) => void;
	onClick: (id: number) => void;
	refs: any;
};

const Accordion = ({ roomList, onClick, executeScroll, refs }: Accordion) => {
	const selectedMeshes = useSelector((state: RootState) => state.camera.selectedMeshes);
	const dispatch = useDispatch();
	const roomInfoList = useMemo(() => roomList.map((room) => room.card), [roomList]);
	// TODO: Move this logic inside AccordionItem component itself
	// TODO: Find a way to focus on the item / show that it is active
	// TODO: Closing AccordionItem should trigger the reset of the model
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

	const onMeshVisibilityButtonClicked = (toggledRoomName: string, toggledMeshName: string) => {
		dispatch(setMeshChildVisibility({ toggledRoomName: toggledRoomName, toggledMeshName: toggledMeshName }));
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
					onClick={onClick}
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
