import styles from './Selection.module.scss';
import { INTERACTABLE_MESH_NAMES, roomList } from '../../../data/roomData';
import { setSelectedMeshes, setSelectedMesh } from '../../../store/useMeshStore';
import { showAndSelectRoom, showRoomsOverview } from '../../../store/useCameraStore';
import List from '../../ui/List/List';

const Selection = () => {
	const handleOnOpen = (toggledMeshName: INTERACTABLE_MESH_NAMES) => {
		setSelectedMesh(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = () => {
		setSelectedMesh(null);
		setSelectedMeshes([]);
		showRoomsOverview();
	};

	// ADJUSTED
	const renderAccordionItems = () => {
		return (
			<List
				roomList={roomList}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
			/>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>{renderAccordionItems()}</div>
		</div>
	);
};

export default Selection;
