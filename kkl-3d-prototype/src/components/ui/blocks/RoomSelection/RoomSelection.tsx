import { createRef } from 'react';
import { useDispatch } from 'react-redux';
import { roomList } from '../../../../data/roomData';
import { setSelectedMeshesInStore } from '../../../../store/camera/cameraSlice';
import { resetMeshVisibility, setMeshVisibility } from '../../../../store/mesh/meshSlice';
import Accordion from '../../Accordion/Accordion';

const RoomSelection = () => {
	const dispatch = useDispatch();

	const roomListModel = roomList.map((room) => room.model);
	const roomListInfo = roomList.map((room) => room.card);
	const refs = roomListInfo.reduce((acc: any, value) => {
		acc[value.id] = createRef();
		return acc;
	}, {});

	const onClick = (id: number) => {
		// setIdleState(false);
		// setHasAnimation(true);
		dispatch(setSelectedMeshesInStore([`room_${id}`]));
		dispatch(setMeshVisibility({ meshName: 'roof', visible: false }));
		// setCameraPosition(roomListModel[id - 1].camPos);
		// setCameraTarget(roomListModel[id - 1].camTarget);
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

	const resetScene = () => {
		// setHasAnimation(true);
		// setCameraPosition(controlsRef.current !== undefined ? controlsRef.current.position0! : defaultCameraPosition);
		// setCameraTarget(controlsRef.current !== undefined ? controlsRef.current.target0! : defaultCameraFocusPosition);
		dispatch(setSelectedMeshesInStore([]));
		dispatch(resetMeshVisibility());

		// TODO: Figure out better way to deactivate hasAnimation
		// after the position as damped to the defaultCameraPosition
		// setTimeout(() => {
		// 	setIdleState(true);
		// 	setHasAnimation(false);
		// }, 2250);
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
							// setIdleState(false);
							// setHasAnimation(true);
							dispatch(setMeshVisibility({ meshName: 'roof', visible: false }));
							dispatch(setSelectedMeshesInStore(roomListModel.map((room) => room.meshName)));
							// setCameraPosition(new THREE.Vector3(0, 25 + camHeightOffset, 2));
							// setCameraTarget(defaultCameraFocusPosition);
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
