import { useState } from 'react';
import styles from './ListItem.module.scss';
import cn from 'classnames';
import Basket from '../../icons/Basket';
import Heart from '../../icons/Heart';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';
import { useMeshStore } from '../../../store/useMeshStore';
import { INTERACTABLE_MESH_NAMES } from '../../../data/roomData';

type ListItemProps = {
	title: string;
	articleIndex: number;
	articleNr: string;
	price: string;
	img: string;
	roomMeshName: INTERACTABLE_MESH_NAMES;
	handleOnOpen: (meshNameCorrespondingToId: INTERACTABLE_MESH_NAMES) => void;
	handleOnClose: () => void;
};

const ListItem = ({
	title,
	articleIndex,
	articleNr,
	price,
	img,
	roomMeshName,
	handleOnOpen,
	handleOnClose,
}: ListItemProps) => {
	const [quantityCount, setQuantityCount] = useState(1);
	const hoveredMesh = useMeshStore((state) => state.hoveredMesh);
	const selectedMesh = useMeshStore((state) => state.selectedMesh);

	const isHovered = roomMeshName === hoveredMesh;
	const isSelected = roomMeshName === selectedMesh;

	// Manipulate activeRoom and will be catched in useEffect([activeRoom]) above
	const handleClick = () => {
		handleOnOpen(roomMeshName);
		if (roomMeshName === selectedMesh) handleOnClose();
	};

	return (
		<div
			onClick={() => handleClick()}
			className={cn(styles.accordionItem, {
				[styles['accordionItem--active']]: isSelected || isHovered,
			})}>
			<div className={styles.accordionItem__header}>
				<div className={styles.accordionItem__infoRow}>
					<div className={styles.accordionItem__imgColumn}>
						<img
							src={img}
							alt=''
							className={styles.accordionItem__img}
						/>
					</div>
					<div className={styles.accordionItem__titleColumn}>
						<div className={styles.accordionItem__title}>{title}</div>
					</div>
					<div className={styles.accordionItem__articleNrColumn}>
						<div className={styles.accordionItem__title__prefix}>Artikelnr.</div>
						<div className={styles.accordionItem__title}>{articleNr}</div>
					</div>
					<div className={styles.accordionItem__priceColumn}>
						<div className={styles.accordionItem__title__prefix}>CHF</div>
						<div className={styles.accordionItem__title}>{price}</div>
					</div>
					<div className={styles.accordionItem__favoritButtonColumn}>
						<button
							onClick={(event) => {
								event.stopPropagation();
							}}
							className={styles.favoritButton}>
							<Heart />
						</button>
					</div>
					<div className={styles.quantitySwitcherColumn}>
						<span
							onClick={(event) => {
								event.stopPropagation();
								setQuantityCount((prevState) => prevState - 1);
							}}
							style={{ visibility: quantityCount > 1 ? 'visible' : 'hidden' }}>
							<Minus />
						</span>
						<input
							onChange={() => {}}
							onClick={(event) => {
								event.stopPropagation();
							}}
							className={styles.cartButton}
							type='text'
							value={quantityCount}
						/>
						<span
							onClick={(event) => {
								event.stopPropagation();
								setQuantityCount((prevState) => prevState + 1);
							}}>
							<Plus />
						</span>
					</div>
					<div className={styles.accordionItem__cartButtonColumn}>
						<button
							onClick={(event) => {
								event.stopPropagation();
							}}
							className={styles.cartButton}>
							<Basket />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListItem;
