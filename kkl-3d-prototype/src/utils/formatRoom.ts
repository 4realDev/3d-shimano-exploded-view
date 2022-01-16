import { roomList } from '../data/roomData';

// Takes meshname like "room_3" and returns the title of the room like "Konzertsaal"
export const getRoomTitleByMeshName = (meshName: string) => {
	return roomList.find((room) => room.model.meshName === meshName)?.info.title;
};

// Takes id like 3 and returns the meshname of the room like "room_3"
export const getMeshNameById = (id: number) => {
	return roomList.find((room) => room.info.id === id);
};

// Takes meshname like "room_3" and returns the MeshObject of the room
export const getMeshObjectByMeshName = (meshName: string) => {
	return roomList.find((room) => room.model.meshName === meshName);
};
