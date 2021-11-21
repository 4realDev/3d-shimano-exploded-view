import { useEffect } from 'react';
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
	executeScroll: (id: number) => void;
	onClick: (id: number) => void;
	refs: any;
};

const Accordion = ({ roomInfo, selectedMeshes, onClick, executeScroll, refs }: Accordion) => {
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
					TEST
				</AccordionItem>
			))}
		</div>
	);
};

export default Accordion;
