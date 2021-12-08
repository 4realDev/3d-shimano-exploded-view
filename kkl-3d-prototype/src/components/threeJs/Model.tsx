// npm i --save-dev @types/react
import { useEffect, useRef } from 'react';
import { Center, useGLTF } from '@react-three/drei';
// npm i --save-dev @types/three
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';
import { setMeshList, useMeshStore } from '../../store/useMeshStore';
import { useCameraStore } from '../../store/useCameraStore';
import { CANVAS_DEBUG } from '../../App';

// https://githubmemory.com/repo/pmndrs/drei/issues/469
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
	clickedMesh: string | null;
	setClickedMesh: (value: string | null) => void;
};

const Model = ({ hoveredMesh, setHoveredMesh, clickedMesh, setClickedMesh }: ModelProps) => {
	const meshList = useMeshStore((state) => state.meshList);
	const selectedMeshes = useCameraStore((state) => state.selectedMeshes);

	const group = useRef<GroupProps>();
	const model = useGLTF('/house-model.glb') as DreiGLTF;

	const outlineOpacityValueUnselected = 0.2;
	const outlineOpacityValueSelectedAndDefault = 1;
	const colorOpacityValueUnselected = 0.15;
	const colorOpacityValueSelectedAndDefault = 1;
	const colorHovered = '#FF7F7F';
	const outlineOpacityValueHovered = 0.5;

	const setMeshColor = (meshObject: MeshObject) => {
		if (hoveredMesh !== meshObject.name) return meshObject.color;
		if (selectedMeshes.includes(meshObject.name) && selectedMeshes.length <= 1) return meshObject.color;
		else return colorHovered;
	};

	const setOutlineOpacity = (meshObject: MeshObject) => {
		// current mesh is non of the selectedMeshes
		if (selectedMeshes.length > 0 && !selectedMeshes.includes(meshObject.name)) {
			// current mesh is non of the selecteMeshes and is hovered
			if (hoveredMesh === meshObject.name) {
				return outlineOpacityValueHovered;
			}
			// current mesh is non of the selectedMeshes and is not hovered
			return outlineOpacityValueUnselected;
		}
		// current mesh is selected or there are no selected meshes yet
		return outlineOpacityValueSelectedAndDefault;
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

	const renderMeshChildren = (meshObject: MeshObject) => {
		return (
			<>
				{meshObject.children !== undefined &&
					meshObject.children?.length > 0 &&
					meshObject.children.map((childObject) => {
						return (
							<mesh
								name={childObject.name}
								visible={childObject.isVisible}
								userData={childObject.userData}
								material={childObject.material}
								position={childObject.position}
								rotation={childObject.rotation}
								scale={childObject.scale}
							>
								<bufferGeometry attach='geometry' {...childObject.geometry} />
								<meshBasicMaterial
									attach='material'
									color={childObject.color}
									transparent
									visible={childObject.isVisible}
									opacity={childObject.opacity}
								/>
								<lineSegments renderOrder={100} name={childObject.name}>
									<edgesGeometry attach='geometry' args={[childObject.geometry]} />
									<lineBasicMaterial color='black' attach='material' transparent opacity={childObject.opacity} />
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
					if (event.object.visible && event.object.userData.customName) {
						event.stopPropagation();
						setClickedMesh(event.object.name);
						// event.object.material.visible = false;
					}
				}}
				// Pointer click outside of mesh
				// Set current object inside state to the one clicked
				onPointerMissed={(event) => {
					setClickedMesh(null);
				}}
			>
				<bufferGeometry attach='geometry' {...meshObject.geometry} />
				<meshBasicMaterial
					attach='material'
					// material={meshObject.material}
					color={setMeshColor(meshObject)}
					transparent
					visible={meshObject.isVisible}
					opacity={
						selectedMeshes.length > 0 && !selectedMeshes.includes(meshObject.name)
							? colorOpacityValueUnselected
							: colorOpacityValueSelectedAndDefault
					}
				/>
				<lineSegments renderOrder={100} name={meshObject.name}>
					<edgesGeometry attach='geometry' args={[meshObject.geometry]} />
					{/* Due limitations of OpenGL Core Profile with WebGL renderer on most platforms linewidth will always be 1 regardless of set value.  */}
					<lineBasicMaterial color='black' attach='material' transparent opacity={setOutlineOpacity(meshObject)} />
				</lineSegments>
			</mesh>
		);
	};

	useEffect(() => {
		const initialMeshList = convertGLTFToMeshList(model.nodes);
		setMeshList(initialMeshList);
		console.log(initialMeshList);
	}, []);

	return (
		<>
			{CANVAS_DEBUG && <primitive object={new THREE.BoxHelper(group.current as any, 'black')} />}
			{/* // Drei: Calculates a boundary box and centers its children accordingly. */}
			<Center>
				<group scale={0.01} position={[0, 0, 0]} ref={group}>
					{meshList.map((meshObject: MeshObject) => {
						return (
							<>
								{renderMeshChildren(meshObject)}
								{renderMesh(meshObject)}
							</>
						);
					})}
				</group>
			</Center>
		</>
	);
};

export default Model;

useGLTF.preload('/house-model.glb');
