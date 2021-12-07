import create from 'zustand';
import { MeshObject } from '../components/threeJs/Model';

interface MeshState {
	meshList: MeshObject[];
}

export const useMeshStore = create<MeshState>((set, get) => ({
	meshList: [],
}));

export const setMeshList = (meshList: MeshObject[]) => {
	useMeshStore.setState({ meshList: meshList });
};

export const setMeshVisibility = (meshName: string, visible: boolean) => {
	let newList: MeshObject[] = useMeshStore.getState().meshList;
	let itemIndex = newList.findIndex((item) => item.name === meshName);
	let item = newList[itemIndex];
	item = {
		...item,
		isVisible: visible,
	};
	newList[itemIndex] = item;
	setMeshList(newList);
};

export const resetMeshVisibility = () => {
	let newList: MeshObject[] = useMeshStore.getState().meshList;
	newList.forEach((item, i, array) => {
		array[i] = {
			...item,
			isVisible: true,
		};
	});
	setMeshList(newList);
};

export const setMeshChildVisibility = (toggledRoomName: string, toggledMeshName: string) => {
	let newList: MeshObject[] = useMeshStore.getState().meshList;
	let itemIndex = newList.findIndex((item) => item.name === toggledRoomName); // Find index of item you want to mutate
	let item = newList[itemIndex]; // Make shallow copy of the selected item
	// Overwrite properties in each child of children array in item copy
	if (itemIndex !== -1 && item.children) {
		item.children.forEach((child, i, array) => {
			// Toggle visibility of selected child / chair formation
			// Make all other children / formations in children array of the item invisible
			// child.name.replace(/[0-9]/g, '') to remove BLENDERS suffix for duplicated objects
			// -> "chair_formation_circle001" to "chair_formation_circle"
			array[i] = {
				...child,
				isVisible: child.name.replace(/[0-9]/g, '') === toggledMeshName ? !child.isVisible : false,
			};
		});
	}
	newList[itemIndex] = item; // Overwrite selected item in array copy with modified selected item

	// TODO: Find out why I need to update the state twice, so that the component reacts and rerenders
	setMeshList([]);
	setMeshList(newList);
};
