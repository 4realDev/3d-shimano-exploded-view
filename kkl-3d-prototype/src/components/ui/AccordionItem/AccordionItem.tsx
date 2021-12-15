import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { resetScene, showSelectedRoom } from '../../../store/useCameraStore';
import { roomInfoList } from '../../../data/roomData';
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
	img: string;
	children: React.ReactNode;
	selectedMeshes: string[];
};

const AccordionItem = ({ id, title, seats, area, height, img, children, selectedMeshes }: AccordionItem) => {
	const content = useRef<null | HTMLDivElement>(null);
	// All content should be initially hidden / accordion items should be closed -> maxHeight: 0px
	const [contentHeight, setHeight] = useState(0);
	const [isActive, setIsActive] = useState<boolean>(false);

	// On first render scroll to top
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	// Triggered by handleOnClick from UI interaction as well as by interacting with 3D Modell
	useEffect(() => {
		// use effect is triggered in every accordion item
		// check which one is the clicked item
		// activate it, open and scroll to it (otherwise deactivate and close it)
		if (selectedMeshes.includes(`room_${id}`)) {
			setIsActive(true);
			content.current && setHeight(content.current.scrollHeight);

			// TODO: Put delay in scss const
			// Delay scrolling to the clicked accordion item by the translation delay of the opening and closing of the item to get the correct scrollHeight
			setTimeout(() => {
				window.scrollTo({
					top: content.current ? content.current.offsetTop - content.current.scrollHeight : 0,
					behavior: 'smooth',
				});
			}, 500);
		} else {
			setIsActive(false);
			setHeight(0);
		}
	}, [selectedMeshes]);

	const handleOnClick = (id: number) => {
		// both methods manipulate selectedMeshes and will be catched in useEffect([selectedMeshes]) above
		if (!isActive) {
			showSelectedRoom(`room_${id}`);
		} else {
			resetScene();
		}
	};

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
				{Object.entries(roomInfoList[id - 1].fittings).map((fittingEntry: [string, unknown]) => {
					return (
						fittingEntry[1] && <div className={styles.accordion__detailsIcon}>{getFittingIcon(fittingEntry[0])}</div>
					);
				})}
			</div>
		);
	};

	return (
		<div>
			<button className={cn(styles.accordion, { [styles.active]: isActive })}>
				{/* whenever we click on the link, it will navigate to what it matches as id */}
				<div className={styles.accordion__header} onClick={() => handleOnClick(id)}>
					<div className={styles.accordion__infoColumn}>
						<h1 className={styles.accordion__title}>{title}</h1>
						{renderDetails()}
						{renderDetailsIcons()}
					</div>
					<img className={styles.accordion__image} src={img} alt={title} />
					<Chevron className={cn(styles.accordion__icon, { [styles.rotate]: isActive })} width={24} fill='#ffffff' />
				</div>

				<div ref={content} className={cn(styles.accordion__content)} style={{ maxHeight: `${contentHeight}px` }}>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, molestiae impedit facilis error at
						eveniet sunt eos, id ipsam, earum hic.
					</p>
					{children}
				</div>
			</button>
		</div>
	);
};

export default AccordionItem;
