import CheckMark from '../../icons/CheckMark';
import styles from './RoomCard.module.scss';
import { ROOM_TYPE } from '../../../store/useWizardStore';
import { ROOM_FITTINGS } from '../../../data/roomData';
import {
	getFittingIcon,
	getEquipmentText,
	getEquipmentIcon,
	getFormationText,
	getFormationIcon,
} from '../../../utils/room';

type RoomCardProps = {
	title: string;
	personCapacity: number | number[];
	area: number;
	height: number;
	img: string;
	roomFitting?: ROOM_FITTINGS[];
	equipment: string;
	chairFormation: string;
	roomType: string;
};

const RoomCard = ({
	title,
	personCapacity,
	area,
	height,
	img,
	roomFitting,
	equipment,
	chairFormation,
	roomType,
}: RoomCardProps) => {
	const renderDetails = (hasSeats?: boolean) => {
		return (
			<div className={styles.roomCard__details}>
				<div className={styles.roomCard__detailsItem}>
					<CheckMark className={styles.roomCard__checkMark} width={16} fill='#ffffff' />
					<span>
						{Array.isArray(personCapacity) ? `${personCapacity[0]} - ${personCapacity[1]}` : personCapacity}
						{hasSeats ? ' Sitzplätze' : ' Stehplätze'}
					</span>
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
				{roomFitting?.map((fitting, index) => {
					return (
						fitting && (
							<div key={index} className={styles.roomCard__detailsIcon}>
								{getFittingIcon(fitting)}
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
								{title}
								<span style={{ fontWeight: '300', fontSize: 12 + 'px' }}>
									{roomType === ROOM_TYPE.mainRooms
										? ' (als Hauptraum)'
										: roomType === ROOM_TYPE.sideRooms
										? ' (als Nebenraum)'
										: ''}
								</span>
							</h1>
							{renderDetails(roomFitting?.includes(ROOM_FITTINGS.seats))}
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
