import styles from './MeshVisibilityButton.module.scss';
import cn from 'classnames';
import { ROOM_ADDITIONS_CATEGORY } from '../../../data/roomData';

type MeshVisiblityButtonProps = {
	toggledRoomName: string;
	toggledMeshName: string;
	toggleIcon: React.ReactNode;
	category: ROOM_ADDITIONS_CATEGORY;
	isActive: boolean;
	isDisabled?: boolean;
	onClick: (toggledRoomName: string, toggledMeshName: string, category: ROOM_ADDITIONS_CATEGORY) => void;
};

const MeshVisibilityButton = ({
	toggledRoomName,
	toggledMeshName,
	toggleIcon,
	category,
	isActive,
	isDisabled = false,
	onClick,
}: MeshVisiblityButtonProps) => {
	return (
		<button
			className={cn(styles.roomAdditionsToggle, {
				[styles['roomAdditionsToggle--active']]: isActive && !isDisabled,
				[styles['roomAdditionsToggle--disabled']]: isDisabled,
			})}
			onClick={() => {
				!isDisabled && onClick(toggledRoomName, toggledMeshName, category);
			}}
		>
			{toggleIcon}
		</button>
	);
};

export default MeshVisibilityButton;
