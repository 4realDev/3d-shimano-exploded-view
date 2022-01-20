import React from 'react';
import { useCameraStore } from '../../../store/useCameraStore';
import { getRoomTitleByMeshName } from '../../../utils/room';
import styles from './ThreeJsDataDebugger.module.scss';

const ThreeJsDataDebugger = () => {
	const cameraStoreState = useCameraStore((state) => state);
	return (
		<div className={styles.debugger__container}>
			<h3 style={{ marginBottom: 6 + 'px' }}>Camera Store Data</h3>
			<div className={styles.debugger__container__rowSection}>
				<p>selectedMeshes: </p>
				<p>
					[
					{cameraStoreState.selectedMeshes.map((selectedMesh, index) => {
						return index !== cameraStoreState.selectedMeshes.length - 1
							? `${selectedMesh} (${getRoomTitleByMeshName(selectedMesh)}), `
							: `${selectedMesh} (${getRoomTitleByMeshName(selectedMesh)})`;
					})}
					]
				</p>
			</div>
			<div className={styles.debugger__container__rowSection}>
				<p>filteredMeshes: </p>
				<p>
					[
					{cameraStoreState.filteredMeshes.map((filteredMeshes, index) => {
						return index !== cameraStoreState.filteredMeshes.length - 1
							? `${filteredMeshes} (${getRoomTitleByMeshName(filteredMeshes)}), `
							: `${filteredMeshes} (${getRoomTitleByMeshName(filteredMeshes)})`;
					})}
					]
				</p>
			</div>
			<div className={styles.debugger__container__rowSection}>
				<p>hoveredMesh: </p>
				<p>{cameraStoreState.hoveredMesh}</p>
			</div>
			<div className={styles.debugger__container__rowSection}>
				<p>cameraPosition: </p>
				<p>
					[{cameraStoreState.cameraPosition.x}, {cameraStoreState.cameraPosition.y}, {cameraStoreState.cameraPosition.z}
					]
				</p>
			</div>
			<div className={styles.debugger__container__rowSection}>
				<p>cameraTarget: </p>
				<p>
					[{cameraStoreState.cameraTarget.x}, {cameraStoreState.cameraTarget.y}, {cameraStoreState.cameraTarget.z}]
				</p>
			</div>
			<div className={styles.debugger__container__rowSection}>
				<p>hasAnimation: </p>
				<p>{cameraStoreState.hasAnimation === true ? 'true' : 'false'}</p>
			</div>

			<div className={styles.debugger__container__rowSection}>
				<p>idleState: </p>
				<p>{cameraStoreState.idleState === true ? 'true' : 'false'}</p>
			</div>
		</div>
	);
};

export default ThreeJsDataDebugger;
