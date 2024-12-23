import { RoomFetchedDataType } from '../../../data/roomData';
import ListItem from '../ListItem/ListItem';

type AccordionProps = {
	roomList: RoomFetchedDataType[];
	activeRoom: string | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
};

const List = ({ roomList, activeRoom, handleOnOpen, handleOnClose }: AccordionProps) => {
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
					activeRoom={activeRoom}
					handleOnOpen={handleOnOpen}
					handleOnClose={handleOnClose}
				/>
			))}
		</>
	);
};

export default List;
