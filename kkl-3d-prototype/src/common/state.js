// update: useProxy seems not to work anymore
import { proxy } from 'valtio';

// wrap whole state into a proxy
export const state = proxy({
	// current chosen part of the 3D object
	current: null,
	selected: null,
	items: {
		// all parts of the 3D object in items array
		windows: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'windows',
			name: 'Windows',
		},
		outer_walls: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'outer_walls',
			name: 'Outer Walls',
		},
		stairs: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'stairs',
			name: 'Stairs',
		},
		fence: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'fence',
			name: 'Fence',
		},
		balcony: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'balcony',
			name: 'Balcony',
		},
		doors: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'doors',
			name: 'Doors',
		},
		roof: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'roof',
			name: 'Roof',
		},
		floor: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'floor',
			name: 'Floor',
		},
		inner_walls: {
			color: '#ffffff',
			opacity: 1,
			meshName: 'inner_walls',
			name: 'Inner_Walls',
		},
	},
});
