import EmptySearch from '../../icons/EmptySearch';
import styles from './NoResults.module.scss';

type NoResultsProps = {
	message: string;
	hint?: string;
};

const NoResults = ({ message, hint }: NoResultsProps) => {
	return (
		<div className={styles.noResultsContainer}>
			<EmptySearch className={styles.noResultsIcon} />
			<p className={styles.noResultsMessage}>{message}</p>
			{hint && <p className={styles.noResultsHint}>{hint}</p>}
		</div>
	);
};

export default NoResults;
