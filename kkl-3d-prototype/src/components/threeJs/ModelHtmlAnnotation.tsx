import { Html } from '@react-three/drei';
import { useState } from 'react';
import { Vector3 } from 'three';
import styles from './ModelHtmlAnnotation.module.scss';
import cn from 'classnames';
import { setHoveredMesh, showAndSelectRoom, useCameraStore } from '../../store/useCameraStore';
import { handleRoomDataChange } from '../../store/useWizardStore';

type ModelHtmlAnnotationProps = {
	index: number;
	title?: string;
	description?: string;
	meshName: string;
	meshPosition: THREE.Vector3;
	annotationPosition?: THREE.Vector3;
};

const ModelHtmlAnnotation = ({
	index,
	title,
	description,
	meshName,
	meshPosition,
	annotationPosition,
}: ModelHtmlAnnotationProps) => {
	// This holds the local occluded state
	const hoveredMesh = useCameraStore((state) => state.hoveredMesh);
	const [isVisible, setIsVisible] = useState(true);
	const isHovered = meshName === hoveredMesh;

	const handleOnPointerDown = () => {
		showAndSelectRoom(meshName);
		handleRoomDataChange(meshName);
	};

	// useFrame((state) => {
	// 	const meshDistance = state.camera.position.distanceTo(meshPosition);
	// 	const spriteDistance = state.camera.position.distanceTo(annotationPosition || new Vector3(0, 0, 0));
	// 	const spriteBehindObject = spriteDistance < meshDistance;

	// sprite.material.opacity = spriteBehindObject ? 0.25 : 1;
	// annotation.style.opacity = spriteBehindObject ? 0.25 : 1;

	// setIsVisible(spriteBehindObject ? false : true);

	// get objects intersecting that ray
	// const intersections = annontationRef && annontationRef.current && raycaster.intersectObjects(annontationRef.current, true);
	// console.log(intersections);

	// if the first intersection isn't the marker, it is at least partly occluded
	// if (intersections.length > 0 && intersections[0].object !== annontationRef.current.object) {
	// 	// hide marker...
	// 	console.log('HIDE MARKER');
	// 	setIsVisible(false);
	// }
	// });

	// const getAnnotationScale = () => {
	// 	if (isVisible && isHovered) {
	// 		return 1.25;
	// 	} else if (isVisible || isHovered) {
	// 		return 1;
	// 	} else return 0.5;
	// };

	return (
		<Html // Hide contents "behind" other meshes
			occlude
			// Tells us when contents are occluded (or not)
			onOcclude={() => {
				setIsVisible(!isVisible);
				return null;
			}}
			// distanceFactor seems to have issues with late post rendering
			distanceFactor={10}
			position={annotationPosition ? annotationPosition : new Vector3(0, 0, 0)}
			// We just interpolate the visible state into css opacity and transforms
		>
			<div
				// className={cn(styles.annotationAndMarkerContainer, {
				// 	[styles['annotationAndMarkerContainer--hoveredByModel']]: meshName === hoveredMesh,
				// })}
				className={cn(styles.annotationAndMarker, {
					[styles['annotationAndMarker--visible']]: isVisible,
					[styles['annotationAndMarker--invisible']]: !isVisible,
					[styles['annotationAndMarker--visibleAndHovered']]: isVisible && isHovered,
					[styles['annotationAndMarker--invisibleAndHovered']]: !isVisible && isHovered,
				})}
				onPointerDown={() => handleOnPointerDown()}
				onPointerOver={() => {
					setHoveredMesh(meshName);
				}}
				onPointerOut={() => {
					setHoveredMesh(null);
				}}
			>
				<div className={styles.marker}>{index}</div>
				<div className={styles.annotation}>
					{title && <div>{title}</div>}
					{description && <div>{description}</div>}
				</div>
			</div>
		</Html>
	);
};

export default ModelHtmlAnnotation;
