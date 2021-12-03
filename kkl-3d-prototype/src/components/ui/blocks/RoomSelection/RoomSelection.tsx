import { createRef } from 'react';
import { roomList } from '../../../../data/roomData';
import {
	resetScene,
	setCameraPosition,
	setCameraTarget,
	setHasAnimation,
	setSelectedMeshes,
	showAndSelectAllRooms,
} from '../../../../store/useCameraStore';
import { setMeshVisibility } from '../../../../store/useMeshStore';
import Accordion from '../../Accordion/Accordion';

const RoomSelection = () => {
	const roomListModel = roomList.map((room) => room.model);
	const roomListInfo = roomList.map((room) => room.card);
	const refs = roomListInfo.reduce((acc: any, value) => {
		acc[value.id] = createRef();
		return acc;
	}, {});

	const onClick = (id: number) => {
		// setIdleState(false);
		setHasAnimation(true);
		setSelectedMeshes([`room_${id}`]);
		setMeshVisibility('roof', false);
		setCameraPosition(roomListModel[id - 1].camPos);
		setCameraTarget(roomListModel[id - 1].camTarget);
	};

	const executeScroll = (id: number) => {
		if (refs && refs.current) {
			// myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			refs[id].current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	return (
		<div className='inner-container'>
			<div className='card-container'>
				<div className='card'>
					<Accordion roomList={roomList} onClick={onClick} executeScroll={executeScroll} refs={refs} />

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
							showAndSelectAllRooms(roomListModel);
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
