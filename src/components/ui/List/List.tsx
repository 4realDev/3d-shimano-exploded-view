import { INTERACTABLE_MESH_NAMES, RoomFetchedDataType } from '../../../data/roomData';
import ListItem from '../ListItem/ListItem';

type ListProps = {
	roomList: RoomFetchedDataType[];
	handleOnOpen: (meshNameCorrespondingToId: INTERACTABLE_MESH_NAMES) => void;
	handleOnClose: () => void;
};

const List = ({ roomList, handleOnOpen, handleOnClose }: ListProps) => {
	return (
		<>
			{roomList.map((room, roomIndex) => (
				<ListItem
					key={roomIndex}
					title={room.info.title}
					articleIndex={room.info.articleIndex}
					articleNr={room.info.articleNr}
					price={room.info.price.toFixed(2)}
					img={room.info.img}
					roomMeshName={room.model.meshName}
					handleOnOpen={handleOnOpen}
					handleOnClose={handleOnClose}
				/>
			))}
		</>
	);
};

export default List;
