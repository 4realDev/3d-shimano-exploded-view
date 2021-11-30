import styles from './MeshVisibilityButton.module.css';

type MeshVisiblityButtonProps = {
	toggledRoomName: string;
	toggledMeshName: string;
	toggleIcon: React.ReactNode;
	onClick: (toggledRoomName: string, toggledMeshName: string) => void;
};

const MeshVisibilityButton = ({ toggledRoomName, toggledMeshName, toggleIcon, onClick }: MeshVisiblityButtonProps) => {
	return (
		<button
			className={styles.chairFormationToggle}
			onClick={() => {
				onClick(toggledRoomName, toggledMeshName);
			}}
		>
			{toggleIcon}
		</button>
	);
};

export default MeshVisibilityButton;
