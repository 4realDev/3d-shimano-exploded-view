// npm i --save-dev @types/react
import { useEffect, useRef } from 'react';
import { Center, useGLTF } from '@react-three/drei';
// npm i --save-dev @types/three
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';

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
	children?: MeshObject[];
};

type ModelProps = {
	meshList: MeshObject[];
	setMeshList: (value: MeshObject[]) => void;
	hoveredMesh: string | null;
	setHoveredMesh: (value: string | null) => void;
	clickedMesh: string | null;
	setClickedMesh: (value: string | null) => void;
	selectedMeshes: string[];
	setSelectedMeshes: (value: string[]) => void;
};

const Model = ({
	meshList,
	setMeshList,
	hoveredMesh,
	setHoveredMesh,
	clickedMesh,
	setClickedMesh,
	selectedMeshes,
	setSelectedMeshes,
}: ModelProps) => {
	const group = useRef<GroupProps>();
	const model = useGLTF('/house-model.glb') as DreiGLTF;
	const initialMeshList: MeshObject[] = [];

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
		// const meshes: Record<string, THREE.Mesh> = nodes;
		delete nodes.Scene;
		delete nodes.Camera;
		delete nodes.Light;

		Object.values(nodes).forEach((mesh) => {
			const children: MeshObject[] = [];

			if (mesh.children.length !== 0) {
				Object.values(mesh.children).forEach((child: any) => {
					children.push({
						name: child.name,
						geometry: child.geometry,
						material: child.material as any,
						color: 'white',
						opacity: 1,
						isVisible: false,
						position: child.position,
						rotation: child.rotation,
						scale: child.scale,
					});
				});
			}

			if (mesh.parent?.name === 'Scene') {
				initialMeshList.push({
					name: mesh.name,
					geometry: mesh.geometry,
					material: mesh.material as any,
					color: 'white',
					opacity: 1,
					isVisible: true,
					children: children,
				});
			}
		});
	};

	// const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

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
				material={meshObject.material}
				onPointerOver={(event) => {
					// check to prevent event on not visible meshes
					if (event.object.visible) {
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
					if (event.object.visible) {
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
		convertGLTFToMeshList(model.nodes);
		setMeshList(initialMeshList);
	}, []);

	return (
		<>
			<primitive object={new THREE.BoxHelper(group.current as any, 'black')} />
			{/* // Drei: Calculates a boundary box and centers its children accordingly. */}
			<Center>
				{/* <Box position={[-2, 3, 2]} args={[16, 7, 15]}>
				<meshNormalMaterial attach='material' wireframe />
			</Box> */}
				<group
					scale={0.01}
					position={[0, 0, 0]}
					// rotation={[deg2rad(0), deg2rad(-90), deg2rad(0)]}
					ref={group}
					// dispose={null}

					// EVENTS FOR ALL MESHES
					// TODO: if possible move back to groups
					// PROBLEM: LineSegments has onPointerEvents too ..
				>
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
