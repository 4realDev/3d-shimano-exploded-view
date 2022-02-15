import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import Chevron from '../../icons/Chevron';
import CheckMark from '../../icons/CheckMark';
import styles from './AccordionItem.module.scss';
import { ROOM_FITTINGS } from '../../../data/roomData';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { getFittingIcon, getFittingText } from '../../../utils/room';

type AccordionItemProps = {
	title: string;
	personCapacity: number | number[];
	area: number;
	img: string;
	roomFittings: ROOM_FITTINGS[] | undefined;
	roomMeshName: string;
	activeRoom: string | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
	children: React.ReactNode;
};

const AccordionItem = ({
	title,
	personCapacity,
	area,
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

	const calculateViewportHeight = (v: number) => {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	};

	// Distance which results of the className={styles.canvas} applied to ModelCanvas
	// ModelCanvas is placed above the RoomSelection className={styles.container} on mobile and tablet
	// and moves the RoomSelection content according to the screen viewport height some pixels down
	// To scroll to the top of the AccordionItems this additional distance to the screen top must be calculated
	// with attention to the screen viewport, since the viewport influence the viewport height of the ModelCanvas
	const additionalDistanceToScreenTop = useMemo(
		() =>
			width < 480
				? calculateViewportHeight(25)
				: width < 768
				? calculateViewportHeight(30)
				: width < 992
				? calculateViewportHeight(40)
				: 0,
		[width]
	);

	// On first render scroll to top
	// On tablet and mobile ModelCanvas is above RoomSelection -> therefore scroll value must be a high negative number to scroll "really" to the top
	useEffect(() => {
		window.scrollTo({
			top: 0,
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
			const timeout = setTimeout(() => {
				window.scrollTo({
					top: content.current
						? content.current.offsetTop - content.current.scrollHeight - additionalDistanceToScreenTop
						: 0,
					behavior: 'smooth',
				});
			}, 500);
			return () => {
				clearTimeout(timeout);
			};
		} else {
			setContentHeight(0);
		}
	}, [activeRoom]);

	// Manipulate activeRoom and will be catched in useEffect([activeRoom]) above
	const handleClick = (content: any) => {
		if (contentHeight === 0) {
			content.current && setContentHeight(content.current.scrollHeight);
			handleOnOpen(roomMeshName);
		} else {
			setContentHeight(0);
			handleOnClose(roomMeshName);
		}
	};

	const renderDetails = (hasSeats?: boolean) => {
		return (
			<div className={styles.accordionItem__roomInfoContainer}>
				<div className={styles.accordionItem__roomInfoItem}>
					<CheckMark className={styles.accordionItem__roomInfoCheckMark} width={16} fill='#ffffff' />
					<span>
						{Array.isArray(personCapacity) ? `${personCapacity[0]} - ${personCapacity[1]}` : personCapacity}
						{hasSeats ? ' Sitzplätze' : ' Stehplätze'}
					</span>
				</div>
				<div className={styles.accordionItem__roomInfoItem}>
					<CheckMark className={styles.accordionItem__roomInfoCheckMark} width={16} fill='#ffffff' />
					<span>{area} m²</span>
				</div>
			</div>
		);
	};

	const renderDetailsIcons = () => {
		return (
			<div className={styles.accordionItem__fittingsContainer}>
				{roomFittings?.map((fitting, index) => {
					// do not render seats icon but keep it inside ROOM_FITTINGS
					return fitting.includes(ROOM_FITTINGS.seats) ? null : (
						<div key={index} className={styles.accordionItem__fittingsItem}>
							<div key={index} className={styles.accordionItem__fittingsIcon}>
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
		<>
			<button className={cn(styles.accordionItem, { [styles['accordionItem--active']]: activeRoom === roomMeshName })}>
				<div className={styles.accordionItem__header} onClick={() => handleClick(content)}>
					<div className={styles.accordionItem__infoColumn}>
						<h1 className={styles.accordionItem__title}>{title}</h1>
						{renderDetails(roomFittings?.includes(ROOM_FITTINGS.seats))}
						{renderDetailsIcons()}
					</div>
					<img className={styles.accordionItem__image} src={img} alt={title} />
					<Chevron
						className={cn(styles.accordionItem__chevronIcon, {
							[styles['accordionItem--rotate']]: contentHeight === 0,
						})}
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
