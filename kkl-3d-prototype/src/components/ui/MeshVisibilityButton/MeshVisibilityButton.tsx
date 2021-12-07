import styles from './MeshVisibilityButton.module.scss';

type MeshVisiblityButtonProps = {
	toggledRoomName: string;
	toggledMeshName: string;
	toggleIcon: React.ReactNode;
	category: string;
	onClick: (toggledRoomName: string, toggledMeshName: string, category: string) => void;
};

const MeshVisibilityButton = ({
	toggledRoomName,
	toggledMeshName,
	toggleIcon,
	category,
	onClick,
}: MeshVisiblityButtonProps) => {
	return (
		<button
			className={styles.chairFormationToggle}
			onClick={() => {
				onClick(toggledRoomName, toggledMeshName, category);
			}}
		>
			{toggleIcon}
		</button>
	);
};

export default MeshVisibilityButton;
