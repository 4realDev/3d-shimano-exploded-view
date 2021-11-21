import { MeshObject } from '../../models/Model';
import styles from './MeshVisibilityButton.module.css';

type MeshVisiblityButtonProps = {
	meshList: MeshObject[];
	setMeshList: (value: MeshObject[]) => void;
	toggledRoomName: string;
	toggledMeshName: string;
	toggleIcon: React.ReactNode;
};

const MeshVisibilityButton = ({
	meshList,
	setMeshList,
	toggledRoomName,
	toggledMeshName,
	toggleIcon,
}: MeshVisiblityButtonProps) => {
	return (
		<button
			className={styles.chairFormationToggle}
			onClick={() => {
				// TODO: Find way to deactivate other children in this specific mesh
				let items: MeshObject[] = [...meshList]; // Make shallow copy of itemList
				let itemIndex = items.findIndex((item) => item.name === toggledRoomName); // Find index of item you want to mutate
				let item = items[itemIndex]; // Make shallow copy of the selected item
				// Overwrite properties in each child of children array in item copy
				if (itemIndex !== -1 && item.children) {
					item.children.forEach((child, i, array) => {
						// Toggle visibility of selected child / chair formation
						// Make all other children / formations in children array of the item invisible
						array[i] = {
							...child,
							isVisible: child.name === toggledMeshName ? !child.isVisible : false,
						};
					});
				}
				items[itemIndex] = item; // Overwrite selected item in array copy with modified selected item
				setMeshList(items); // Set state to new array copy -> overwritting state instead of mutating
			}}
		>
			{toggleIcon}
		</button>
	);
};

export default MeshVisibilityButton;
