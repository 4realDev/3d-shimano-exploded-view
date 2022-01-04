import { useState } from 'react';
import styles from './RoomSelection.module.scss';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import RoomFilteringWizard from '../../wizard/RoomFilteringWizard/RoomFilteringWizard';
import RoomAdditionalOptionsWizard from '../../wizard/RoomAdditionalOptionsWizard/RoomAdditionalOptionsWizard';
import RoomSideSelectionWizard from '../../wizard/RoomSideSelectionWizard/RoomSideSelectionWizard';
import RoomMainSelectionWizard from '../../wizard/RoomMainSelectionWizard/RoomMainSelectionWizard';
import { StepButton } from '@mui/material';
import { resetWizardData, updateWizardData, useWizardStore } from '../../../store/useWizardStore';
import { resetScene } from '../../../store/useCameraStore';
import Notification from '../../icons/Notification';

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
	const [step, setStep] = useState(0);
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

	const validateNextStep = () => {
		switch (step) {
			case 0:
				setValidationPassed(true);
				return true;
			case 1:
				// TODO: Add validation hint for missing selection of activeMainRoom
				if (wizardData.activeMainRoom) {
					setValidationPassed(true);
					return true;
				} else {
					setValidationPassed(false);
					return false;
				}
			case 2:
				setValidationPassed(true);
				return true;
			case 3:
				setValidationPassed(true);
				return true;
			default:
			// do nothing
		}
	};

	const renderStep = () => {
		switch (step) {
			case 0:
				return <RoomFilteringWizard handleChange={handleChange} wizardData={wizardData} />;
			case 1:
				return <RoomMainSelectionWizard handleChange={handleChange} wizardData={wizardData} />;
			case 2:
				return <RoomSideSelectionWizard handleChange={handleChange} wizardData={wizardData} />;
			case 3:
				return <RoomAdditionalOptionsWizard handleChange={handleChange} wizardData={wizardData} />;
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
										// steps back do not need any validation
										if (index < step) {
											setStep(index);
										} else {
											validateNextStep() && setStep(index);
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
							onClick={() => validateNextStep() && (step < 3 ? nextStep() : submitForm())}
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
		</div>
	);
};

export default RoomSelection;
