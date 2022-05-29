import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';
import { setMeshList, useMeshStore } from '../../store/useMeshStore';
import { setHoveredMesh, showAndSelectRoom, useCameraStore } from '../../store/useCameraStore';
import { handleRoomDataChange, useWizardStore } from '../../store/useWizardStore';
import { toggleIsAnnotationActive, useDebugStore } from '../../store/useDebugStore';
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
	const meshList = useMeshStore((state) => state.meshList);
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);
	const filteredMeshes = useCameraStore((state) => state.filteredMeshes);
	const hoveredMesh = useCameraStore((state) => state.hoveredMesh);
	const wizardStep = useWizardStore((state) => state.step);

	const isLineSegmentMaterialActive = useDebugStore((state) => state.isLineSegementMaterialActive);
	const isExplodedViewActive = useDebugStore((state) => state.isExplodedViewActive);
	const isMaterialActive = useDebugStore((state) => state.isMaterialActive);
	const isAnnotationActive = useDebugStore((state) => state.isAnnotationActive);
	const isBoxHelperActive = useDebugStore((state) => state.isBoxHelperActive);

	const group = useRef<GroupProps>();
	const { nodes, animations } = useGLTF('./model/gear.glb') as DreiGLTF;
	const { actions, names } = useAnimations(animations, group as any);

	const colorModelDefault = '#ababab';
	// const colorFilteredMainRoom = '#c4aeae';
	// const colorFilteredSideRoom = '#c7d0af';
	// const colorSelectedOrHoveredMainRoom = '#ceadad';
	// const colorSelectedOrHoveredSideRoom = '#cbd5ac';

	useEffect(() => {
		const initialMeshList = convertGLTFToMeshList(nodes);
		setMeshList(initialMeshList);
	}, [nodes]);

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

	/**
	 * Returns color hex value according to mesh objects state and wizardStep (hovered, selected, included in filteredMeshes array).
	 * @param meshObject The mesh object from which the color will be determined.
	 * @return The resulting color hex value according to meshObject's state.
	 */
	const getMeshColor = useCallback(
		(meshObject: MeshObjectType) => {
			let colorFiltered;
			let colorSelectedOrHovered;
			const isHovered = hoveredMesh === meshObject.name;
			const isSelected = selectedMeshes.includes(meshObject.name);

			// special state for the selection through the model, without filtering in the wizard before
			if (wizardStep === 0) return isSelected || isHovered ? colorSelectedOrHovered : meshObject.color;

			// normal state which differentiates between filtered, hovered and selected meshes
			if (filteredMeshes.includes(meshObject.name)) {
				return isSelected || isHovered ? colorSelectedOrHovered : colorFiltered;
			} else {
				return meshObject.color;
			}
		},
		[filteredMeshes, hoveredMesh, selectedMeshes, wizardStep]
	);

	/**
	 * Returns float opacity value according to mesh objects state and wizardStep (hovered, selected, included in filteredMeshes array).
	 * @param meshObject The mesh object from which the opacity will be determined.
	 * @return The resulting opacity value according to meshObject's state.
	 */
	const getMeshMaterialOpacity = useCallback(
		(meshObject: MeshObjectType) => {
			const isHovered = hoveredMesh === meshObject.name;
			const isSelected = selectedMeshes.includes(meshObject.name);

			// default state, before a room was selected
			if (selectedMeshes.length === 0) return 1.0;
			// special state for the selection through the model, without filtering in the wizard before
			if (wizardStep === 0) return isSelected || isHovered ? 1.0 : 0.35;
			// normal state which differentiates between filtered, hovered and selected meshes
			// if (filteredMeshes.includes(meshObject.name)) {
			// 	return isSelected || isHovered ? 1.0 : 0.5;
			// }
			else {
				return 0.35;
			}
		},
		[hoveredMesh, selectedMeshes, wizardStep]
	);

	const convertGLTFToMeshList = (nodes: { [name: string]: THREE.Mesh }) => {
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
				isInteractable(mesh) && (convertedMeshParent.userData = { customName: mesh.userData.customName });
				initialMeshList.push(convertedMeshParent);
			}
		});

		return initialMeshList;
	};

	const getMeshMaterialOpacityTwo = useCallback(
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
				meshObject.material.opacity = getMeshMaterialOpacityTwo(meshObject);
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
									// Only visible meshes with a userData.customName (defined inside 3D Software) can be clicked
									if (event.object.visible) {
										event.stopPropagation();
										handleRoomDataChange(meshObject.name);
										showAndSelectRoom(meshObject.name);
										toggleIsAnnotationActive(false);
									}
							  }
					}
				>
					<bufferGeometry attach='geometry' {...meshObject.geometry} />
					{isMaterialActive && (
						<meshStandardMaterial
							attach='material'
							color={getMeshColor(meshObject)}
							transparent
							visible={meshObject.isVisible}
							opacity={getMeshMaterialOpacity(meshObject)}
							metalness={0.5}
						/>
					)}
					{isLineSegmentMaterialActive && (
						<lineSegments>
							<edgesGeometry attach='geometry' args={[meshObject.geometry]} />
							<lineBasicMaterial color='black' attach='material' transparent />
						</lineSegments>
					)}
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
							annotationPosition={isExplodedViewActive ? meshData?.model.markerPosEv : meshData?.model.markerPos}
						/>
					)}
				</mesh>
			);
		},
		[
			getMeshMaterialOpacityTwo,
			isMaterialActive,
			getMeshColor,
			getMeshMaterialOpacity,
			isLineSegmentMaterialActive,
			isAnnotationActive,
			isExplodedViewActive,
			longPress,
		]
	);

	const modelHTML = useMemo(() => {
		return meshList.length === 0 ? null : (
			<group ref={group} dispose={null} position={[0, -5, 0]} scale={[0.5, 0.5, 0.5]}>
				{meshList.map((parentMeshObject: MeshObjectType, index: number) => {
					return <mesh key={index}>{renderMesh(parentMeshObject, index)}</mesh>;
				})}
			</group>
		);
	}, [meshList, renderMesh]);

	return (
		<>
			{isBoxHelperActive && <primitive object={new THREE.BoxHelper(group.current as any, 'black')} />}
			{modelHTML}
		</>
	);
};

export default Model;

useGLTF.preload('./model/gear.glb');
