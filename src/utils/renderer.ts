export const renderer: any = {
	render(n: string) {
		if (renderer[n]) {
			return ++renderer[n];
		} else {
			return (renderer[n] = 1);
		}
	},
	reset: () => {
		const key = Object.keys(renderer);
		for (let i = 0; i < key.length; i++) {
			if (typeof renderer[key[i]] === "number") {
				renderer[key[i]] = 0;
			}
		}
	},
};
