import React, { useEffect, useRef } from 'react';
import { Center, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';
import { setMeshList, useMeshStore } from '../../store/useMeshStore';
import { showAndSelectRoom, showRoomsOverview, useCameraStore } from '../../store/useCameraStore';
import { INTERACTABLE_MESH_NAMES, roomList } from '../../data/roomData';
import { handleRoomDataChange, useWizardStore } from '../../store/useWizardStore';
import { useDebugStore } from '../../store/useDebugStore';

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
	material: THREE.Material;
	color: string;
	opacity: number;
	isVisible: boolean;
	userData?: Record<string, string>;
	children?: MeshObjectType[];
};

type ModelProps = {
	hoveredMesh: string | null;
	setHoveredMesh: (value: string | null) => void;
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

const Model: React.FC<ModelProps> = ({ hoveredMesh, setHoveredMesh, longPress }) => {
	const meshList = useMeshStore((state) => state.meshList);
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);
	const filteredMeshes = useCameraStore((state) => state.filteredMeshes);
	const wizardStep = useWizardStore((state) => state.step);
	const isLineSegmentMaterialActive = useDebugStore((state) => state.isLineSegementMaterialActive);

	const group = useRef<GroupProps>();
	const model = useGLTF('./model/house-model.glb') as DreiGLTF;

	const colorModelDefault = '#D4D4D4';
	const colorModelChildrenDefault = '#5d5d5d';
	const colorFilteredMainRoom = '#c4aeae';
	const colorFilteredSideRoom = '#c7d0af';
	const colorSelectedOrHoveredMainRoom = '#ceadad';
	const colorSelectedOrHoveredSideRoom = '#cbd5ac';

	useEffect(() => {
		const initialMeshList = convertGLTFToMeshList(model.nodes);
		setMeshList(initialMeshList);
	}, [model.nodes]);

	/**
	 * Returns color hex value according to mesh objects state and wizardStep (hovered, selected, included in filteredMeshes array).
	 * @param meshObject The mesh object from which the color will be determined.
	 * @return The resulting color hex value according to meshObject's state.
	 */
	const getMeshColor = (meshObject: MeshObjectType) => {
		let colorFiltered;
		let colorSelectedOrHovered;
		const hasFittingSideRoom = roomList.find((room) => room.model.meshName === meshObject.name)?.info.fittingSideRooms;
		const isHovered = hoveredMesh === meshObject.name;
		const isSelected = selectedMeshes.includes(meshObject.name);

		// if room has fittingSideRooms, it is a mainRoom and receives the hovered / active color for main rooms
		// else it is a sideRoom and receives the hovered / active color for side rooms
		if (hasFittingSideRoom) {
			colorFiltered = colorFilteredMainRoom;
			colorSelectedOrHovered = colorSelectedOrHoveredMainRoom;
		} else {
			colorFiltered = colorFilteredSideRoom;
			colorSelectedOrHovered = colorSelectedOrHoveredSideRoom;
		}

		// special state for the selection through the model, without filtering in the wizard before
		if (wizardStep === 0) return isSelected || isHovered ? colorSelectedOrHovered : meshObject.color;

		// normal state which differentiates between filtered, hovered and selected meshes
		if (filteredMeshes.includes(meshObject.name)) {
			return isSelected || isHovered ? colorSelectedOrHovered : colorFiltered;
		} else {
			return meshObject.color;
		}
	};

	/**
	 * Returns float opacity value according to mesh objects state and wizardStep (hovered, selected, included in filteredMeshes array).
	 * @param meshObject The mesh object from which the opacity will be determined.
	 * @return The resulting opacity value according to meshObject's state.
	 */
	const getMeshMaterialOpacity = (meshObject: MeshObjectType) => {
		const isHovered = hoveredMesh === meshObject.name;
		const isSelected = selectedMeshes.includes(meshObject.name);

		// default state, before a room was selected
		if (selectedMeshes.length === 0) return 1.0;
		// special state for the selection through the model, without filtering in the wizard before
		if (wizardStep === 0) return isSelected || isHovered ? 1.0 : 0.35;
		// normal state which differentiates between filtered, hovered and selected meshes
		if (filteredMeshes.includes(meshObject.name)) {
			return isSelected || isHovered ? 1.0 : 0.7;
		} else {
			return 0.35;
		}
	};

	const convertGLTFToMeshList = (nodes: { [name: string]: THREE.Mesh }) => {
		const initialMeshList: MeshObjectType[] = [];
		delete nodes.Scene;
		delete nodes.Camera;
		delete nodes.Light;

		Object.values(nodes).forEach((mesh) => {
			const children: MeshObjectType[] = [];

			// *** NAMING LOGIC OF THE MESHES ***
			// For the naming of the meshes, we use the "Custom Properties" from the Blender Software
			// These "Custom Properties" are stored in the glTF model inside every mesh as "userData"
			// Therefore mesh.userData.customName meta information are used instead of mesh.name
			// This keeps the naming of the meshes in the 3D Software independed from the naming conventions in the React Application
			// If userData.customName does not exist in the mesh,
			// use the original mesh.name as fallback and set the mesh visible at initialization
			// If it exist, store the userData inside the mesh itself
			// This allows us to differentiate inside the onPointerOver, onPointerOut and onPointerDown Event Handlers,
			// between interactable meshes with a custonName and non-interactable meshen without a customName

			if (mesh.children.length !== 0) {
				mesh.children.forEach((child: any) => {
					const converterMeshChild: MeshObjectType = {
						name: isInteractable(child) ?? child.name,
						geometry: child.geometry,
						material: child.material as any,
						color: colorModelChildrenDefault,
						opacity: 1,
						// interactable mesh children (from which the visibility can be toggled) have a customName and are by default invisible
						// other child meshes are visible according their visibility state inside the 3D editing software
						isVisible: isInteractable(child) ? false : child.visible,
						position: child.position,
						rotation: child.rotation,
						scale: child.scale,
					};
					isInteractable(child) && (converterMeshChild.userData = { customName: child.userData.customName });
					children.push(converterMeshChild);
				});
			}

			if (mesh.parent?.name === 'Scene') {
				const convertedMeshParent: MeshObjectType = {
					name: isInteractable(mesh) ?? mesh.name,
					geometry: mesh.geometry,
					material: mesh.material as any,
					color: colorModelDefault,
					opacity: 1,
					isVisible: true,
					children: children,
				};
				isInteractable(mesh) && (convertedMeshParent.userData = { customName: mesh.userData.customName });
				initialMeshList.push(convertedMeshParent);
			}
		});

		return initialMeshList;
	};

	// render rooms children elements (equipment & chair_formation)
	const renderMeshChild = (childMeshObject: MeshObjectType, parentMeshObject: MeshObjectType) => {
		return (
			<mesh
				key={childMeshObject.name}
				name={childMeshObject.name}
				visible={childMeshObject.isVisible}
				userData={childMeshObject.userData}
				material={childMeshObject.material}
				position={childMeshObject.position}
				rotation={childMeshObject.rotation}
				scale={childMeshObject.scale}
			>
				<bufferGeometry attach='geometry' {...childMeshObject.geometry} />
				<meshStandardMaterial
					attach='material'
					color={childMeshObject.color}
					transparent
					visible={childMeshObject.isVisible}
					opacity={getMeshMaterialOpacity(parentMeshObject)}
					metalness={0.5}
				/>
				{isLineSegmentMaterialActive && (
					<lineSegments>
						<edgesGeometry attach='geometry' args={[childMeshObject.geometry]} />
						<lineBasicMaterial color='black' attach='material' transparent />
					</lineSegments>
				)}
			</mesh>
		);
	};

	const renderMesh = (meshObject: MeshObjectType) => {
		return (
			<mesh
				key={meshObject.name}
				name={meshObject.name}
				visible={meshObject.isVisible}
				userData={meshObject.userData}
				material={meshObject.material}
				// Pointer on mesh (similar to onHover)
				onPointerOver={
					meshObject.userData === undefined
						? undefined
						: (event) => {
								// Only visible meshes with a userData.customName (defined inside 3D Software) can be hovered
								if (event.object.visible && isInteractable(event.object) && longPress === false) {
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
									const customName = event.object.userData.customName;

									// if the roof is clicked, show the rooms overview
									if (customName === INTERACTABLE_MESH_NAMES.roof) {
										showRoomsOverview();
									}
									// Do not set the clicked room as activeRoom in wizardData when wizardStep === 0
									else if (wizardStep === 0 || wizardStep === 4) {
										showAndSelectRoom(event.object.userData.customName);
									}
									// if clicked mesh is inside filteredMeshes
									// Add or overwrite the wizardData with the clicked RoomData
									// This will set the clicked room as activeRoom as well,
									// which will trigger the opening and scrolling to the corresponding AccordionItem
									else if (wizardStep > 0 && filteredMeshes.includes(customName)) {
										handleRoomDataChange(customName);
										// Select and show the clicked room
										showAndSelectRoom(customName);
									}
								}
						  }
				}
			>
				<bufferGeometry attach='geometry' {...meshObject.geometry} />
				<meshStandardMaterial
					attach='material'
					color={getMeshColor(meshObject)}
					transparent
					visible={meshObject.isVisible}
					opacity={getMeshMaterialOpacity(meshObject)}
					metalness={0.5}
				/>
				{isLineSegmentMaterialActive && (
					<lineSegments>
						<edgesGeometry attach='geometry' args={[meshObject.geometry]} />
						<lineBasicMaterial color='black' attach='material' transparent />
					</lineSegments>
				)}
			</mesh>
		);
	};

	return (
		<>
			{useDebugStore((state) => state.isBoxHelperActive) && (
				<primitive object={new THREE.BoxHelper(group.current as any, 'black')} />
			)}
			{/* // Drei Center: Calculates a boundary box and centers its children accordingly. */}
			<Center>
				<group scale={0.0075} position={[0, 0, 0]} ref={group}>
					{meshList.map((parentMeshObject: MeshObjectType, index: number) => {
						return (
							<mesh key={index}>
								{renderMesh(parentMeshObject)}
								{parentMeshObject.children !== undefined &&
									parentMeshObject.children?.length > 0 &&
									parentMeshObject.children.map((childMeshObject) =>
										renderMeshChild(childMeshObject, parentMeshObject)
									)}
							</mesh>
						);
					})}
				</group>
			</Center>
		</>
	);
};

export default Model;

useGLTF.preload('./model/house-model.glb');
