import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeshObject } from '../../components/models/Model';

// Define a type for the slice state
interface MeshState {
	meshList: MeshObject[];
}

// Define the initial state using that type
const initialState: MeshState = {
	meshList: [],
};

export const meshSlice = createSlice({
	name: 'mesh',
	initialState,
	reducers: {
		setMeshListInStore: (state, { payload }: PayloadAction<MeshObject[]>) => {
			state.meshList = payload;
		},

		setMeshVisibility: (state, { payload }: PayloadAction<{ meshName: string; visible: boolean }>) => {
			let newList: MeshObject[] = state.meshList;
			let itemIndex = newList.findIndex((item) => item.name === payload.meshName);
			let item = newList[itemIndex];
			item = {
				...item,
				isVisible: payload.visible,
			};
			newList[itemIndex] = item;
			state.meshList = newList;
		},

		resetMeshVisibility: (state) => {
			let newList: MeshObject[] = state.meshList;
			newList.forEach((item, i, array) => {
				array[i] = {
					...item,
					isVisible: true,
				};
			});
			state.meshList = newList;
		},

		setMeshChildVisibility: (
			state,
			{ payload }: PayloadAction<{ toggledRoomName: string; toggledMeshName: string }>
		) => {
			let newList: MeshObject[] = state.meshList;
			let itemIndex = newList.findIndex((item) => item.name === payload.toggledRoomName); // Find index of item you want to mutate
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
						isVisible: child.name.replace(/[0-9]/g, '') === payload.toggledMeshName ? !child.isVisible : false,
					};
				});
			}
			newList[itemIndex] = item; // Overwrite selected item in array copy with modified selected item
			state.meshList = newList;
		},
	},
});

export const { setMeshListInStore, setMeshVisibility, resetMeshVisibility, setMeshChildVisibility } = meshSlice.actions;
export default meshSlice.reducer;
