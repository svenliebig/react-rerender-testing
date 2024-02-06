import React, { FC, ReactNode, createContext, memo, useContext, useReducer, useState } from "react";
import { Input } from "./components/Input";
import { List } from "./components/List";
import { Rendered } from "./components/Rendered";
import { renderer } from "./utils/renderer";

// Layout
export const Reducer = memo(() => {
	renderer.reset();

	return (
		<div className="border">
			<h2>Layout (rendered {renderer.render("Layout")} times)</h2>
			<Provider>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", columnGap: ".5rem" }}>
					<Dogs />
					<Cats />
					<Snakes />
					<Mices />
				</div>
			</Provider>
		</div>
	);
});

type Animals = {
	dogs: string[];
	cats: string[];
	snakes: string[];
	mices: string[];
};

type ActionType = "dog" | "cat" | "snake" | "mice";

type Action = {
	type: ActionType;
	name: string;
};

function animalReducer(animals: Animals, action: Action) {
	switch (action.type) {
		case "dog":
			return { ...animals, dogs: [...animals.dogs, action.name] };
		case "cat":
			return { ...animals, cats: [...animals.cats, action.name] };
		case "snake":
			return { ...animals, snakes: [...animals.snakes, action.name] };
		case "mice":
			return { ...animals, mices: [...animals.mices, action.name] };
	}
}

const AnimalContext = createContext<Animals>({} as any);
const DispatchContext = createContext<React.Dispatch<Action>>(null as any);

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
	const [animals, dispatch] = useReducer(animalReducer, { dogs: [], cats: [], snakes: [], mices: [] });

	return (
		<section className="border">
			<h3>
				<Rendered name="Provider" />
			</h3>
			<AnimalContext.Provider value={animals}>
				<DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
			</AnimalContext.Provider>
		</section>
	);
};

function Dogs() {
	const [value, setValue] = useState("Dog");
	const { dogs } = useContext(AnimalContext);
	const dispatch = useContext(DispatchContext);

	return (
		<section className="border grid rg-2">
			<h4>
				<Rendered name="Dogs" />
			</h4>
			<List items={dogs} />
			<Input label="Name" onChange={setValue} value={value} />
			<button onClick={() => dispatch({ name: value, type: "dog" })}>Add</button>
		</section>
	);
}

function Snakes() {
	const [value, setValue] = useState("Snake");
	const { snakes } = useContext(AnimalContext);
	const dispatch = useContext(DispatchContext);

	return (
		<section className="border grid rg-2">
			<h4>
				<Rendered name="Snakes" />
			</h4>
			<List items={snakes} />
			<Input label="Name" onChange={setValue} value={value} />
			<button onClick={() => dispatch({ name: value, type: "snake" })}>Add</button>
		</section>
	);
}

function Mices() {
	const [value, setValue] = useState("Mice");
	const { mices } = useContext(AnimalContext);
	const dispatch = useContext(DispatchContext);

	return (
		<section className="border grid rg-2">
			<h4>
				<Rendered name="Mices" />
			</h4>
			<List items={mices} />
			<Input label="Name" onChange={setValue} value={value} />
			<button onClick={() => dispatch({ name: value, type: "mice" })}>Add</button>
		</section>
	);
}

// I guess this is the best I can offer for this
function withContext<T extends Record<string, unknown>, K extends keyof T, P extends Record<K, T[K]>>(
	context: React.Context<T>,
	properties: Array<K>,
	fn: FC<P>
) {
	const C = memo(fn as FC<Record<K, T[K]>>);

	return () => {
		const ctx = useContext(context);

		const props = properties.reduce((acc, property) => {
			acc[property] = ctx[property];
			return acc;
		}, {} as Record<K, T[K]>);

		return (
			<section className="border grid">
				<h4>
					<Rendered name={`withContext([${properties.join(", ")}], ${fn.name})`} />
				</h4>
				<C {...props} />
			</section>
		);
	};
}

const Cats = withContext(AnimalContext, ["cats"], _Cats);

function _Cats({ cats, className }: { cats: Array<string>; className: string }) {
	const [value, setValue] = useState("Cat");
	const dispatch = useContext(DispatchContext);

	return (
		<section className="border grid rg-2">
			<h4>
				<Rendered name="Cats" />
			</h4>
			<List items={cats} />
			<Input label="Name" onChange={setValue} value={value} />
			<button onClick={() => dispatch({ name: value, type: "cat" })}>Add</button>
		</section>
	);
}
