import Tooltip from '@mui/material/Tooltip';
import { showAndSelectRoom, showRoomsOverview, useCameraStore } from '../../../store/useCameraStore';
import { toggleIsExplodedViewActive, toggleIsAnnotationActive, useDebugStore } from '../../../store/useDebugStore';
import Lamp from '../../icons/Lamp';
import Overview from '../../icons/Overview';
import Tool from '../../icons/Tool';
import styles from './ModelCanvasButtons.module.scss';

const ModelCanvasButtons = () => {
	const isExplodedViewActive = useDebugStore((state) => state.isExplodedViewActive);
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);
	return (
		<div className={styles.canvasButtonContainer}>
			<Tooltip
				title={
					<div style={{ textAlign: 'center', fontSize: 14 + 'px', lineHeight: 22 + 'px' }}>Übersicht anzeigen</div>
				}
				placement='left'
				enterNextDelay={1000}
			>
				<div className={styles.overviewButtonContainer}>
					{/* <div className={styles.overviewButtonText}>ÜBERSICHT ANZEIGEN</div> */}
					<button
						className={styles.overViewButton}
						onClick={() => {
							showRoomsOverview();
							isExplodedViewActive && toggleIsAnnotationActive(true);
						}}
					>
						<Overview fill='#666666' stroke='#666666' />
					</button>
				</div>
			</Tooltip>
			<Tooltip
				title={
					<div style={{ textAlign: 'center', fontSize: 14 + 'px', lineHeight: 22 + 'px' }}>Exploded View anzeigen</div>
				}
				placement='left'
				enterNextDelay={1000}
			>
				<div className={styles.overviewButtonContainer}>
					{/* <div className={styles.overviewButtonText}>EXPLODED VIEW</div> */}
					<button
						className={styles.overViewButton}
						onClick={() => {
							!isExplodedViewActive ? toggleIsAnnotationActive(true) : toggleIsAnnotationActive(false);
							toggleIsExplodedViewActive();
							if (selectedMeshes.length >= 1 && isExplodedViewActive) {
								showAndSelectRoom(selectedMeshes[0]);
								toggleIsAnnotationActive(false);
							} else {
								showRoomsOverview();
							}
						}}
					>
						<Tool width='16' fill='#666666' stroke='#666666' />
					</button>
				</div>
			</Tooltip>
			{isExplodedViewActive && (
				<Tooltip
					title={
						<div style={{ textAlign: 'center', fontSize: 14 + 'px', lineHeight: 22 + 'px' }}>Annotations anzeigen</div>
					}
					placement='left'
					enterNextDelay={1000}
				>
					<div className={styles.overviewButtonContainer}>
						{/* <div className={styles.overviewButtonText}>HOTSPOTS ANZEIGEN</div> */}
						<button
							className={styles.overViewButton}
							onClick={() => {
								// only reposition mesh when annotation is activated
								// if (isAnnotationActive === false) {
								// 	selectedMeshes.length && selectedMeshes.length === 1
								// 		? showAndSelectRoom(selectedMeshes[0])
								// 		: showRoomsOverview();
								// }
								toggleIsAnnotationActive();
							}}
						>
							<Lamp width='16' fill='#666666' stroke='#666666' />
						</button>
					</div>
				</Tooltip>
			)}
		</div>
	);
};

export default ModelCanvasButtons;
