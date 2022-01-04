import { useMemo } from 'react';
import { WizardData } from '../../../store/useWizardStore';
import { formatDate } from '../../../utils/formatDate';
import { getRoomTitleByMeshName } from '../../../utils/formatRoom';
import styles from './RoomAdditionalOptionsWizard.module.scss';

interface RoomAdditionalOptionsWizardProps {
	handleChange: (value: any, inputField: any) => void;
	wizardData: WizardData;
}

const RoomAdditionalOptionsWizard = ({ handleChange, wizardData }: RoomAdditionalOptionsWizardProps) => {
	const chosenMainRoom = useMemo(
		() => wizardData.mainRoom.find((mainRoom) => mainRoom.room === wizardData.activeMainRoom),
		[wizardData]
	);
	const chosenSideRoom = useMemo(
		() => wizardData.sideRoom.find((sideRoom) => sideRoom.room === wizardData.activeSideRoom),
		[wizardData]
	);

	return (
		<div className={styles.summary}>
			<h3>Hauptraum</h3>
			<p>Raum: {chosenMainRoom ? getRoomTitleByMeshName(chosenMainRoom.room) : 'Es wurde kein Hauptraum ausgewählt'}</p>
			<p>Equipment: {chosenMainRoom ? chosenMainRoom.equipment : '-'}</p>
			<p>Stuhlformation: {chosenMainRoom ? chosenMainRoom.chairFormation : '-'}</p>
			<br />

			<h3>Nebenraum</h3>
			<p>Raum: {chosenSideRoom ? getRoomTitleByMeshName(chosenSideRoom.room) : 'Es wurde kein Nebenraum ausgewählt'}</p>
			<p>Equipment: {chosenSideRoom ? chosenSideRoom.equipment : '-'}</p>
			<p>Stuhlformation: {chosenSideRoom ? chosenSideRoom.chairFormation : '-'}</p>
			<br />

			<h3>Kriterien</h3>
			<p>
				Startdatum: {wizardData.startDate ? formatDate(wizardData.startDate) : 'Es wurde kein Startdatum ausgewählt'}
			</p>
			<p>Enddatum: {wizardData.endDate ? formatDate(wizardData.endDate) : 'Es wurde kein Enddatum ausgewählt'}</p>
			<br />

			<p>Art des Events: {wizardData.eventType}</p>
			<p>Anzahl Teilnehmer: {wizardData.personNum}</p>
			<br />
		</div>
	);
};

export default RoomAdditionalOptionsWizard;
