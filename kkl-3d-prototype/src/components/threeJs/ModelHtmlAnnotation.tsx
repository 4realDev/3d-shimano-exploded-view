import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { Vector3 } from 'three';
import styles from './ModelHtmlAnnotation.module.scss';
import cn from 'classnames';
import { setHoveredMesh, showAndSelectRoom, useCameraStore } from '../../store/useCameraStore';

type ModelHtmlAnnotationProps = {
	index: number;
	title?: string;
	description?: string;
	meshName: string;
	meshPosition: THREE.Vector3;
	annotationPosition?: THREE.Vector3;
};
// const numberTexture = new CanvasTexture(document.querySelector(#canvas));

// const spriteMaterial = new THREE.SpriteMaterial({
//     map: numberTexture,
//     alphaTest: 0.5,
//     transparent: true,
//     depthTest: false,
//     depthWrite: false
// });

const ModelHtmlAnnotation = ({
	index,
	title,
	description,
	meshName,
	meshPosition,
	annotationPosition,
}: ModelHtmlAnnotationProps) => {
	const [isVisible, setIsVisible] = useState(true);
	const hoveredMesh = useCameraStore((state) => state.hoveredMesh);

	const handleOnPointerDown = () => {
		showAndSelectRoom(meshName);
	};

	useFrame((state) => {
		const meshDistance = state.camera.position.distanceTo(meshPosition);
		const spriteDistance = state.camera.position.distanceTo(annotationPosition || new Vector3(0, 0, 0));
		const spriteBehindObject = spriteDistance < meshDistance;

		// sprite.material.opacity = spriteBehindObject ? 0.25 : 1;
		// annotation.style.opacity = spriteBehindObject ? 0.25 : 1;

		setIsVisible(spriteBehindObject ? false : true);

		// get objects intersecting that ray
		// const intersections = annontationRef && annontationRef.current && raycaster.intersectObjects(annontationRef.current, true);
		// console.log(intersections);

		// if the first intersection isn't the marker, it is at least partly occluded
		// if (intersections.length > 0 && intersections[0].object !== annontationRef.current.object) {
		// 	// hide marker...
		// 	console.log('HIDE MARKER');
		// 	setIsVisible(false);
		// }
	});

	return (
		<Html distanceFactor={10} position={annotationPosition ? annotationPosition : new Vector3(0, 0, 0)}>
			<div
				className={cn(styles.annotationAndMarkerContainer, {
					[styles['annotationAndMarkerContainer--lowOpacity']]: !isVisible,
					[styles['annotationAndMarkerContainer--hoveredByModel']]: meshName === hoveredMesh,
				})}
				onPointerDown={() => handleOnPointerDown()}
				onPointerOver={() => setHoveredMesh(meshName)}
				onPointerOut={() => setHoveredMesh(null)}
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
