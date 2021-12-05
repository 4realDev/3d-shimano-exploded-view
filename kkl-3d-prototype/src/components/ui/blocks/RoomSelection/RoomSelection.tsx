import { createRef } from 'react';
import { roomInfoList, roomList } from '../../../../data/roomData';
import { resetScene, showAndSelectAllRooms } from '../../../../store/useCameraStore';
import Accordion from '../../Accordion/Accordion';

const RoomSelection = () => {
	const refs = roomInfoList.reduce((acc: any, value) => {
		acc[value.id] = createRef();
		return acc;
	}, {});

	return (
		<div className='inner-container'>
			<div className='card-container'>
				<div className='card'>
					<Accordion roomList={roomList} refs={refs} />

					<button
						className='product-button'
						onClick={() => {
							resetScene();
						}}
					>
						RESET
					</button>
					<button
						className='product-button'
						onClick={() => {
							showAndSelectAllRooms(roomList.map((room) => room.model));
						}}
					>
						SHOW ALL ROOMS
					</button>
				</div>
			</div>
		</div>
	);
};

export default RoomSelection;
