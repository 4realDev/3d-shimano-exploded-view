import { RoomFetchedDataType } from '../../../data/roomData';
import AccordionItem from '../AccordionItem/AccordionItem';
import PriceCard from '../PriceCard/PriceCard';

type AccordionProps = {
	roomList: RoomFetchedDataType[];
	activeRoom: string | null;
	handleOnOpen: (meshNameCorrespondingToId: string) => void;
	handleOnClose: (meshNameCorrespondingToId: string) => void;
};

const Accordion = ({ roomList, activeRoom, handleOnOpen, handleOnClose }: AccordionProps) => {
	return (
		<>
			{roomList.map((room, roomIndex) => (
				<AccordionItem
					key={roomIndex}
					title={room.info.title}
					articleIndex={room.info.articleIndex}
					articleNr={room.info.articleNr}
					roomMeshName={room.model.meshName}
					activeRoom={activeRoom}
					handleOnOpen={handleOnOpen}
					handleOnClose={handleOnClose}
				>
					<PriceCard
						title={room.info.title}
						articleNr={room.info.articleNr}
						category={room.info.category}
						group={room.info.group}
						price={room.info.price}
						showTitle={false}
					/>
				</AccordionItem>
			))}
		</>
	);
};

export default Accordion;
