import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { roomList } from '../../../data/roomData';
import { setSelectedMeshes, showAndSelectRoom, showRoomsOverview } from '../../../store/useCameraStore';
import { handleRoomDataChange, WizardDataType } from '../../../store/useWizardStore';
import List from '../../ui/List/List';

interface RoomMainSelectionWizardProps {
	wizardData: WizardDataType;
	handleChange: (value: any, inputField: any) => void;
}

const RoomMainSelectionWizard = ({ wizardData, handleChange }: RoomMainSelectionWizardProps) => {
	const accordionItemsMaximumRenderTime = 150;
	const [accordionItemsLoading, setAccordionItemsLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAccordionItemsLoading(false);
		}, accordionItemsMaximumRenderTime);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const handleOnOpen = (toggledMeshName: string) => {
		handleRoomDataChange(toggledMeshName);
		showAndSelectRoom(toggledMeshName);
	};

	const handleOnClose = (toggledMeshName: string) => {
		setSelectedMeshes([]);
		showRoomsOverview();
		wizardData.activeMainRoom === toggledMeshName && handleChange('', 'activeMainRoom');
	};

	// ADJUSTED
	const renderAccordionItems = () => {
		if (accordionItemsLoading) {
			return <CircularProgress size={60} />;
		}

		return (
			<List
				roomList={roomList}
				activeRoom={wizardData.activeMainRoom}
				handleOnOpen={handleOnOpen}
				handleOnClose={handleOnClose}
			/>
		);
	};

	return renderAccordionItems();
};

export default RoomMainSelectionWizard;
