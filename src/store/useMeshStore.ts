import create from 'zustand';
import { isInteractable, MeshObjectType } from '../components/threeJs/Model';
import { CHAIR_FORMATION, EQUIPMENT, INTERACTABLE_MESH_NAMES, ROOM_ADDITIONS_CATEGORY } from '../data/roomData';

interface MeshState {
	meshList: MeshObjectType[];
}

export const useMeshStore = create<MeshState>((set, get) => ({
	meshList: [],
}));

export const setMeshList = (meshList: MeshObjectType[]) => {
	useMeshStore.setState({ meshList: meshList });
};

export const setMeshParentVisibility = (meshName: INTERACTABLE_MESH_NAMES, visible: boolean) => {
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
// Set visibility of all "interactable" children with customName as userData (provided by 3D Software) to false (interactable / togglable chair_formations and equipment)
export const resetMeshVisibility = () => {
	let newList: MeshObjectType[] = useMeshStore.getState().meshList;
	newList.forEach((item, i, array) => {
		array[i] = {
			...item,
			isVisible: true,
			children: array[i].children?.map((child) => {
				return isInteractable(child) ? { ...child, isVisible: false } : { ...child };
			}),
		};
	});
	setMeshList(newList);
};

export const toggleMeshChildVisibility = (
	toggledRoomName: INTERACTABLE_MESH_NAMES,
	toggledMeshName: CHAIR_FORMATION | EQUIPMENT,
	category?: ROOM_ADDITIONS_CATEGORY
) => {
	let newList: MeshObjectType[] = useMeshStore.getState().meshList;
	const itemIndex = newList.findIndex((item) => item.name === toggledRoomName); // Find index of item you want to mutate
	const item = newList[itemIndex]; // Make shallow copy of the selected item
	// Overwrite properties in each child of children array in item copy
	if (itemIndex !== -1 && item.children) {
		item.children.forEach((child, i, array) => {
			// Toggle visibility of selected child / chair formation
			// Make all other children / formations in children array of the item invisible

			array[i] = {
				...child,
				// if child is toggledMesh -> toggle visiblity of child
				// for other children: if other children are in the same category -> make them invisible
				// else leave their visiblity as it is
				isVisible:
					child.name === toggledMeshName
						? !child.isVisible
						: child.name.substr(0, child.name.lastIndexOf('_')) === category && isInteractable(child)
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
