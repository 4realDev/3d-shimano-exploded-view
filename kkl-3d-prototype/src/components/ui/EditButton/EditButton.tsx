import React from 'react';
import Edit from '../../icons/Edit';
import styles from './EditButton.module.scss';

type EditButtonProps = {
	label: string;
	onClick: () => void;
};

const EditButton = ({ label, onClick }: EditButtonProps) => {
	return (
		<button className={styles.editButton} onClick={onClick}>
			<Edit className={styles.editButton__icon} />
			<span>{label}</span>
		</button>
	);
};

export default EditButton;
