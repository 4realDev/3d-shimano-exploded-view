import { FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';
import {
	useDebugStore,
	toggleIsModelActive,
	toggleIsCameraPositionMarkersActive,
	toggleIsStatesActive,
	toggleIsAxisHelperActive,
	toggleIsBoxHelperActive,
	toggleIsWizardDataDebuggerActive,
	toggleIsThreeJsDataDebuggerActive,
} from '../../../store/useDebugStore';

import styles from './DebugControlPanel.module.scss';

const DebugControlPanel = () => {
	const [isModelVisualDebuggerActive, setModelVisualDebugger] = useState<boolean>(false);
	const isCameraPositionMarkersActive = useDebugStore((state) => state.isCameraPositionMarkersActive);
	const isStatesActive = useDebugStore((state) => state.isStatesActive);
	const isAxisHelperActive = useDebugStore((state) => state.isAxisHelperActive);
	const isBoxHelperActive = useDebugStore((state) => state.isBoxHelperActive);
	return (
		<div className={styles.debugger__container}>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							sx={{
								'& .MuiSvgIcon-root': { fontSize: 18 },
							}}
							onChange={() => {
								toggleIsModelActive();
								setModelVisualDebugger(!isModelVisualDebuggerActive);
							}}
						/>
					}
					label='3D Model (~30s Ladezeit)'
				/>
				{isModelVisualDebuggerActive && (
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
					</div>
				)}
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
