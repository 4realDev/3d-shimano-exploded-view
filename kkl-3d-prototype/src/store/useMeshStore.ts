import create from 'zustand';
import { MeshObjectType } from '../components/threeJs/Model';

interface MeshState {
	meshList: MeshObjectType[];
}

export const useMeshStore = create<MeshState>((set, get) => ({
	meshList: [],
}));

export const setMeshList = (meshList: MeshObjectType[]) => {
	useMeshStore.setState({ meshList: meshList });
};

export const setMeshParentVisibility = (meshName: string, visible: boolean) => {
	let newList: MeshObjectType[] = useMeshStore.getState().meshList;
	let itemIndex = newList.findIndex((item) => item.name === meshName);
	let item = newList[itemIndex];
	item = {
		...item,
		isVisible: visible,
	};
	newList[itemIndex] = item;
	setMeshList(newList);
};

// Reset parent mesh visibility to true (roof, rooms..)
// Set visibility of all "interactable" children with customName as userData (provided by Blender) to false (interactable / togglable chair_formations and equipment)
export const resetMeshVisibility = () => {
	let newList: MeshObjectType[] = useMeshStore.getState().meshList;
	newList.forEach((item, i, array) => {
		array[i] = {
			...item,
			isVisible: true,
			children: array[i].children?.map((child) => {
				return child.userData && 'customName' in child.userData ? { ...child, isVisible: false } : { ...child };
			}),
		};
	});
	setMeshList(newList);
};

export const toggleMeshChildVisibility = (toggledRoomName: string, toggledMeshName: string, category?: string) => {
	let newList: MeshObjectType[] = useMeshStore.getState().meshList;
	const itemIndex = newList.findIndex((item) => item.name === toggledRoomName); // Find index of item you want to mutate
	const item = newList[itemIndex]; // Make shallow copy of the selected item
	// Overwrite properties in each child of children array in item copy
	if (itemIndex !== -1 && item.children) {
		item.children.forEach((child, i, array) => {
			// Toggle visibility of selected child / chair formation
			// Make all other children / formations in children array of the item invisible

			const isChildInteractable = child.userData !== undefined && 'customName' in child.userData;
			array[i] = {
				...child,
				// if child is toggledMesh -> toggle visiblity of child
				// for other children: if other children are in the same category -> make them invisible
				// else leave their visiblity as it is
				isVisible:
					child.name === toggledMeshName
						? !child.isVisible
						: child.name.substr(0, child.name.lastIndexOf('_')) === category && isChildInteractable
						? false
						: child.isVisible,
			};
		});
	}
	newList[itemIndex] = item; // Overwrite selected item in array copy with modified selected item

	// TODO: Find out why I need to update the state twice, so that the component reacts and rerenders
	setMeshList([]);
	setMeshList(newList);
};
