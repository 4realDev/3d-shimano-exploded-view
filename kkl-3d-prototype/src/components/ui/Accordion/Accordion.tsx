import { useEffect } from 'react';
import ChairFormationCircle from '../../icons/ChairFormationCircle';
import ChairFormationShuffled from '../../icons/ChairFormationShuffled';
import ChairFormationSquare from '../../icons/ChairFormationSquare';
import { MeshObject } from '../../models/Model';
import MeshVisibilityButton from '../MeshVisibilityButton/MeshVisibilityButton';
import styles from './Accordion.module.css';
// npm i classnames
import AccordionItem from './AccordionItem';

type RoomInfo = {
	id: number;
	title: string;
	seats: number;
	area: number;
	height: number;
};

type Accordion = {
	roomInfo: RoomInfo[];
	selectedMeshes: string[];
	meshList: MeshObject[];
	setMeshList: (value: MeshObject[]) => void;
	executeScroll: (id: number) => void;
	onClick: (id: number) => void;
	refs: any;
};

const Accordion = ({ roomInfo, selectedMeshes, meshList, setMeshList, onClick, executeScroll, refs }: Accordion) => {
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

	return (
		<div className={styles.accordion}>
			{roomInfo.map((room, i) => (
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
					<div className={styles.visibilityToggleContainer}>
						<MeshVisibilityButton
							meshList={meshList}
							setMeshList={setMeshList}
							toggledRoomName={'room_1'}
							toggledMeshName={'chair_formation_1'}
							toggleIcon={<ChairFormationShuffled />}
						/>
						<MeshVisibilityButton
							meshList={meshList}
							setMeshList={setMeshList}
							toggledRoomName={'room_1'}
							toggledMeshName={'chair_formation_2'}
							toggleIcon={<ChairFormationSquare />}
						/>
						<MeshVisibilityButton
							meshList={meshList}
							setMeshList={setMeshList}
							toggledRoomName={'room_1'}
							toggledMeshName={'chair_formation_3'}
							toggleIcon={<ChairFormationCircle />}
						/>
					</div>
				</AccordionItem>
			))}
		</div>
	);
};

export default Accordion;
