// npm i --save-dev @types/react
import { useEffect, useRef } from 'react';
import { Center, useGLTF } from '@react-three/drei';
// npm i --save-dev @types/three
import { GLTF } from 'three-stdlib';

// https://githubmemory.com/repo/pmndrs/drei/issues/469
export type DreiGLTF = GLTF & {
	nodes: { [name: string]: THREE.Mesh };
	materials: { [name: string]: THREE.Material };
};

type MeshObject = {
	name: string;
	geometry: THREE.BufferGeometry;
	material: THREE.Material;
	color: string;
	opacity: number;
	isVisible: boolean;
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
	invisibleMesh: string;
	setInvisibleMesh: (value: string) => void;
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
	invisibleMesh,
	setInvisibleMesh,
}: ModelProps) => {
	const group = useRef();
	const model = useGLTF('/house-model.glb') as DreiGLTF;

	const opacityValue = 0.25;
	const opacityValueOutline = 0.05;
	const hoverColor = '#FF7F7F';

	const initialMeshList: MeshObject[] = [];

	const convertGLTFToMeshList = (
		nodes: { [name: string]: THREE.Mesh },
		materials: { [name: string]: THREE.Material }
	) => {
		let nodeName: string[] = [];
		let nodeGeometry: THREE.BufferGeometry[] = [];
		let nodeMaterial: THREE.Material[] = [];

		const meshes: Record<string, THREE.Mesh> = nodes;
		delete meshes.Scene;
		delete meshes.Camera;
		delete meshes.Light;

		Object.values(meshes).forEach((mesh) => {
			nodeName.push(mesh.name);
			nodeGeometry.push(mesh.geometry);
		});

		Object.values(materials).forEach((material) => {
			nodeMaterial.push(material);
		});

		for (var i = 0; i < nodeName.length; i++) {
			initialMeshList.push({
				name: nodeName[i],
				geometry: nodeGeometry[i],
				material: nodeMaterial[i],
				color: 'white',
				opacity: 1,
				isVisible: true,
			});
		}
	};

	// const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

	useEffect(() => {
		convertGLTFToMeshList(model.nodes, model.materials);
		setMeshList(initialMeshList);
	}, []);

	// useHelper(group, BoxHelper, 'black');

	return (
		// Drei: Calculates a boundary box and centers its children accordingly.
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

				// Pointer on mesh
				// if pointer is over a mesh, stop propagation of the event
				// and set the material name as the hoveredElement
			>
				{meshList.map((meshObject: MeshObject) => {
					return (
						<mesh
							name={meshObject.name}
							visible={invisibleMesh !== null && invisibleMesh === meshObject.name ? false : true}
							material={meshObject.material}
							// geometry={meshObject.geometry}
							// material-color={hoveredMesh === meshObject.name ? hoverColor : meshObject.color}
							// material-transparent={true}
							// visible={meshObject.isVisible}
							// material-visible={invisibleMesh !== null && invisibleMesh === meshObject.name ? false : true}
							// material-opacity={
							// 	selectedMesh !== null && selectedMesh !== meshObject.name ? opacityValue : meshObject.opacity
							// }

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
								color={hoveredMesh === meshObject.name ? hoverColor : meshObject.color}
								transparent
								visible={invisibleMesh !== null && invisibleMesh === meshObject.name ? false : true}
								opacity={
									selectedMeshes.length > 0 && !selectedMeshes.includes(meshObject.name)
										? opacityValue
										: meshObject.opacity
								}
							/>
							{/* {selectedMesh !== null && selectedMesh !== meshObject.name ? (
							''
						) : ( */}
							<lineSegments renderOrder={100} name={meshObject.name}>
								<edgesGeometry attach='geometry' args={[meshObject.geometry]} />
								{/* Due limitations of OpenGL Core Profile with WebGL renderer on most platforms linewidth will always be 1 regardless of set value.  */}
								<lineBasicMaterial
									color='black'
									attach='material'
									transparent
									opacity={
										selectedMeshes.length > 0 && !selectedMeshes.includes(meshObject.name)
											? opacityValueOutline
											: meshObject.opacity
									}
								/>
							</lineSegments>
							{/* )} */}
						</mesh>
					);
				})}
			</group>
		</Center>
	);
};

export default Model;

useGLTF.preload('/house-model.glb');
