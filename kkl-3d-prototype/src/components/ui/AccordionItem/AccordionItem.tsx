import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { resetScene, showClickedRoom } from '../../../store/useCameraStore';
import { roomInfoList, roomModelList } from '../../../data/roomData';
import Chevron from '../../icons/Chevron';
import CheckMark from '../../icons/CheckMark';
import Buffet from '../../icons/Buffet';
import Service from '../../icons/Service';
import Drinks from '../../icons/Drinks';
import Invalid from '../../icons/Invalid';
import Seats from '../../icons/Seats';
import styles from './AccordionItem.module.scss';

type AccordionItem = {
	id: number;
	title: string;
	seats: number;
	area: number;
	height: number;
	children: React.ReactNode;
	selectedMeshes: string[];
	executeScroll: (id: number) => void;
	ref: any;
};

const AccordionItem = React.forwardRef<HTMLInputElement, AccordionItem>(
	({ id, title, seats, area, height, children, selectedMeshes, executeScroll }, ref) => {
		const [isActive, setIsActive] = useState<boolean>(false);
		// const myRef = useRef<null | HTMLDivElement>(null);

		const handleOnClick = (id: number) => {
			// setIsActive(!isActive);
			// executeScroll(ref);
			selectedMeshes.includes(`room_${id}`) && selectedMeshes.length !== roomModelList.length
				? resetScene()
				: showClickedRoom(`room_${id}`);
		};

		// TODO: Find out why this is triggered as well on "handleOnClick"
		useEffect(() => {
			selectedMeshes.includes(`room_${id}`) ? setIsActive(true) : setIsActive(false);
			// executeScroll(ref);
		}, [selectedMeshes]);

		const roomInfoIndex = id - 1;

		const getFittingIcon = (fitting: string) => {
			switch (fitting) {
				case 'hasBuffet':
					return <Buffet />;
				case 'hasService':
					return <Service />;
				case 'hasDrinks':
					return <Drinks />;
				case 'hasInvalid':
					return <Invalid />;
				case 'hasSeats':
					return <Seats />;
				default:
					return null;
			}
		};

		const renderDetails = () => {
			return (
				<div className={styles.accordion__details}>
					<div className={styles.accordion__detailsItem}>
						<CheckMark className={styles.accordion__checkMark} width={16} fill='#ffffff' />
						<span>{seats} Sitzplätze</span>
					</div>
					<div className={styles.accordion__detailsItem}>
						<CheckMark className={styles.accordion__checkMark} width={16} fill='#ffffff' />
						<span>{area} m²</span>
					</div>
					<div className={styles.accordion__detailsItem}>
						<CheckMark className={styles.accordion__checkMark} width={16} fill='#ffffff' />
						<span>{height} m Raumhöhe</span>
					</div>
				</div>
			);
		};

		const renderDetailsIcons = () => {
			return (
				<div className={styles.accordion__detailsIcons}>
					{Object.entries(roomInfoList[roomInfoIndex].fittings).map((fittingEntry: [string, unknown]) => {
						return (
							fittingEntry[1] && <div className={styles.accordion__detailsIcon}>{getFittingIcon(fittingEntry[0])}</div>
						);
					})}
				</div>
			);
		};

		return (
			<div ref={ref}>
				<button className={cn(styles.accordion, { [styles.active]: isActive })}>
					{/* whenever we click on the link, it will navigate to what it matches as id */}
					<div className={styles.accordion__header} onClick={() => handleOnClick(id)}>
						<div className={styles.accordion__infoColumn}>
							<h1 className={styles.accordion__title}>{title}</h1>
							{renderDetails()}
							{renderDetailsIcons()}
						</div>
						<img className={styles.accordion__image} src={'./images/roomSample.png'} alt={title} />
						<Chevron className={cn(styles.accordion__icon, { [styles.rotate]: isActive })} width={24} fill='#ffffff' />
					</div>

					<div
						className={cn(styles.accordion__content, {
							[styles['accordion__content--open']]: isActive,
						})}
					>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, molestiae impedit facilis error at
							eveniet sunt eos, id ipsam, earum hic.
						</p>
						{children}
					</div>
				</button>
			</div>
		);
	}
);

export default AccordionItem;
