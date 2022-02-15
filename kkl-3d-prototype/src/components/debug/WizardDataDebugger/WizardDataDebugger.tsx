import { useWizardStore } from '../../../store/useWizardStore';
import styles from './WizardDataDebugger.module.scss';

const WizardDataDebugger = () => {
	const wizardData = useWizardStore((state) => state.wizardData);
	const step = useWizardStore((state) => state.step);
	return (
		<div className={styles.debugger__container}>
			<h3 style={{ marginBottom: 6 + 'px' }}>Wizard Data</h3>
			<p>current wizard step: {step}</p>
			<pre>{JSON.stringify(wizardData, undefined, 1)}</pre>
		</div>
	);
};

export default WizardDataDebugger;
