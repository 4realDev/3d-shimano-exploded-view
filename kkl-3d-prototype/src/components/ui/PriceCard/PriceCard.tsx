import Basket from '../../icons/Basket';
import cn from 'classnames';
import styles from './PriceCard.module.scss';

type PriceCardProps = {
	title?: string;
	articleNr?: string;
	category?: string;
	group?: string;
	price?: number;
	extraButtonPadding?: boolean;
	showTitle?: boolean;
};

const PriceCard = ({
	title,
	articleNr,
	category,
	group,
	price,
	extraButtonPadding,
	showTitle = true,
}: PriceCardProps) => {
	return (
		<div className={styles.accordionItem__content}>
			{title && showTitle && <div className={styles.title}>{title}</div>}
			{articleNr && (
				<div className={styles.detailsRow}>
					<p className={styles.detailsRow__name}>Artikelnr.</p>
					<p className={styles.detailsRow__value}>{articleNr}</p>
				</div>
			)}
			{category && (
				<div className={styles.detailsRow}>
					<p className={styles.detailsRow__name}>Kategorie</p>
					<p className={styles.detailsRow__value}>{category}</p>
				</div>
			)}
			{group && (
				<div className={styles.detailsRow}>
					<p className={styles.detailsRow__name}>Gruppe</p>
					<p className={styles.detailsRow__value}>{group}</p>
				</div>
			)}
			<div className={styles.detailsRow}>
				<a
					href='https://manualzz.com/doc/53870190/shimano-rd-m565-pemindah-gigi-belakang-exploded-view'
					className={styles.detailsRow__detailsPDF}
				>
					Details PDF
				</a>
			</div>
			{price && (
				<div
					className={cn(styles.annotationButtonContainer, {
						[styles['annotationButtonContainer--extraButtonPadding']]: extraButtonPadding,
					})}
				>
					<div className={styles.detailsRow}>
						<p className={styles.detailsRow__currency}>CHF</p>
						<p className={styles.detailsRow__price}>{price}</p>
					</div>
					<button className={styles.cartButton}>
						<Basket />
					</button>
				</div>
			)}
		</div>
	);
};

export default PriceCard;
