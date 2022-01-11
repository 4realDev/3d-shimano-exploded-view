import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import Chevron from '../../icons/Chevron';
import CheckMark from '../../icons/CheckMark';
import Catering from '../../icons/Catering';
import Apero from '../../icons/Apero';
import Seats from '../../icons/Seats';
import styles from './AccordionItem.module.scss';
import Accessibility from '../../icons/Accessibility';
import NoSeats from '../../icons/NoSeats';
import { getMeshNameById } from '../../../utils/formatRoom';
import { roomList } from '../../../data/roomData';
import { useWizardStore } from '../../../store/useWizardStore';
import Exhibition from '../../icons/Exhibition';
import AdditionalRooms from '../../icons/AdditionalRooms';
import DayLight from '../../icons/DayLight';

type AccordionItemProps = {
	id: number;
	title: string;
	personCapacity: number;
	area: number;
	height: number;
	img: string;
	isActive: boolean;
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
	height,
	img,
	isActive,
	activeRoom,
	handleOnOpen,
	handleOnClose,
	children,
}: AccordionItemProps) => {
	const content = useRef<null | HTMLDivElement>(null);

	// All content should be initially hidden / accordion items should be closed -> maxHeight: 0px
	const [contentHeight, setContentHeight] = useState(0);

	const meshNameCorrespondingToId = useMemo<string>(() => {
		const meshCorrespondingToId = getMeshNameById(id);
		if (meshCorrespondingToId) {
			return meshCorrespondingToId.model.meshName;
		} else {
			console.error(`There is no matching mesh object with the (AccordionItem) id ${id}.`);
			return '';
		}
	}, [id]);

	// // On first render scroll to top
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	// TODO: Find better way then useEffect!
	// TODO: Ensure that accordionItems are not selected and open at the first selection
	// Triggered by handleOnClick from UI interaction as well as by interacting with 3D Modell
	useEffect(() => {
		// use effect is triggered in every accordion item
		// check which one is the clicked item
		// activate it, open and scroll to it (otherwise deactivate and close it)
		// same item is called twice or multiple times, it will still stay active
		if (activeRoom === meshNameCorrespondingToId) {
			content.current && setContentHeight(content.current.scrollHeight);

			// TODO: Put delay in scss const
			// Delay scrolling to the clicked accordion item by the translation delay of the opening and closing of the item to get the correct scrollHeight

			setTimeout(() => {
				window.scrollTo({
					top: content.current ? content.current.offsetTop - content.current.scrollHeight : 0,
					behavior: 'smooth',
				});
			}, 500);
		} else {
			setContentHeight(0);
		}
	}, [activeRoom]);

	const handleClick = (id: number, content: any) => {
		// both methods manipulate active and will be catched in useEffect([selectedMeshes]) above
		if (contentHeight === 0) {
			content.current && setContentHeight(content.current.scrollHeight);
			handleOnOpen(meshNameCorrespondingToId);
		} else {
			setContentHeight(0);
			handleOnClose(meshNameCorrespondingToId);
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

	const renderDetails = () => {
		return (
			<div className={styles.accordionItem__details}>
				<div className={styles.accordionItem__detailsItem}>
					<CheckMark className={styles.accordionItem__checkMark} width={16} fill='#ffffff' />
					<span>{personCapacity} Sitzplätze</span>
				</div>
				<div className={styles.accordionItem__detailsItem}>
					<CheckMark className={styles.accordionItem__checkMark} width={16} fill='#ffffff' />
					<span>{area} m²</span>
				</div>
				<div className={styles.accordionItem__detailsItem}>
					<CheckMark className={styles.accordionItem__checkMark} width={16} fill='#ffffff' />
					<span>{height} m Raumhöhe</span>
				</div>
			</div>
		);
	};

	const renderDetailsIcons = () => {
		return (
			<div className={styles.accordionItem__detailsIcons}>
				{Object.entries(roomList[id - 1].info.fittings).map((fittingEntry: [string, boolean | undefined], index) => {
					return (
						fittingEntry[1] && (
							<div key={index} className={styles.accordionItem__detailsIcon}>
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
			<button className={cn(styles.accordionItem, { [styles['accordionItem--active']]: isActive })}>
				{/* whenever we click on the link, it will navigate to what it matches as id */}
				<div className={styles.accordionItem__header} onClick={() => handleClick(id, content)}>
					<div className={styles.accordionItem__infoColumn}>
						<h1 className={styles.accordionItem__title}>{title}</h1>
						{renderDetails()}
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
