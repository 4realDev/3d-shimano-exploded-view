import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Chevron from '../../icons/Chevron';
import CheckMark from '../../icons/CheckMark';
import Catering from '../../icons/Catering';
import Apero from '../../icons/Apero';
import Seats from '../../icons/Seats';
import styles from './AccordionItem.module.scss';
import Accessibility from '../../icons/Accessibility';
import NoSeats from '../../icons/NoSeats';
import { ROOM_FITTINGS } from '../../../data/roomData';
import Exhibition from '../../icons/Exhibition';
import AdditionalRooms from '../../icons/AdditionalRooms';
import DayLight from '../../icons/DayLight';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

type AccordionItemProps = {
	id: number;
	title: string;
	personCapacity: number | number[];
	area: number;
	roomHeight: number;
	img: string;
	roomFittings: ROOM_FITTINGS[] | undefined;
	roomMeshName: string;
	activeRoom: string | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
	children: React.ReactNode;
};

const AccordionItem = ({
	id,
	title,
	personCapacity,
	area,
	roomHeight,
	img,
	roomFittings,
	roomMeshName,
	activeRoom,
	handleOnOpen,
	handleOnClose,
	children,
}: AccordionItemProps) => {
	const content = useRef<null | HTMLDivElement>(null);

	// All content should be initially hidden / accordion items should be closed -> maxHeight: 0px
	const [contentHeight, setContentHeight] = useState(0);

	const { width } = useWindowDimensions();
	const [additionalDistanceToScreenTop, setAdditionalDistanceToScreenTop] = useState(0);

	const calculateViewportHeight = (v: number) => {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	};

	// On first render scroll to top
	// On tablet and mobile ModelCanvas is above RoomSelection -> therefore scroll value must be a high negative number to scroll "really" to the top
	useEffect(() => {
		setAdditionalDistanceToScreenTop(
			width < 480
				? calculateViewportHeight(25)
				: width < 768
				? calculateViewportHeight(30)
				: width < 992
				? calculateViewportHeight(40)
				: 0
		);
		window.scrollTo({
			top: 0 - additionalDistanceToScreenTop,
			behavior: 'smooth',
		});
	}, []);

	// Triggered by handleClick from UI interaction as well as by onPointerDown from interacting with the 3D Model
	useEffect(() => {
		// use effect is triggered in every accordion item
		// check which one is the clicked item
		// activate it, open and scroll to it (otherwise deactivate and close it)
		// same item is called twice or multiple times, it will still stay active
		if (activeRoom === roomMeshName) {
			content.current && setContentHeight(content.current.scrollHeight);

			// Delay scrolling to the clicked accordion item by the translation delay of the opening and closing of the item to get the correct scrollHeight
			setTimeout(() => {
				window.scrollTo({
					top: content.current
						? content.current.offsetTop - content.current.scrollHeight - additionalDistanceToScreenTop
						: 0,
					behavior: 'smooth',
				});
			}, 500);
		} else {
			setContentHeight(0);
		}
	}, [activeRoom]);

	// Manipulate activeRoom and will be catched in useEffect([selectedMeshes]) above
	const handleClick = (id: number, content: any) => {
		if (contentHeight === 0) {
			content.current && setContentHeight(content.current.scrollHeight);
			handleOnOpen(roomMeshName);
		} else {
			setContentHeight(0);
			handleOnClose(roomMeshName);
		}
	};

	const getFittingIcon = (fitting: ROOM_FITTINGS) => {
		switch (fitting) {
			case ROOM_FITTINGS.catering:
				return <Catering />;
			case ROOM_FITTINGS.apero:
				return <Apero />;
			case ROOM_FITTINGS.accessibleEnv:
				return <Accessibility />;
			case ROOM_FITTINGS.seats:
				return <Seats />;
			case ROOM_FITTINGS.noSeats:
				return <NoSeats />;
			case ROOM_FITTINGS.exhibition:
				return <Exhibition />;
			case ROOM_FITTINGS.additionalRooms:
				return <AdditionalRooms />;
			case ROOM_FITTINGS.dayLight:
				return <DayLight />;
			default:
				return null;
		}
	};

	const renderDetails = (hasSeats?: boolean) => {
		return (
			<div className={styles.accordionItem__details}>
				<div className={styles.accordionItem__detailsItem}>
					<CheckMark className={styles.accordionItem__checkMark} width={16} fill='#ffffff' />
					<span>
						{Array.isArray(personCapacity) ? `${personCapacity[0]} - ${personCapacity[1]}` : personCapacity}
						{hasSeats ? ' Sitzplätze' : ' Stehplätze'}
					</span>
				</div>
				<div className={styles.accordionItem__detailsItem}>
					<CheckMark className={styles.accordionItem__checkMark} width={16} fill='#ffffff' />
					<span>{area} m²</span>
				</div>
				<div className={styles.accordionItem__detailsItem}>
					<CheckMark className={styles.accordionItem__checkMark} width={16} fill='#ffffff' />
					<span>{roomHeight} m Raumhöhe</span>
				</div>
			</div>
		);
	};

	const renderDetailsIcons = () => {
		return (
			<div className={styles.accordionItem__detailsIcons}>
				{roomFittings?.map((fitting, index) => {
					return (
						fitting && (
							<div key={index} className={styles.accordionItem__detailsIcon}>
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
			<button className={cn(styles.accordionItem, { [styles['accordionItem--active']]: activeRoom === roomMeshName })}>
				<div className={styles.accordionItem__header} onClick={() => handleClick(id, content)}>
					<div className={styles.accordionItem__infoColumn}>
						<h1 className={styles.accordionItem__title}>{title}</h1>
						{renderDetails(roomFittings?.includes(ROOM_FITTINGS.seats))}
						{renderDetailsIcons()}
					</div>
					<img className={styles.accordionItem__image} src={img} alt={title} />
					<Chevron
						className={cn(styles.accordionItem__icon, { [styles['accordionItem--rotate']]: contentHeight === 0 })}
						width={24}
						fill={contentHeight === 0 ? '#fff' : '#ffef00bf'}
					/>
				</div>

				<div ref={content} className={cn(styles.accordionItem__content)} style={{ maxHeight: `${contentHeight}px` }}>
					{children}
				</div>
			</button>
		</>
	);
};

export default AccordionItem;
