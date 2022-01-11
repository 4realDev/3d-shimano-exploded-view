// npm i --save-dev @types/react
import React, { useEffect, useRef } from 'react';
import { Center, useGLTF } from '@react-three/drei';
// npm i --save-dev @types/three
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';
import { setMeshList, useMeshStore } from '../../store/useMeshStore';
import { showAndSelectRoom, showRoomsOverview, useCameraStore } from '../../store/useCameraStore';
import { INTERACTABLE_MESH_NAMES, roomList } from '../../data/roomData';
import { handleRoomDataChange, useWizardStore } from '../../store/useWizardStore';
import { useDebugStore } from '../../store/useDebugStore';

// TODO: Performance issues due to lineSegment Material -> Could be fixed in 3D production

// https://githubmemory.com/repo/pmndrs/drei/issuesF/469
export type DreiGLTF = GLTF & {
	nodes: { [name: string]: THREE.Mesh };
	materials: { [name: string]: THREE.Material };
};

export type MeshObject = {
	name: string;
	geometry: THREE.BufferGeometry;
	position?: THREE.Vector3;
	rotation?: THREE.Euler;
	scale?: THREE.Vector3;
	material: THREE.Material;
	color: string;
	opacity: number;
	isVisible: boolean;
	userData: Record<string, string> | undefined;
	children?: MeshObject[];
};

type ModelProps = {
	hoveredMesh: string | null;
	setHoveredMesh: (value: string | null) => void;
};

