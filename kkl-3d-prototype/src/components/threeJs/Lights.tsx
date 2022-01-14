const Lights = () => {
	return (
		<>
			{/* 
            Ambient Light: 
            - globally illuminates all objects in scene equally
            - cannot be used to cast shadows as it has no direction
            - intensity influences the color of all objects 
            */}
			<ambientLight intensity={0.2} />
			{/*  
            Directional Light:
            - lights in specific direction
            - behave as it is infinitely far away (produces rays from light are all parallel)
            - common usage: simulate daylight
            */}
			<directionalLight
				castShadow
				position={[0, 10, 0]}
				intensity={4}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>
			{/* 
            Point Light:
            - light from a single point in all directions
            - good for illuminating objects
            - common usage: simulate lightbulb (Glühbirne)
            */}
			<pointLight position={[7, -0.5, 8]} intensity={1.25} />
			<pointLight position={[12, 3, -16]} intensity={1.5} />
			<pointLight position={[-13, 0, 8]} intensity={1.25} />
		</>
	);
};

export default Lights;
