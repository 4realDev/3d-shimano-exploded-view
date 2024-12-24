import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';
import { setHoveredMesh, toggleIsAnnotationActive, useMeshStore } from '../../store/useMeshStore';
import { setSelectedMesh } from '../../store/useMeshStore';
import { showAndSelectRoom } from '../../store/useCameraStore';
import ModelHtmlAnnotation from './ModelHtmlAnnotation';
import { getMeshObjectInformationsByMeshName } from '../../utils/room';

// https://githubmemory.com/repo/pmndrs/drei/issuesF/469
export type DreiGLTF = GLTF & {
	nodes: { [name: string]: THREE.Mesh };
	materials: { [name: string]: THREE.Material };
};

export type MeshObjectType = {
	name: string;
	geometry: THREE.BufferGeometry;
	position?: THREE.Vector3;
	rotation?: THREE.Euler;
	scale?: THREE.Vector3;
	material: THREE.Material | THREE.Material[] | undefined;
	color: string;
	opacity: number;
	isVisible: boolean;
	userData?: Record<string, string>;
	children?: MeshObjectType[];
};

type ModelProps = {
	longPress: boolean;
};

export const isInteractable = (
	meshObject:
		| MeshObjectType
		| THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
		| THREE.Object3D<THREE.Event>
) => {
	return meshObject.userData && meshObject.userData.customName;
};

