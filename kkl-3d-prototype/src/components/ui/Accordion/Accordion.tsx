import { useEffect, useMemo } from 'react';
import { CHAIR_FORMATION, RoomListItem } from '../../../common/roomData';
import ChairFormationCircle from '../../icons/ChairFormationCircle';
import ChairFormationShuffled from '../../icons/ChairFormationShuffled';
import ChairFormationSquare from '../../icons/ChairFormationSquare';
import { MeshObject } from '../../models/Model';
import MeshVisibilityButton from '../MeshVisibilityButton/MeshVisibilityButton';
import styles from './Accordion.module.css';
// npm i classnames
import AccordionItem from './AccordionItem';

type Accordion = {
	roomList: RoomListItem[];
	selectedMeshes: string[];
	meshList: MeshObject[];
	setMeshList: (value: MeshObject[]) => void;
	executeScroll: (id: number) => void;
	onClick: (id: number) => void;
	refs: any;
};

const Accordion = ({ roomList, selectedMeshes, meshList, setMeshList, onClick, executeScroll, refs }: Accordion) => {
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
		let items: MeshObject[] = [...meshList]; // Make shallow copy of itemList
		let itemIndex = items.findIndex((item) => item.name === toggledRoomName); // Find index of item you want to mutate
		let item = items[itemIndex]; // Make shallow copy of the selected item
		// Overwrite properties in each child of children array in item copy
		if (itemIndex !== -1 && item.children) {
			item.children.forEach((child, i, array) => {
				// Toggle visibility of selected child / chair formation
				// Make all other children / formations in children array of the item invisible
				// child.name.replace(/[0-9]/g, '') to remove BLENDERS suffix for duplicated objects
				// -> "chair_formation_circle001" to "chair_formation_circle"
				array[i] = {
					...child,
					isVisible: child.name.replace(/[0-9]/g, '') === toggledMeshName ? !child.isVisible : false,
				};
			});
		}
		items[itemIndex] = item; // Overwrite selected item in array copy with modified selected item
		setMeshList(items); // Set state to new array copy -> overwritting state instead of mutating
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
