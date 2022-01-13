import { useState } from 'react';
import styles from './RoomSelection.module.scss';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Notification from '../../icons/Notification';
import RoomFilteringWizard from '../../wizard/RoomFilteringWizard/RoomFilteringWizard';
import RoomSummaryWizard from '../../wizard/RoomSummaryWizard/RoomSummaryWizard';
import RoomSideSelectionWizard from '../../wizard/RoomSideSelectionWizard/RoomSideSelectionWizard';
import RoomMainSelectionWizard from '../../wizard/RoomMainSelectionWizard/RoomMainSelectionWizard';
import { StepButton } from '@mui/material';
import { resetWizardData, setStep, updateWizardData, useWizardStore } from '../../../store/useWizardStore';
import { resetScene } from '../../../store/useCameraStore';
import DebugControlPanel from '../../debug/DebugControlPanel/DebugControlPanel';

// yarn add @mui/material @emotion/react @emotion/styled
// yarn add @mui/lab
// yarn add date-fns @date-io/date-fns

const steps = [
	{
		title: 'Kongresse, Meetings & Events',
		description:
			'Ob Kongress, Kundenanlass oder Mitarbeiterevent: Unser Team hilft Ihnen gerne bei der Organisation Ihrer Veranstaltung.',
	},
	{
		title: 'Wähle einen Hauptraum',
		description: '',
	},
	{
		title: 'Wähle deine Nebenräume',
		description: '',
	},
	{
		title: 'Wähle die Zusatzoptionen',
		description: '',
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
								<StepButton
									color='inherit'
									onClick={() => {
										// do not run validation process on steps back
										if (index < step) {
											setStep(index);
										}
										// do not allow to jump over wizard steps
										else if (index <= step + 1) {
											validateStep(index) && setStep(index);
										}
									}}
								></StepButton>
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