const Model: React.FC<ModelProps> = ({ longPress }) => {
	const selectedMeshes = useMeshStore((state) => state.selectedMeshes);
	const hoveredMesh = useMeshStore((state) => state.hoveredMesh);

	const isExplodedViewActive = useMeshStore((state) => state.isExplodedViewActive);

	// TODO: Move out of Debug inside Mesh because it has important usage through buttons
	const isAnnotationActive = useMeshStore((state) => state.isAnnotationActive);

	const group = useRef<GroupProps>();
	const { nodes, animations } = useGLTF('./model/gear.glb') as DreiGLTF;
	const { actions, names } = useAnimations(animations, group as any);

	const colorModelDefault = '#ababab';

	useEffect(() => {
		// Reset and fade in animation after an index has been changed
		if (isExplodedViewActive) {
			names.forEach((actionName, index) => {
				const action = actions?.[actionName];
				if (action) {
					action.reset();
					action.setEffectiveTimeScale(1);
					action.setLoop(THREE.LoopOnce, 1);
					action.clampWhenFinished = true;
					action.play();
				}
			});
		} else {
			names.forEach((actionName) => {
				const action = actions?.[actionName];
				if (action) {
					action.paused = false;
					action.timeScale = -1;
					action.setEffectiveTimeScale(-1);
					action.setLoop(THREE.LoopOnce, 1);
					action.clampWhenFinished = true;
					action.play();
				}
			});
		}
	}, [actions, animations, isExplodedViewActive, names]);

	const convertGLTFToMeshList = useCallback((nodes: { [name: string]: THREE.Mesh }) => {
		const initialMeshList: MeshObjectType[] = [];
		delete nodes.Scene;
		delete nodes.Camera;
		delete nodes.Light;

		Object.values(nodes).forEach((mesh) => {
			if (mesh.parent?.name === 'Scene') {
				const convertedMeshParent: MeshObjectType = {
					// name: isInteractable(mesh) ?? mesh.name,
					name: mesh.name,
					geometry: mesh.geometry,
					material: mesh.material as any,
					color: colorModelDefault,
					opacity: 1,
					isVisible: true,
					position: mesh.position,
					rotation: mesh.rotation,
					scale: mesh.scale,
				};
				isInteractable(mesh) &&
					(convertedMeshParent.userData = { customName: mesh.userData.customName });
				initialMeshList.push(convertedMeshParent);
			}
		});

		return initialMeshList;
	}, []);

	const getMeshMaterialOpacity = useCallback(
		(meshObject: MeshObjectType) => {
			const isHovered = hoveredMesh === meshObject.name;
			const isSelected = selectedMeshes.includes(meshObject.name);

			// default state, before a room was selected
			if (selectedMeshes.length === 0) {
				// if (hoveredMesh === null) return 1.0;
				// else if (isHovered || isExplodedViewActive) {
				// 	return 1.0;
				// } else {
				// 	return 0.025;
				// }
				return 1.0;
			} else {
				// special state for the selection through the model, without filtering in the wizard before
				if (isSelected || isHovered) return 1.0;
				else return 0.025;
			}
		},
		[hoveredMesh, selectedMeshes]
	);

	const renderMesh = useCallback(
		(meshObject: MeshObjectType, index: number) => {
			if (meshObject.material && meshObject.material instanceof THREE.Material) {
				meshObject.material.transparent = true;
				meshObject.material.opacity = getMeshMaterialOpacity(meshObject);
				meshObject.material.needsUpdate = true;
			}

			const meshData = getMeshObjectInformationsByMeshName(meshObject.name);

			return (
				<mesh
					key={meshObject.name}
					name={meshObject.name}
					visible={meshObject.isVisible}
					userData={meshObject.userData}
					material={meshObject.material ? meshObject.material : undefined}
					position={meshObject.position}
					rotation={meshObject.rotation}
					scale={meshObject.scale}
					// Pointer on mesh (similar to onHover)
					onPointerOver={
						meshObject.userData === undefined
							? undefined
							: (event) => {
									// Only visible meshes with a userData.customName (defined inside 3D Software) can be hovered
									// if (event.object.visible && isInteractable(event.object) && longPress === false) {
									if (event.object.visible && longPress === false) {
										event.stopPropagation();
										setHoveredMesh(event.object.name);
									}
							  }
					}
					// Pointer outside of mesh
					// if pointer is outside of a mesh and does not intersect with any other mesh
					// set the hoveredElement to null
					onPointerOut={
						meshObject.userData === undefined
							? undefined
							: (event) => {
									event.intersections.length === 0 && setHoveredMesh(null);
							  }
					}
					// Pointer click on mesh (similar to onClick)
					// stopPropagation and set current object inside state to the one clicked
					onPointerDown={
						meshObject.userData === undefined
							? undefined
							: (event) => {
									console.log('TEST', meshObject.name);
									event.stopPropagation();
									setSelectedMesh(meshObject.name);
									showAndSelectRoom(meshObject.name);
									toggleIsAnnotationActive(false);
							  }
					}>
					<bufferGeometry
						attach='geometry'
						{...meshObject.geometry}
					/>

					{meshData?.model.markerPos && isAnnotationActive && (
						<ModelHtmlAnnotation
							title={meshData?.info.title}
							articleIndex={meshData?.info.articleIndex}
							articleNr={meshData?.info.articleNr}
							category={meshData?.info.category}
							group={meshData?.info.group}
							price={meshData?.info.price}
							meshName={meshObject.name}
							meshPosition={meshObject.position!!}
							annotationPosition={
								isExplodedViewActive ? meshData?.model.markerPosEv : meshData?.model.markerPos
							}
						/>
					)}
				</mesh>
			);
		},
		[getMeshMaterialOpacity, isAnnotationActive, isExplodedViewActive, longPress]
	);

	const modelHTML = useMemo(() => {
		return (
			<group
				ref={group}
				dispose={null}
				position={[0, -4.25, 0]}
				scale={[0.5, 0.5, 0.5]}>
				{convertGLTFToMeshList(nodes).map((parentMeshObject: MeshObjectType, index: number) => {
					return <mesh key={index}>{renderMesh(parentMeshObject, index)}</mesh>;
				})}
			</group>
		);
	}, [convertGLTFToMeshList, nodes, renderMesh]);

	return <>{modelHTML}</>;
};

export default Model;

useGLTF.preload('./model/gear.glb');
