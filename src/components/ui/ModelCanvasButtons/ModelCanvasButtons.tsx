import Tooltip from '@mui/material/Tooltip';
import { setSelectedMeshes } from '../../../store/useMeshStore';
import {
	toggleIsExplodedViewActive,
	toggleIsAnnotationActive,
	useMeshStore,
} from '../../../store/useMeshStore';
import ExplosiveViewActive from '../../icons/ExplosiveViewActive';
import ExplosiveViewInactive from '../../icons/ExplosiveViewInactive';
import HotspotActive from '../../icons/HotspotActive';
import HotspotInactive from '../../icons/HotspotInactive';
import MoveBackToOverview from '../../icons/MoveBackToOverview';
import styles from './ModelCanvasButtons.module.scss';
import { showAndSelectRoom, showRoomsOverview } from '../../../store/useCameraStore';

const ModelCanvasButtons = () => {
	const isExplodedViewActive = useMeshStore((state) => state.isExplodedViewActive);
	const isAnnotationActive = useMeshStore((state) => state.isAnnotationActive);
	const selectedMeshes = useMeshStore((state) => state.selectedMeshes);

	return (
		<div className={styles.canvasButtonContainer}>
			<Tooltip
				title={
					<div style={{ textAlign: 'center', fontSize: 14 + 'px', lineHeight: 22 + 'px' }}>
						Auswahl zurücksetzen
					</div>
				}
				placement='left'
				enterNextDelay={1000}>
				<div className={styles.overviewButtonContainer}>
					{/* <div className={styles.overviewButtonText}>ÜBERSICHT ANZEIGEN</div> */}
					<button
						className={styles.overViewButton}
						style={{ background: '#2364c2' }}
						onClick={() => {
							setSelectedMeshes([]);
							showRoomsOverview();
							isExplodedViewActive && toggleIsAnnotationActive(true);
						}}>
						<MoveBackToOverview />
					</button>
				</div>
			</Tooltip>
			<Tooltip
				title={
					<div style={{ textAlign: 'center', fontSize: 14 + 'px', lineHeight: 22 + 'px' }}>
						{isExplodedViewActive ? 'Exploded View deaktivieren' : 'Exploded View aktivieren'}
					</div>
				}
				style={{ left: 0 + '%' }}
				placement='left'
				enterNextDelay={1000}>
				<div className={styles.overviewButtonContainer}>
					{/* <div className={styles.overviewButtonText}>EXPLODED VIEW</div> */}
					<button
						className={styles.overViewButton}
						onClick={() => {
							!isExplodedViewActive
								? toggleIsAnnotationActive(true)
								: toggleIsAnnotationActive(false);
							toggleIsExplodedViewActive();
							if (selectedMeshes.length >= 1 && isExplodedViewActive) {
								showAndSelectRoom(selectedMeshes[0]);
								toggleIsAnnotationActive(false);
							} else {
								showRoomsOverview();
							}
						}}>
						{isExplodedViewActive ? <ExplosiveViewInactive /> : <ExplosiveViewActive />}
					</button>
				</div>
			</Tooltip>
			{isExplodedViewActive && (
				<Tooltip
					title={
						<div style={{ textAlign: 'center', fontSize: 14 + 'px', lineHeight: 22 + 'px' }}>
							{isAnnotationActive ? 'Hotspots deaktivieren' : 'Hotspots aktivieren'}
						</div>
					}
					style={{ left: 0 + '%' }}
					placement='left'
					enterNextDelay={1000}>
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
							}}>
							{isAnnotationActive ? <HotspotInactive /> : <HotspotActive />}
						</button>
					</div>
				</Tooltip>
			)}
		</div>
	);
};

export default ModelCanvasButtons;
