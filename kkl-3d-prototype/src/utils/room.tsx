import { roomList } from '../data/roomData';

// Takes meshname like "room_3" and returns the title of the room like "Konzertsaal"
export const getRoomTitleByMeshName = (meshName: string) => {
	return roomList.find((room) => room.model.meshName === meshName)?.info.title;
};

// Takes meshname like "room_3" and returns the MeshObjectType of the room
export const getMeshObjectInformationsByMeshName = (meshName: string) => {
	return roomList.find((room) => room.model.meshName === meshName);
};
