import styles from './Selection.module.scss';
import {
	handleRoomDataChange,
	updateWizardData,
	useWizardStore,
} from '../../../store/useWizardStore';
import { roomList } from '../../../data/roomData';
import {
	showAndSelectRoom,
	setSelectedMeshes,
	showRoomsOverview,
} from '../../../store/useCameraStore';
import List from '../../ui/List/List';

const Selection = () => {
	const wizardData = useWizardStore((state) => state.wizardData);

	const handleChange = (value: any, inputField: any) => {
		updateWizardData(value, inputField);
	};

	const handleOnOpen = (toggledMeshName: string) => {
		handleRoomDataChange(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = (toggledMeshName: string) => {
		setSelectedMeshes([]);
		showRoomsOverview();
		wizardData.activeMainRoom === toggledMeshName && handleChange('', 'activeMainRoom');
	};

	// ADJUSTED
	const renderAccordionItems = () => {
		return (
			<List
				roomList={roomList}
				activeRoom={wizardData.activeMainRoom}
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
