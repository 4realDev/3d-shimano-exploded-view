import { useState } from 'react';
import styles from './RoomSelection.module.scss';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Notification from '../../icons/Notification';
import RoomFilteringWizard from '../../wizard/RoomFilteringWizard/RoomFilteringWizard';
import RoomSummaryWizard from '../../wizard/RoomSummaryWizard/RoomSummaryWizard';
import RoomSideSelectionWizard from '../../wizard/RoomSideSelectionWizard/RoomSideSelectionWizard';
import RoomMainSelectionWizard from '../../wizard/RoomMainSelectionWizard/RoomMainSelectionWizard';
import { StepButton, StepLabel } from '@mui/material';
import { resetWizardData, setStep, updateWizardData, useWizardStore } from '../../../store/useWizardStore';
import { resetScene, setFilteredMeshes, setSelectedMeshes, showRoomsOverview } from '../../../store/useCameraStore';
import DebugControlPanel from '../../debug/DebugControlPanel/DebugControlPanel';

const steps = [
	{
		title: 'Finde den passenden Raum',
		description:
			'Nutze die Filterfunktionen um den passenden Raum für deinen Anlass zu finden. Sag uns nur, was dein Event ist, wie viele Leute daran Teilnehmen und wann es beginnt und endet? Falls dir eine oder mehrere Filteroptionen nicht bekannt sind, lass sie einfach leer.',
	},
	{
		title: 'Wähle einen Hauptraum',
		description:
			'Alle verfügbaren Haupträume werden in der Liste unten angezeigt und im Model rot markiert. Wähle und konfiguriere einen Hauptraum nach Belieben. Rotiere das 3D Model, um einen besseren Eindruck vom Raum zu bekommen.',
	},
	{
		title: 'Wähle einen Nebenraum',
		description:
			'Alle zum Hauptraum dazu passenden Nebenräume werden in der Liste unten angezeigt und im 3D Model grün markiert. Gerne kannst du einen Nebenraum optional als Breakout Room oder als Versammlungsraum dazu wählen.',
	},
	{
		title: 'Überprüfe deine Auswahl & Buche',
		description:
			'Der ausgewählte Hauptraum, sowie der ausgewählte Nebenraum (falls vorhanden) werden im 3D Model markiert. Klicke Sie an, um Sie nochmals mit den ausgewählten Konfigurationen zu sehen.',
	},
];

const RoomSelection = () => {
	const wizardData = useWizardStore((state) => state.wizardData);
	const step = useWizardStore((state) => state.step);
	const [validationPassed, setValidationPassed] = useState<boolean | null>(null);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		// Clean up date, everytime user moves back to filter step
		// But leave room configuration as they are
		if (step === 1) {
			showRoomsOverview();
			setSelectedMeshes([]);
			setFilteredMeshes([]);
			handleChange('', 'activeMainRoom');
			handleChange('', 'activeSideRoom');
		}
		setStep(step - 1);
	};

	const submitForm = () => {
		console.log('SUBMITTING TO SERVER', wizardData);
		setStep(0);
		resetScene();
		resetWizardData();
		setValidationPassed(null);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleChange = (value: any, inputField: any) => {
		updateWizardData(value, inputField);
	};

	const validateStep = (index: number) => {
		switch (index) {
			case 0:
				setValidationPassed(true);
				return true;
			case 1:
				setValidationPassed(true);
				return true;

			case 2:
				if (!!wizardData.activeMainRoom) {
					setValidationPassed(true);
					return true;
				} else {
					setValidationPassed(false);
					return false;
				}
			case 3:
				setValidationPassed(true);
				return true;
			// submit case
			case 4:
				setValidationPassed(true);
				return true;
			default:
			// do nothing
		}
	};

	const renderStep = () => {
		switch (step) {
			case 0:
				return <RoomFilteringWizard wizardData={wizardData} handleChange={handleChange} />;
			case 1:
				return <RoomMainSelectionWizard wizardData={wizardData} handleChange={handleChange} />;
			case 2:
				return <RoomSideSelectionWizard wizardData={wizardData} handleChange={handleChange} />;
			case 3:
				return <RoomSummaryWizard wizardData={wizardData} handleChange={handleChange} />;
			default:
			// do nothing
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.card__headingStepperContainer}>
					<h1 className={styles.card__heading}>{steps[step].title}</h1>
					<Stepper nonLinear activeStep={step} variant='outlined'>
						{steps.map((stepItem, index) => (
							<Step key={stepItem.title}>
								<StepLabel />
							</Step>
						))}
					</Stepper>
					{steps[step].description && <p className={styles.card__description}>{steps[step].description}</p>}
				</div>
			</div>
			<div className={styles.card}>{renderStep()}</div>
			<div className={styles.card}>
				<div className={styles.card__buttonContainer}>
					<div className={styles.card__buttonWrapper}>
						{step > 0 && (
							<button className={styles.card__button} onClick={() => prevStep()}>
								Zurück
							</button>
						)}
						<button
							className={styles.card__button}
							onClick={() => validateStep(step + 1) && (step < 3 ? nextStep() : submitForm())}
						>
							{step === 0 ? 'Zum Raumplaner' : step < 3 ? 'Weiter' : 'Senden'}
						</button>
					</div>
					{step === 1 && !validationPassed && (
						<div className={styles.card__validationHint}>
							<Notification fill={'#ff0000'} />
							<p>Bitte wählen Sie einen Hauptraum aus.</p>
						</div>
					)}
				</div>
			</div>
			<div className={styles.card}>
				<DebugControlPanel />
			</div>
		</div>
	);
};

export default RoomSelection;
