import styles from './RoomSelection.module.scss';
import { updateWizardData, useWizardStore } from '../../../store/useWizardStore';
import RoomMainSelectionWizard from '../../wizard/RoomMainSelectionWizard/RoomMainSelectionWizard';

const RoomSelection = () => {
	const wizardData = useWizardStore((state) => state.wizardData);

	const handleChange = (value: any, inputField: any) => {
		updateWizardData(value, inputField);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<RoomMainSelectionWizard
					wizardData={wizardData}
					handleChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default RoomSelection;
