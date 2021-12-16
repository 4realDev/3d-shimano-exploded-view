import { useState } from 'react';
import { roomList, roomModelList } from '../../../data/roomData';
import { resetScene, setFilteredMeshes, showSelectedRoom, showSelectedRooms } from '../../../store/useCameraStore';
import Accordion from '../../ui/Accordion/Accordion';
import styles from './RoomSelection.module.scss';

const RoomSelection = () => {
	const [personNumber, setPersonNumber] = useState<string>('0');
	const handlePersonNumberChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		setPersonNumber(event.target.value);
	};

	const filterRoomSelection = () => {
		const filteredRoomList = roomList.filter((room) => room.info.personCapacity >= parseInt(personNumber));
		const filteredRoomListMeshNames = filteredRoomList.map((room) => room.model.meshName);
		if (filteredRoomListMeshNames.length === 1) {
			showSelectedRoom(filteredRoomListMeshNames[0]);
		} else {
			showSelectedRooms(filteredRoomListMeshNames);
		}
		setFilteredMeshes(filteredRoomListMeshNames);
	};

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
						showSelectedRooms(roomModelList.map((room) => room.meshName));
					}}
				>
					SHOW ALL ROOMS
				</button>
				<button
					className={styles.card__button}
					onClick={() => {
						filterRoomSelection();
					}}
				>
					FILTER
				</button>
				<div className={styles.card__inputWrapper}>
					<p className={styles.card__inputText}>Anzahl Teilnehmer</p>
					<input
						type='text'
						value={personNumber}
						// onKeyPress={(event) => {
						// 	if (!/[0-9]/.test(event.key)) {
						// 		event.preventDefault();
						// 	}
						// }}
						onChange={(event) => handlePersonNumberChanged(event)}
					></input>
				</div>
			</div>
		</div>
	);
};

export default RoomSelection;