const Model: React.FC<ModelProps> = ({ hoveredMesh, setHoveredMesh }) => {
	const meshList = useMeshStore((state) => state.meshList);
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);
	const filteredMeshes = useCameraStore((state) => state.filteredMeshes);
	const wizardStep = useWizardStore((state) => state.step);

	const group = useRef<GroupProps>();
	const model = useGLTF('/house-model.glb') as DreiGLTF;

	// colors from AVASTA: https://avasta.ch/20-best-pastel-color-palettes-for-2021/ #20
	const colorFilteredMainRoom = '#ffcaaf';
	const colorFilteredSideRoom = '#f1ffc4';
	const colorSelectedOrHoveredMainRoom = '#ffd9c6';
	const colorSelectedOrHoveredSideRoom = '#f6ffda';

	useEffect(() => {
		const initialMeshList = convertGLTFToMeshList(model.nodes);
		setMeshList(initialMeshList);
	}, []);

	/**
	 * Returns color hex value according to mesh objects state and wizardStep (hovered, selected, included in filteredMeshes array).
	 * @param meshObject The mesh object from which the color will be determined.
	 * @return The resulting color hex value according to meshObject's state.
	 */
	const getMeshColor = (meshObject: MeshObject) => {
		let colorFiltered;
		let colorSelectedOrHovered;
		const hasFittingSideRoom = roomList.find((room) => room.model.meshName === meshObject.name)?.info.fittingSideRoom;
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
	const getMeshMaterialOpacity = (meshObject: MeshObject) => {
		const isHovered = hoveredMesh === meshObject.name;
		const isSelected = selectedMeshes.includes(meshObject.name);

		// default state, before a room was selected
		if (selectedMeshes.length === 0) return 1.0;
		// special state for the selection through the model, without filtering in the wizard before
		if (wizardStep === 0) return isSelected || isHovered ? 1.0 : 0.15;
		// normal state which differentiates between filtered, hovered and selected meshes
		if (filteredMeshes.includes(meshObject.name)) {
			return isSelected || isHovered ? 1.0 : 0.5;
		} else {
			return 0.15;
		}
	};

	const convertGLTFToMeshList = (nodes: { [name: string]: THREE.Mesh }) => {
		const initialMeshList: MeshObject[] = [];
		delete nodes.Scene;
		delete nodes.Camera;
		delete nodes.Light;

		Object.values(nodes).forEach((mesh) => {
			const children: MeshObject[] = [];

			// *** NAMING LOGIC OF THE MESHES ***
			// For the naming of the meshes, we use the "Custom Properties" from the Blender Software
			// These "Custom Properties" are stored in the glTF model inside every mesh as "userData"
			// Therefore mesh.userData.customName meta information are used instead of mesh.name
			// This keeps the naming of the meshes independed from the naming conventions in the code
			// If the customName inside the userData is not defined, use the original mesh.name as fallback
			// Additionally we store the userData inside the mesh itself
			// This allows us to differentiate inside the onMouseOver and onMouseDown Events,
			// between custom named meshes, which are interactable and other non interactable meshes

			if (mesh.children.length !== 0) {
				Object.values(mesh.children).forEach((child: any) => {
					children.push({
						name: child.userData.customName ?? child.name,
						geometry: child.geometry,
						material: child.material as any,
						color: 'white',
						opacity: 1,
						isVisible: false,
						userData: 'customName' in child.userData ? { customName: child.userData.customName } : undefined,
						position: child.position,
						rotation: child.rotation,
						scale: child.scale,
					});
				});
			}

			if (mesh.parent?.name === 'Scene') {
				initialMeshList.push({
					name: mesh.userData.customName ?? mesh.name,
					geometry: mesh.geometry,
					material: mesh.material as any,
					color: 'white',
					opacity: 1,
					isVisible: true,
					userData: 'customName' in mesh.userData ? { customName: mesh.userData.customName } : undefined,
					children: children,
				});
			}
		});

		return initialMeshList;
	};

	// render rooms children elements (equipment & chair_formation)
	const renderMeshChildren = (meshObject: MeshObject) => {
		return (
			<>
				{meshObject.children !== undefined &&
					meshObject.children?.length > 0 &&
					meshObject.children.map((childObject) => {
						return (
							<mesh
								key={childObject.name}
								name={childObject.name}
								visible={childObject.isVisible}
								userData={childObject.userData}
								material={childObject.material}
								position={childObject.position}
								rotation={childObject.rotation}
								scale={childObject.scale}
							>
								<bufferGeometry attach='geometry' {...childObject.geometry} />

								{/* passing the opacity and color of the parent meshObject to the materials */}
								<meshBasicMaterial
									attach='material'
									color={getMeshColor(meshObject)}
									transparent
									visible={childObject.isVisible}
									opacity={getMeshMaterialOpacity(meshObject)}
								/>
								<lineSegments>
									<edgesGeometry attach='geometry' args={[childObject.geometry]} />
									<lineBasicMaterial
										color='black'
										attach='material'
										transparent
										opacity={getMeshMaterialOpacity(meshObject)}
									/>
								</lineSegments>
							</mesh>
						);
					})}
			</>
		);
	};

	const renderMesh = (meshObject: MeshObject) => {
		return (
			<mesh
				key={meshObject.name}
				name={meshObject.name}
				visible={meshObject.isVisible}
				userData={meshObject.userData}
				material={meshObject.material}
				onPointerOver={(event) => {
					// check to prevent event on not visible meshes
					if (event.object.visible && event.object.userData.customName) {
						event.stopPropagation();
						setHoveredMesh(event.object.name);
					}
				}}
				// Pointer outside of mesh
				// if pointer is outside of a mesh and does not intersect with any other mesh
				// set the hoveredElement to null
				onPointerOut={(event) => {
					event.intersections.length === 0 && setHoveredMesh(null);
				}}
				// Pointer click on mesh
				// stopPropagation and set current object inside state to the one clicked
				onPointerDown={(event) => {
					// check to prevent event on not visible meshes
					// only meshes which have a customName are interactable
					if (event.object.visible && event.object.userData.customName) {
						event.stopPropagation();
						if (event.object.userData.customName === INTERACTABLE_MESH_NAMES.roof) {
							showRoomsOverview();
						} else {
							// if wizardStep is the first filtering step, show every clicked room, but don't set the clicked room as activeRoom in wizardData
							if (wizardStep === 0) {
								showAndSelectRoom(event.object.userData.customName);
							}
							// if wizardStep if > 0 and the room is included in the filtering meshes, set the clicked room as activeRoom and show the the selected room
							else if (wizardStep > 0 && filteredMeshes.includes(event.object.userData.customName)) {
								// Add or overwrite the wizardData with the clicked RoomData to update the AccordionItems
								handleRoomDataChange(event.object.userData.customName);
								showAndSelectRoom(event.object.userData.customName);
							}
						}
					}
				}}
				// Pointer click outside of mesh
				onPointerMissed={(event) => {}}
			>
				<bufferGeometry attach='geometry' {...meshObject.geometry} />
				<meshBasicMaterial
					attach='material'
					color={getMeshColor(meshObject)}
					transparent
					visible={meshObject.isVisible}
					opacity={getMeshMaterialOpacity(meshObject)}
				/>
				{/* Due limitations of OpenGL Core Profile with WebGL renderer on most platforms linewidth will always be 1 regardless of set value.  */}
				<lineSegments>
					<edgesGeometry attach='geometry' args={[meshObject.geometry]} />
					<lineBasicMaterial color='black' attach='material' transparent opacity={getMeshMaterialOpacity(meshObject)} />
				</lineSegments>
			</mesh>
		);
	};

	return (
		<>
			{useDebugStore((state) => state.isBoxHelperActive) && (
				<primitive object={new THREE.BoxHelper(group.current as any, 'black')} />
			)}
			{/* // Drei: Calculates a boundary box and centers its children accordingly. */}
			<Center>
				<group scale={0.0075} position={[0, 0, 0]} ref={group}>
					{meshList.map((meshObject: MeshObject, index: number) => {
						return (
							<mesh key={index}>
								{renderMeshChildren(meshObject)}
								{renderMesh(meshObject)}
							</mesh>
						);
					})}
				</group>
			</Center>
		</>
	);
};

export default Model;

useGLTF.preload('/house-model.glb');
