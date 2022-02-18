import CheckMark from '../../icons/CheckMark';
import stylesFromRoomCard from './RoomCard.module.scss';
import stylesFromAccordionItem from '../AccordionItem/AccordionItem.module.scss';
import { ROOM_TYPE } from '../../../store/useWizardStore';
import { ROOM_FITTINGS } from '../../../data/roomData';
import {
	getFittingIcon,
	getEquipmentText,
	getEquipmentIcon,
	getFormationText,
	getFormationIcon,
	getFittingText,
} from '../../../utils/room';

type RoomCardProps = {
	title: string;
	personCapacity: number | number[];
	area: number;
	img: string;
	roomFittings?: ROOM_FITTINGS[];
	equipment: string;
	chairFormation: string;
	roomType: string;
	editButton?: React.ReactNode;
};

const RoomCard = ({
	title,
	personCapacity,
	area,
	img,
	roomFittings,
	equipment,
	chairFormation,
	roomType,
	editButton,
}: RoomCardProps) => {
	const renderDetails = (hasSeats?: boolean) => {
		return (
			<div className={stylesFromAccordionItem.accordionItem__roomInfoContainer}>
				<div className={stylesFromAccordionItem.accordionItem__roomInfoItem}>
					<CheckMark className={stylesFromAccordionItem.accordionItem__roomInfoCheckMark} width={16} fill='#ffffff' />
					<span>
						{Array.isArray(personCapacity) ? `${personCapacity[0]} - ${personCapacity[1]}` : personCapacity}
						{hasSeats ? ' Sitzplätze' : ' Stehplätze'}
					</span>
				</div>
				<div className={stylesFromAccordionItem.accordionItem__roomInfoItem}>
					<CheckMark className={stylesFromAccordionItem.accordionItem__roomInfoCheckMark} width={16} fill='#ffffff' />
					<span>{area} m²</span>
				</div>
			</div>
		);
	};

	const renderDetailsIcons = () => {
		return (
			<div className={stylesFromAccordionItem.accordionItem__fittingsContainer}>
				{roomFittings?.map((fitting, index) => {
					// do not render seats icon but keep it inside ROOM_FITTINGS
					return fitting.includes(ROOM_FITTINGS.seats) ? null : (
						<div key={index} className={stylesFromAccordionItem.accordionItem__fittingsItem}>
							<div key={index} className={stylesFromAccordionItem.accordionItem__fittingsIcon}>
								{getFittingIcon(fitting)}
							</div>
							<span>{getFittingText(fitting)}</span>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className={stylesFromAccordionItem.accordionItem} style={{ cursor: 'default' }}>
			<div className={stylesFromAccordionItem.accordionItem__header}>
				<div className={stylesFromAccordionItem.accordionItem__infoColumn}>
					<h1 className={stylesFromAccordionItem.accordionItem__title}>
						{title}
						<span style={{ fontWeight: '300', fontSize: 12 + 'px' }}>
							{roomType === ROOM_TYPE.mainRooms
								? ' (als Hauptraum)'
								: roomType === ROOM_TYPE.sideRooms
								? ' (als Nebenraum)'
								: ''}
						</span>
					</h1>
					{renderDetails(roomFittings?.includes(ROOM_FITTINGS.seats))}
					{renderDetailsIcons()}
				</div>
				<img className={stylesFromAccordionItem.accordionItem__image} src={img} alt={title} />
			</div>

			<div className={stylesFromRoomCard.roomCard__roomAdditionsGrid}>
				{equipment !== '' && (
					<div className={stylesFromRoomCard.roomCard__roomAdditionsColumn}>
						<h3>Equipment: </h3>
						<p>{getEquipmentText(equipment)}</p>
						<div className={stylesFromRoomCard.roomCard__roomAdditions__icon}>{getEquipmentIcon(equipment)}</div>
					</div>
				)}
				{chairFormation !== '' && (
					<div className={stylesFromRoomCard.roomCard__roomAdditionsColumn}>
						<h3>Stuhlformation: </h3>
						<p>{getFormationText(chairFormation)}</p>
						<div className={stylesFromRoomCard.roomCard__roomAdditions__icon}>{getFormationIcon(chairFormation)}</div>
					</div>
				)}
				<div className={stylesFromRoomCard.roomCard__editButtonColumn}>{editButton && <>{editButton}</>}</div>
			</div>
		</div>
	);
};

export default RoomCard;
