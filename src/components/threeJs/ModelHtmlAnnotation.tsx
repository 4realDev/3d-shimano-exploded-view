import { Html } from '@react-three/drei';
import { useState } from 'react';
import styles from './ModelHtmlAnnotation.module.scss';
import cn from 'classnames';
import { setHoveredMesh, setSelectedMesh, useMeshStore } from '../../store/useMeshStore';
import { showAndSelectRoom } from '../../store/useCameraStore';
import PriceCard from '../ui/PriceCard/PriceCard';
import { Vector3 } from 'three';

type ModelHtmlAnnotationProps = {
	title?: string;
	articleNr?: string;
	articleIndex?: number;
	category?: string;
	group?: string;
	price?: number;
	meshName: string;
	meshPosition: THREE.Vector3;
	annotationPosition?: THREE.Vector3;
};

const ModelHtmlAnnotation = ({
	title,
	articleNr,
	articleIndex,
	category,
	group,
	price,
	meshName,
	meshPosition,
	annotationPosition,
}: ModelHtmlAnnotationProps) => {
	// This holds the local occluded state
	const hoveredMesh = useMeshStore((state) => state.hoveredMesh);
	const [isVisible, setIsVisible] = useState(true);
	const isHovered = meshName === hoveredMesh;

	const handleOnPointerDown = () => {
		setSelectedMesh(meshName);
		showAndSelectRoom(meshName);
	};

	return (
		<Html // Hide contents "behind" other meshes
			occlude
			// Tells us when contents are occluded (or not)
			onOcclude={() => {
				setIsVisible(!isVisible);
				return null;
			}}
			// distanceFactor seems to have issues with late post rendering
			// distanceFactor={10}
			position={annotationPosition ? annotationPosition : new Vector3(0, 0, 0)}
			// We just interpolate the visible state into css opacity and transforms
		>
			<div
				className={styles.annotationAndMarker}
				onPointerDown={() => handleOnPointerDown()}
				onPointerOver={() => {
					setHoveredMesh(meshName);
				}}
				onPointerOut={() => {
					setHoveredMesh(null);
				}}>
				<div
					className={cn(styles.marker, {
						[styles['marker--visible']]: isVisible,
						[styles['marker--invisible']]: !isVisible,
						[styles['marker--visibleAndHovered']]: isVisible && isHovered,
						[styles['marker--invisibleAndHovered']]: !isVisible && isHovered,
						[styles['marker--adjustedZIndex']]: hoveredMesh && !isHovered,
					})}>
					{articleIndex}
				</div>
				<div
					className={cn(styles.annotation, {
						[styles['annotation--visible']]: (isVisible && isHovered) || (!isVisible && isHovered),
					})}>
					<PriceCard
						title={title}
						articleNr={articleNr}
						group={group}
						category={category}
						price={price}
						extraButtonPadding
					/>
				</div>
			</div>
		</Html>
	);
};

export default ModelHtmlAnnotation;
