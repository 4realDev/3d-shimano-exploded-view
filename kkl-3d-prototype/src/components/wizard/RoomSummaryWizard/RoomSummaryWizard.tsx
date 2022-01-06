import { useEffect, useMemo } from 'react';
import { roomList } from '../../../data/roomData';
import { ROOM_TYPE, WizardData } from '../../../store/useWizardStore';
import { formatDate } from '../../../utils/formatDate';
import RoomCard from '../../ui/RoomCard/RoomCard';
import styles from './RoomSummaryWizard.module.scss';

interface RoomSummaryWizardProps {
	handleChange: (value: any, inputField: any) => void;
	wizardData: WizardData;
}

const RoomSummaryWizard = ({ handleChange, wizardData }: RoomSummaryWizardProps) => {
	const chosenWizardMainRoomData = useMemo(
		() => wizardData.mainRoom.find((mainRoom) => mainRoom.room === wizardData.activeMainRoom),
		[wizardData]
	);

	const chosenMainRoomObject = useMemo(
		() => roomList.find((room) => room.model.meshName === wizardData.activeMainRoom),
		[wizardData]
	);

	const chosenWizardSideRoomData = useMemo(
		() => wizardData.sideRoom.find((sideRoom) => sideRoom.room === wizardData.activeSideRoom),
		[wizardData]
	);

	const chosenSideRoomInfoObject = useMemo(
		() => roomList.find((room) => room.model.meshName === wizardData.activeSideRoom),
		[wizardData]
	);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	return (
		<>
			{chosenMainRoomObject && chosenWizardMainRoomData && (
				<RoomCard
					id={chosenMainRoomObject.info.id}
					title={chosenMainRoomObject.info.title}
					personCapacity={chosenMainRoomObject.info.personCapacity}
					area={chosenMainRoomObject.info.area}
					height={chosenMainRoomObject.info.height}
					img={chosenMainRoomObject.info.img}
					equipment={chosenWizardMainRoomData.equipment}
					chairFormation={chosenWizardMainRoomData.chair_formation}
					roomType={ROOM_TYPE.mainRoom}
				/>
			)}

			{chosenSideRoomInfoObject && chosenWizardSideRoomData && (
				<RoomCard
					id={chosenSideRoomInfoObject.info.id}
					title={chosenSideRoomInfoObject.info.title}
					personCapacity={chosenSideRoomInfoObject.info.personCapacity}
					area={chosenSideRoomInfoObject.info.area}
					height={chosenSideRoomInfoObject.info.height}
					img={chosenSideRoomInfoObject.info.img}
					equipment={chosenWizardSideRoomData.equipment}
					chairFormation={chosenWizardSideRoomData.chair_formation}
					roomType={ROOM_TYPE.sideRoom}
				/>
			)}

			<div className={styles.filterCriteria}>
				<h3 className={styles.filterCriteria__title}>Kriterien</h3>
				<div className={styles.filterCriteria__item}>
					<div className={styles.filterCriteria__item__key}>Art des Events: </div>
					<div className={styles.filterCriteria__item__value}>{wizardData.eventType}</div>
				</div>
				<div className={styles.filterCriteria__item}>
					<div className={styles.filterCriteria__item__key}>Anzahl Teilnehmer: </div>
					<div className={styles.filterCriteria__item__value}>{wizardData.personNum}</div>
				</div>
				<div className={styles.filterCriteria__item}>
					<div className={styles.filterCriteria__item__key}>Startdatum:</div>
					<div className={styles.filterCriteria__item__value}>
						{wizardData.startDate ? formatDate(wizardData.startDate) : 'Es wurde kein Startdatum ausgewählt'}
					</div>
				</div>
				<div className={styles.filterCriteria__item}>
					<div className={styles.filterCriteria__item__key}>Enddatum:</div>
					<div className={styles.filterCriteria__item__value}>
						{wizardData.endDate ? formatDate(wizardData.endDate) : 'Es wurde kein Enddatum ausgewählt'}
					</div>
				</div>
			</div>
		</>
	);
};

export default RoomSummaryWizard;
