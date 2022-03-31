import { FormControlLabel, Checkbox } from '@mui/material';
import { setHasAnimation, showRoomsOverview } from '../../../store/useCameraStore';
import {
	useDebugStore,
	toggleIsCameraPositionMarkersActive,
	toggleIsStatesActive,
	toggleIsAxisHelperActive,
	toggleIsBoxHelperActive,
	toggleIsWizardDataDebuggerActive,
	toggleIsThreeJsDataDebuggerActive,
	toggleIsLineSegmentMaterialActive,
	toggleIsCameraBackLerpingActive,
	toggleIsExplodedViewActive,
	toggleIsMaterialActive,
	toggleIsAnnotationActive,
} from '../../../store/useDebugStore';

import styles from './DebugControlPanel.module.scss';

const DebugControlPanel = () => {
	const isCameraPositionMarkersActive = useDebugStore((state) => state.isCameraPositionMarkersActive);
	const isStatesActive = useDebugStore((state) => state.isStatesActive);
	const isAxisHelperActive = useDebugStore((state) => state.isAxisHelperActive);
	const isBoxHelperActive = useDebugStore((state) => state.isBoxHelperActive);
	const isLineSegementMaterialActive = useDebugStore((state) => state.isLineSegementMaterialActive);
	const isExplodedViewActive = useDebugStore((state) => state.isExplodedViewActive);
	const isMaterialActive = useDebugStore((state) => state.isMaterialActive);
	const isAnnotationActive = useDebugStore((state) => state.isAnnotationActive);
	const isCameraBackLerpingActive = useDebugStore((state) => state.isCameraBackLerpingActive);

	return (
		<div className={styles.debugger__container}>
			<div>
				<div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 28 + 'px' }}>
					<FormControlLabel
						label='Camera Position Markers'
						control={
							<Checkbox
								checked={isCameraPositionMarkersActive}
								onChange={() => toggleIsCameraPositionMarkersActive()}
							/>
						}
					/>
					<FormControlLabel
						label='Three JS FPS States'
						control={<Checkbox checked={isStatesActive} onChange={() => toggleIsStatesActive()} />}
					/>
					<FormControlLabel
						label='Three JS Axis Helper'
						control={<Checkbox checked={isAxisHelperActive} onChange={() => toggleIsAxisHelperActive()} />}
					/>
					<FormControlLabel
						label='Three JS Box Helper'
						control={<Checkbox checked={isBoxHelperActive} onChange={() => toggleIsBoxHelperActive()} />}
					/>
					<FormControlLabel
						label='Line Segment Material'
						control={
							<Checkbox checked={isLineSegementMaterialActive} onChange={() => toggleIsLineSegmentMaterialActive()} />
						}
					/>
					<FormControlLabel
						label='Activate Exploded View'
						control={
							<Checkbox
								checked={isExplodedViewActive}
								onChange={() => {
									toggleIsExplodedViewActive();
									showRoomsOverview();
								}}
							/>
						}
					/>
					<FormControlLabel
						label='Activate Material'
						control={<Checkbox checked={isMaterialActive} onChange={() => toggleIsMaterialActive()} />}
					/>
					<FormControlLabel
						label='Activate Annotations'
						control={<Checkbox checked={isAnnotationActive} onChange={() => toggleIsAnnotationActive()} />}
					/>
					<FormControlLabel
						label='Camera Back Lerping'
						control={
							<Checkbox
								checked={isCameraBackLerpingActive}
								onChange={() => {
									toggleIsCameraBackLerpingActive();
									setHasAnimation(true);
								}}
							/>
						}
					/>
				</div>
			</div>
			<FormControlLabel
				control={
					<Checkbox
						sx={{
							'& .MuiSvgIcon-root': { fontSize: 18 },
						}}
						onChange={() => toggleIsWizardDataDebuggerActive()}
					/>
				}
				label='Wizard Data Debugger'
			/>
			<FormControlLabel
				control={
					<Checkbox
						sx={{
							'& .MuiSvgIcon-root': { fontSize: 18 },
						}}
						onChange={() => toggleIsThreeJsDataDebuggerActive()}
					/>
				}
				label='ThreeJS Data Debugger'
			/>
		</div>
	);
};

export default DebugControlPanel;
