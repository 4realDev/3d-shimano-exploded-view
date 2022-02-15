import styles from './MeshVisibilityButton.module.scss';
import cn from 'classnames';
import { CHAIR_FORMATION, EQUIPMENT, INTERACTABLE_MESH_NAMES, ROOM_ADDITIONS_CATEGORY } from '../../../data/roomData';
import { Tooltip } from '@mui/material';
import { getEquipmentText, getFormationText } from '../../../utils/room';

type MeshVisiblityButtonProps = {
	toggledRoomName: INTERACTABLE_MESH_NAMES;
	toggledMeshName: CHAIR_FORMATION | EQUIPMENT;
	toggleIcon: React.ReactNode;
	category: ROOM_ADDITIONS_CATEGORY;
	isActive: boolean;
	isDisabled?: boolean;
	isFixed?: boolean;
	onClick: (
		toggledRoomName: INTERACTABLE_MESH_NAMES,
		toggledMeshName: CHAIR_FORMATION | EQUIPMENT,
		category: ROOM_ADDITIONS_CATEGORY
	) => void;
};

const MeshVisibilityButton = ({
	toggledRoomName,
	toggledMeshName,
	toggleIcon,
	category,
	isActive,
	isDisabled = false,
	isFixed = false,
	onClick,
}: MeshVisiblityButtonProps) => {
	return (
		<Tooltip
			title={
				<div style={{ textAlign: 'center' }}>
					<div>
						{category === ROOM_ADDITIONS_CATEGORY.chair_formation
							? getFormationText(toggledMeshName)
							: getEquipmentText(toggledMeshName)}
						{isDisabled && ' (deaktiviert)'}
						{isFixed && ' (gegebene Auswahl)'}
					</div>
					{isDisabled && <div>Zu wenige Sitzplätze.</div>}
				</div>
			}
			placement='top'
			arrow
			followCursor
			enterNextDelay={750}
		>
			<button
				className={cn(styles.roomAdditionsToggle, {
					[styles['roomAdditionsToggle--active']]: (isActive || isFixed) && !isDisabled,
					[styles['roomAdditionsToggle--disabled']]: isDisabled,
					[styles['roomAdditionsToggle--fixed']]: isFixed,
				})}
				onClick={() => {
					!isDisabled && !isFixed && onClick(toggledRoomName, toggledMeshName, category);
				}}
			>
				{toggleIcon}
			</button>
		</Tooltip>
	);
};

export default MeshVisibilityButton;
