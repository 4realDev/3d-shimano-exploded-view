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
			{/* <div className={styles.card}>
				<div className={styles.card__headingStepperContainer}>
					<h1 className={styles.card__heading}>Shimano Deore XT RD-M8000</h1>
					<p className={styles.card__description}>
						Das Deore XT RD-M8000 Shadow Plus 11 fach Schaltwerk schaltet extrem praezise, schnell und leichtgaenig.
					</p>
					{/* <p className={styles.card__hint}>
						Hinweis: Du kannst auch mit dem 3D Modell interagieren. Durch die Rotation des Modelles oder das Anklicken
						einzelner Teile, kannst du dir einen besseren Eindruck verschaffen.
					</p> */}
			{/* </div>
			</div> */}
			<div className={styles.card}>
				<RoomMainSelectionWizard wizardData={wizardData} handleChange={handleChange} />
			</div>
			{/* <div className={styles.card}>
				<DebugControlPanel />
			</div> */}
		</div>
	);
};

export default RoomSelection;
