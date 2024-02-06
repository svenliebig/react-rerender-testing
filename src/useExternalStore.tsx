const listeners: Array<() => void> = [];

const animalsStore = {
	animals: [],
	subscribe: (listener: () => void) => {
		listeners.push(listener);
		return () => listeners.splice(0, listeners.length, listener);
	},
	setAnimals: (animals) => {
		animalsStore.animals = animals;
		listeners.forEach((listener) => listener());
	},
};
