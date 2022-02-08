import { useState } from 'react';
import styles from './RoomSelection.module.scss';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Notification from '../../icons/Notification';
import RoomFilteringWizard from '../../wizard/RoomFilteringWizard/RoomFilteringWizard';
import RoomSummaryWizard from '../../wizard/RoomSummaryWizard/RoomSummaryWizard';
import RoomSideSelectionWizard from '../../wizard/RoomSideSelectionWizard/RoomSideSelectionWizard';
import RoomMainSelectionWizard from '../../wizard/RoomMainSelectionWizard/RoomMainSelectionWizard';
import { StepLabel } from '@mui/material';
import { resetWizardData, setStep, updateWizardData, useWizardStore } from '../../../store/useWizardStore';
import { resetScene, setFilteredMeshes, setSelectedMeshes, showRoomsOverview } from '../../../store/useCameraStore';
import DebugControlPanel from '../../debug/DebugControlPanel/DebugControlPanel';

const steps = [
	{
		title: 'Finde den passenden Raum',
		description:
			'Nutze die Filterfunktionen um den passenden Raum für deinen Anlass zu finden. Sag uns nur, was du für einen Event planst, wie viele Leute daran teilnehmen und wann es startet und endet. Falls dir eine oder mehrere Informationen nicht bekannt sind, kannst du diese leer lassen.',
		hint: 'Hinweis: Du kannst auch mit dem 3D Model interagieren. Durch die Rotation des Models oder das Anklicken einzelner Räume, kannst du dir einen besseren Eindruck von den Räumen, deren Position sowie Proportionen verschaffen.',
		prevButton: '',
		nextButton: 'Passende Räume suchen',
	},
	{
		title: 'Wähle und Konfiguriere einen Hauptraum',
		description:
			'Alle verfügbaren Haupträume werden in der Liste unten angezeigt und im Model rot markiert. Wähle und konfiguriere einen Hauptraum nach Belieben.',
		prevButton: 'Zurück',
		nextButton: 'Weiter',
	},
	{
		title: 'Wähle und Konfiguriere einen Nebenraum',
		description:
			'Alle zum Hauptraum dazu passenden Nebenräume werden in der Liste unten angezeigt und im 3D Model grün markiert. Gerne kannst du einen Nebenraum optional als Breakout Room oder als Versammlungsraum dazu wählen.',
		prevButton: 'Zurück',
		nextButton: 'Weiter',
	},
	{
		title: 'Überprüfe deine Auswahl & Buche',
		description:
			'Der ausgewählte Hauptraum, sowie der ausgewählte Nebenraum (falls vorhanden) werden in der Liste unten angezeigt und im 3D Model markiert.',
		hint: 'Hinweis: Du kannst den ausgewählten Haupt- und Nebenraum im 3D Model auswählen, um eine Nahansicht vom Raum mit den ausgewählten Konfigurationen zu erhalten.',
		prevButton: 'Zurück',
		nextButton: 'Buchen',
	},
];

const RoomSelection = () => {
	const wizardData = useWizardStore((state) => state.wizardData);
	const step = useWizardStore((state) => state.step);
	const [validationPassed, setValidationPassed] = useState<boolean | null>(null);

	const nextStep = () => {
		if (step === 1 && wizardData.additionalRooms === false) setStep(step + 2);
		else setStep(step + 1);
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
		if (step === 3 && wizardData.additionalRooms === false) setStep(step - 2);
		else setStep(step - 1);
	};

	const submitForm = () => {
		console.log('SUBMITTING TO SERVER', wizardData);
		setStep(0);
		resetScene();
		resetWizardData();
		setValidationPassed(null);
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

	const renderWizardStep = () => {
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
					{/* When additionalRooms are selected, there should be an extra step inside the wizard */}
					{/* Else step "3" should not be rendered inside the stepper and step "4" should be visualized as the removed step "3" */}
					<Stepper
						nonLinear
						activeStep={step === 3 && !wizardData.additionalRooms ? step - 1 : step}
						variant='outlined'
					>
						{steps.map((_stepItem, index) => {
							return index === 2 && !wizardData.additionalRooms ? null : (
								<Step key={index}>
									<StepLabel key={index} icon={index === 3 && !wizardData.additionalRooms ? index : index + 1} />
								</Step>
							);
						})}
					</Stepper>
					{steps[step].description && <p className={styles.card__description}>{steps[step].description}</p>}
					{steps[step].hint && <p className={styles.card__hint}>{steps[step].hint}</p>}
				</div>
			</div>
			<div className={styles.card}>{renderWizardStep()}</div>
			<div className={styles.card}>
				<div className={styles.card__buttonContainer}>
					<div className={styles.card__buttonWrapper}>
						{step > 0 && (
							<button className={styles.card__button} onClick={() => prevStep()}>
								{steps[step].prevButton}
							</button>
						)}
						<button
							className={styles.card__button}
							onClick={() => validateStep(step + 1) && (step < 3 ? nextStep() : submitForm())}
						>
							{steps[step].nextButton}
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
			<div className={styles.card}>{<DebugControlPanel />}</div>
		</div>
	);
};

export default RoomSelection;
