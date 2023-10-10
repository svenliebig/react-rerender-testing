import { FC, ReactNode, createContext, memo, useContext, useState } from "react";

const renderer: any = {
	render(n: string) {
		if (renderer[n]) {
			return ++renderer[n];
		} else {
			return (renderer[n] = 1);
		}
	},
	reset: () => {
		renderer.dog = 0;
	},
};

type Context = {
	addDog: (name: string) => void;
	addCat: (name: string) => void;
	addSnake: (name: string) => void;
	dogs: string[];
	cats: string[];
	snakes: string[];
};

const ctx = createContext<Context>({} as any);

// Layout
export const ComplexProvider = memo(() => {
	renderer.reset();

	return (
		<div className="border">
			<h2>Layout (rendered {renderer.render("Layout")} times)</h2>
			<Provider>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", columnGap: ".5rem" }}>
					<Dogs />
					<Cats />
					<Snakes />
				</div>
			</Provider>
		</div>
	);
});

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
	const [dogs, setDogs] = useState<Array<string>>([]);
	const [cats, setCats] = useState<Array<string>>([]);
	const [snakes, setSnakes] = useState<Array<string>>([]);

	const addDog = (name: string) => {
		setDogs((dogs) => [...dogs, name]);
	};

	const addCat = (name: string) => {
		setCats((cats) => [...cats, name]);
	};

	const addSnake = (name: string) => {
		setSnakes((cats) => [...cats, name]);
	};

	return (
		<ctx.Provider value={{ dogs, cats, snakes, addDog, addCat, addSnake }}>
			<section className="border">
				<h3>Provider (rendered {renderer.render(Provider.name)} times)</h3>
				{children}
			</section>
		</ctx.Provider>
	);
};

function Dogs() {
	const [value, setValue] = useState("");
	const { addDog, dogs } = useContext(ctx);

	return (
		<section className="border grid rg-2">
			<h4>Dogs (rendered {renderer.render(Dogs.name)} times)</h4>
			<ul>
				{dogs.map((dog, i) => (
					<li key={i}>{dog}</li>
				))}
			</ul>
			<label>
				Name
				<input type="text" value={value} onChange={({ target }) => setValue(target.value)} />
			</label>
			<button onClick={() => addDog(value)}>Add</button>
		</section>
	);
}

function Cats() {
	const [value, setValue] = useState("");
	const { addCat, cats } = useContext(ctx);

	return (
		<section className="border grid rg-2">
			<h4>Cats (rendered {renderer.render(Cats.name)} times)</h4>
			<ul>
				{cats.map((dog, i) => (
					<li key={i}>{dog}</li>
				))}
			</ul>
			<label>
				Name
				<input type="text" value={value} onChange={({ target }) => setValue(target.value)} />
			</label>
			<button onClick={() => addCat(value)}>Add</button>
		</section>
	);
}

function Snakes() {
	const [value, setValue] = useState("");
	const { addSnake, snakes } = useContext(ctx);

	return (
		<section className="border grid rg-2">
			<h4>Snakes (rendered {renderer.render(Snakes.name)} times)</h4>
			<ul>
				{snakes.map((dog, i) => (
					<li key={i}>{dog}</li>
				))}
			</ul>
			<label>
				Name
				<input type="text" value={value} onChange={({ target }) => setValue(target.value)} />
			</label>
			<button onClick={() => addSnake(value)}>Add</button>
		</section>
	);
}
