import { roomList } from '../../../data/roomData';
import { resetScene, showAndSelectAllRooms } from '../../../store/useCameraStore';
import Accordion from '../../ui/Accordion/Accordion';
import styles from './RoomSelection.module.scss';

const RoomSelection = () => {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<Accordion roomList={roomList} />
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
