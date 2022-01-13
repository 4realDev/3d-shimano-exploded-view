import CheckMark from '../../icons/CheckMark';
import Catering from '../../icons/Catering';
import Apero from '../../icons/Apero';
import Seats from '../../icons/Seats';
import styles from './RoomCard.module.scss';
import Accessibility from '../../icons/Accessibility';
import NoSeats from '../../icons/NoSeats';
import { CHAIR_FORMATION, EQUIPMENT, roomList } from '../../../data/roomData';
import Podium from '../../icons/Podium';
import Stage from '../../icons/Stage';
import { ROOM_TYPE } from '../../../store/useWizardStore';
import AdditionalRooms from '../../icons/AdditionalRooms';
import Exhibition from '../../icons/Exhibition';
import DayLight from '../../icons/DayLight';
import Beamer from '../../icons/Beamer';
import ChairFormationBankett from '../../icons/ChairFormationBankett';
import ChairFormationSeminar from '../../icons/ChairFormationSeminar';
import ChairFormationConcert from '../../icons/ChairFormationConcert';

type RoomCardProps = {
	id: number;
	title: string;
	personCapacity: number;
	area: number;
	height: number;
	img: string;
	equipment: string;
	chairFormation: string;
	roomType: string;
};

const RoomCard = ({
	id,
	title,
	personCapacity,
	area,
	height,
	img,
	equipment,
	chairFormation,
	roomType,
}: RoomCardProps) => {
	const getFormationIcon = (formation: string) => {
		switch (formation) {
			case CHAIR_FORMATION.bankett:
				return <ChairFormationBankett />;
			case CHAIR_FORMATION.seminar:
				return <ChairFormationSeminar />;
			case CHAIR_FORMATION.concert:
				return <ChairFormationConcert />;
			default:
				return null;
		}
	};

	const getEquipmentIcon = (equipment: string) => {
		switch (equipment) {
			case EQUIPMENT.stage:
				return <Stage />;
			case EQUIPMENT.podium:
				return <Podium />;
			case EQUIPMENT.beamer:
				return <Beamer />;
			default:
				return null;
		}
	};

	const getFittingIcon = (fitting: string) => {
		switch (fitting) {
			case 'hasCatering':
				return <Catering />;
			case 'hasApero':
				return <Apero />;
			case 'hasAccessibleEnv':
				return <Accessibility />;
			case 'hasSeats':
				return <Seats />;
			case 'hasNoSeats':
				return <NoSeats />;
			case 'hasExhibition':
				return <Exhibition />;
			case 'hasAdditionalRooms':
				return <AdditionalRooms />;
			case 'hasDayLight':
				return <DayLight />;
			default:
				return null;
		}
	};

	const getFormationText = (formation: string) => {
		switch (formation) {
			case CHAIR_FORMATION.bankett:
				return 'bankett';
			case CHAIR_FORMATION.seminar:
				return 'seminar';
			case CHAIR_FORMATION.concert:
				return 'concert';
			default:
				return null;
		}
	};

	const getEquipmentText = (equipment: string) => {
		switch (equipment) {
			case EQUIPMENT.stage:
				return 'Bühne';
			case EQUIPMENT.podium:
				return 'Podium';
			case EQUIPMENT.beamer:
				return 'Beamer';
			default:
				return null;
		}
	};

	const renderDetails = () => {
		return (
			<div className={styles.roomCard__details}>
				<div className={styles.roomCard__detailsItem}>
					<CheckMark className={styles.roomCard__checkMark} width={16} fill='#ffffff' />
					<span>{personCapacity} Sitzplätze</span>
				</div>
				<div className={styles.roomCard__detailsItem}>
					<CheckMark className={styles.roomCard__checkMark} width={16} fill='#ffffff' />
					<span>{area} m²</span>
				</div>
				<div className={styles.roomCard__detailsItem}>
					<CheckMark className={styles.roomCard__checkMark} width={16} fill='#ffffff' />
					<span>{height} m Raumhöhe</span>
				</div>
			</div>
		);
	};

	const renderDetailsIcons = () => {
		return (
			<div className={styles.roomCard__detailsIcons}>
				{Object.entries(roomList[id - 1].info.fittings).map((fittingEntry: [string, boolean | undefined], index) => {
					return (
						fittingEntry[1] && (
							<div key={index} className={styles.roomCard__detailsIcon}>
								{getFittingIcon(fittingEntry[0])}
							</div>
						)
					);
				})}
			</div>
		);
	};

	return (
		<>
			<div className={styles.roomCard}>
				<div>
					<div className={styles.roomCard__header}>
						<div className={styles.roomCard__infoColumn}>
							<h1 className={styles.roomCard__title}>
								{title}{' '}
								<span style={{ fontWeight: '300', fontSize: 12 + 'px' }}>
									{roomType === ROOM_TYPE.mainRoom
										? '(als Hauptraum)'
										: roomType === ROOM_TYPE.sideRoom
										? '(als Nebenraum)'
										: ''}
								</span>
							</h1>
							{renderDetails()}
							{renderDetailsIcons()}
						</div>
						<img className={styles.roomCard__image} src={img} alt={title} />
					</div>
				</div>
				<div className={styles.roomCard__roomAdditionsGrid}>
					{equipment !== '' && (
						<div className={styles.roomCard__roomAdditionsColumn}>
							<h3>Equipment: </h3>
							<p>{getEquipmentText(equipment)}</p>
							<div className={styles.roomCard__roomAdditions__icon}>{getEquipmentIcon(equipment)}</div>
						</div>
					)}
					{chairFormation !== '' && (
						<div className={styles.roomCard__roomAdditionsColumn}>
							<h3>Stuhlformation: </h3>
							<p>{getFormationText(chairFormation)}</p>
							<div className={styles.roomCard__roomAdditions__icon}>{getFormationIcon(chairFormation)}</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default RoomCard;
