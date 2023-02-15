import { useState } from 'react';
import styles from './ListItem.module.scss';
import cn from 'classnames';
import Basket from '../../icons/Basket';
import Heart from '../../icons/Heart';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';

type AccordionItemProps = {
	title: string;
	articleIndex: number;
	articleNr: string;
	price: string;
	img: string;
	roomMeshName: string;
	activeRoom: string | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
};

const ListItem = ({
	title,
	articleIndex,
	articleNr,
	price,
	img,
	roomMeshName,
	activeRoom,
	handleOnOpen,
	handleOnClose,
}: AccordionItemProps) => {
	// Manipulate activeRoom and will be catched in useEffect([activeRoom]) above
	const handleClick = () => {
		handleOnOpen(roomMeshName);
		if (roomMeshName === activeRoom) handleOnClose(roomMeshName);
	};

	const [quantityCount, setQuantityCount] = useState(1);

	return (
		<div
			onClick={() => handleClick()}
			className={cn(styles.accordionItem, { [styles['accordionItem--active']]: activeRoom === roomMeshName })}
		>
			<div className={styles.accordionItem__header}>
				<div className={styles.accordionItem__infoRow}>
					<div className={styles.accordionItem__imgColumn}>
						<img src={img} alt='' className={styles.accordionItem__img} />
					</div>
					<div className={styles.accordionItem__titleColumn}>
						<div className={styles.accordionItem__title}>{title}</div>
					</div>
					<div className={styles.accordionItem__articleNrColumn}>
						<div className={styles.accordionItem__title__prefix}>Artikelnr.</div>
						<div className={styles.accordionItem__title}>{articleNr}</div>
					</div>
					<div className={styles.accordionItem__priceColumn}>
						<div className={styles.accordionItem__title__prefix}>UVP CHF</div>
						<div className={styles.accordionItem__title}>{price}</div>
					</div>
					<div className={styles.accordionItem__favoritButtonColumn}>
						<button
							onClick={(event) => {
								event.stopPropagation();
							}}
							className={styles.favoritButton}
						>
							<Heart />
						</button>
					</div>
					<div className={styles.quantitySwitcherColumn}>
						<span
							onClick={(event) => {
								event.stopPropagation();
								setQuantityCount((prevState) => prevState - 1);
							}}
							style={{ visibility: quantityCount > 1 ? 'visible' : 'hidden' }}
						>
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
							}}
						>
							<Plus />
						</span>
					</div>
					<div className={styles.accordionItem__cartButtonColumn}>
						<button
							onClick={(event) => {
								event.stopPropagation();
							}}
							className={styles.cartButton}
						>
							<Basket />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListItem;
