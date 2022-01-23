import { TextField } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { EVENT_TYPES, roomList } from '../../../data/roomData';
import { setFilteredMeshes, setSelectedMeshes, showRoomsOverview } from '../../../store/useCameraStore';
import { ROOM_TYPE, WizardDataType } from '../../../store/useWizardStore';
import { formatDate } from '../../../utils/date';
import RoomCard from '../../ui/RoomCard/RoomCard';
import styles from './RoomSummaryWizard.module.scss';

interface RoomSummaryWizardProps {
	handleChange: (value: any, inputField: any) => void;
	wizardData: WizardDataType;
}

const RoomSummaryWizard = ({ handleChange, wizardData }: RoomSummaryWizardProps) => {
	const chosenWizardMainRoomData = useMemo(
		() => wizardData.mainRooms.find((mainRoom) => mainRoom.room === wizardData.activeMainRoom),
		[wizardData]
	);

	const chosenMainRoomObject = useMemo(
		() => roomList.find((room) => room.model.meshName === wizardData.activeMainRoom),
		[wizardData]
	);

	const chosenWizardSideRoomData = useMemo(
		() => wizardData.sideRooms.find((sideRoom) => sideRoom.room === wizardData.activeSideRoom),
		[wizardData]
	);

	const chosenSideRoomInfoObject = useMemo(
		() => roomList.find((room) => room.model.meshName === wizardData.activeSideRoom),
		[wizardData]
	);

	useEffect(() => {
		// On first render scroll to top of the screen
		// Use high negative number as an easy workaround to scroll to the top on every viewport
		// Necessary for mobile and tablet because they have marginTop according to viewport-height of ModelCanvas
		window.scrollTo({
			top: -1080,
			behavior: 'smooth',
		});

		// show rooms overview
		showRoomsOverview();

		// set filteredMeshes and selctedMeshes to highlight them inside the model
		setFilteredMeshes([wizardData.activeMainRoom, wizardData.activeSideRoom]);
		setSelectedMeshes([wizardData.activeMainRoom, wizardData.activeSideRoom]);
	}, []);

	return (
		<>
			{chosenMainRoomObject && chosenWizardMainRoomData && (
				<RoomCard
					title={chosenMainRoomObject.info.title}
					personCapacity={
						chosenWizardMainRoomData.capacity !== undefined
							? chosenWizardMainRoomData.capacity
							: chosenMainRoomObject.info.personCapacity
					}
					area={chosenMainRoomObject.info.area}
					height={chosenMainRoomObject.info.height}
					img={chosenMainRoomObject.info.img}
					roomFitting={chosenMainRoomObject.info.fittings}
					equipment={chosenWizardMainRoomData.equipment}
					chairFormation={chosenWizardMainRoomData.chair_formation}
					roomType={ROOM_TYPE.mainRooms}
				/>
			)}

			{chosenSideRoomInfoObject && chosenWizardSideRoomData && (
				<RoomCard
					title={chosenSideRoomInfoObject.info.title}
					personCapacity={chosenSideRoomInfoObject.info.personCapacity}
					area={chosenSideRoomInfoObject.info.area}
					height={chosenSideRoomInfoObject.info.height}
					img={chosenSideRoomInfoObject.info.img}
					roomFitting={chosenSideRoomInfoObject.info.fittings}
					equipment={chosenWizardSideRoomData.equipment}
					chairFormation={chosenWizardSideRoomData.chair_formation}
					roomType={ROOM_TYPE.sideRooms}
				/>
			)}

			<div className={styles.summaryCard}>
				<h3 className={styles.summaryCard__title}>Kriterien</h3>
				<div className={styles.summaryCard__item}>
					<div className={styles.summaryCard__item__key}>Art des Events: </div>
					<div className={styles.summaryCard__item__value}>
						{wizardData.eventType === EVENT_TYPES.all ? 'undefiniert' : wizardData.eventType}
					</div>
				</div>
				<div className={styles.summaryCard__item}>
					<div className={styles.summaryCard__item__key}>Anzahl Teilnehmer: </div>
					<div className={styles.summaryCard__item__value}>
						{wizardData.personNum !== '' ? wizardData.personNum : 'undefiniert'}
					</div>
				</div>
				<div className={styles.summaryCard__item}>
					<div className={styles.summaryCard__item__key}>Startdatum:</div>
					<div className={styles.summaryCard__item__value}>
						{wizardData.startDate ? formatDate(wizardData.startDate) : 'undefiniert'}
					</div>
				</div>
				<div className={styles.summaryCard__item}>
					<div className={styles.summaryCard__item__key}>Enddatum:</div>
					<div className={styles.summaryCard__item__value}>
						{wizardData.endDate ? formatDate(wizardData.endDate) : 'undefiniert'}
					</div>
				</div>
			</div>

			<div className={styles.summaryCard}>
				<h3 className={styles.summaryCard__title}>Zusätzliche Dienstleistungen</h3>
				<div className={styles.summaryCard__item}>
					<div>
						Haben Sie spezielle Wünsche betreffend Technik, Projektmanagement, Ticketing, Dekoration, Gästebetreung oder
						Sicherheit?
					</div>
				</div>
				<div className={styles.summaryCard__item}>
					<TextField
						className={styles.summaryCard__item__textfield}
						id='outlined-multiline-static'
						multiline
						value={wizardData.additionalService}
						onChange={(e) => handleChange(e.target.value, 'additionalService')}
						rows={4}
					/>
				</div>
			</div>
		</>
	);
};

export default RoomSummaryWizard;
