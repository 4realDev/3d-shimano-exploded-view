import { createRef } from 'react';
import { roomInfoList, roomList } from '../../../data/roomData';
import { resetScene, showAndSelectAllRooms } from '../../../store/useCameraStore';
import Accordion from '../../ui/Accordion/Accordion';
import styles from './RoomSelection.module.scss';

const RoomSelection = () => {
	const refs = roomInfoList.reduce((acc: any, value) => {
		acc[value.id] = createRef();
		return acc;
	}, {});

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<Accordion roomList={roomList} refs={refs} />
				<button
					className={styles.card__button}
					onClick={() => {
						resetScene();
					}}
				>
					RESET
				</button>
				<button
					className={styles.card__button}
					onClick={() => {
						showAndSelectAllRooms();
					}}
				>
					SHOW ALL ROOMS
				</button>
			</div>
		</div>
	);
};

export default RoomSelection;
