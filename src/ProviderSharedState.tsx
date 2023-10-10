import { FC, ReactNode, createContext, memo, useCallback, useContext, useMemo, useState } from "react";
import { renderer } from "./utils/renderer";
import { List } from "./components/List";
import { Rendered } from "./components/Rendered";
import { Input } from "./components/Input";

// Layout
export const ComplexProvider = memo(() => {
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

type Context = {
	addDog: (name: string) => void;
	addCat: (name: string) => void;
	addSnake: (name: string) => void;
	addMice: (name: string) => void;
	dogs: string[];
	cats: string[];
	snakes: string[];
	mices: string[];
};

const ctx = createContext<Context>({} as any);

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
	const [dogs, setDogs] = useState<Array<string>>([]);
	const [cats, setCats] = useState<Array<string>>([]);
	const [snakes, setSnakes] = useState<Array<string>>([]);
	const [mices, setMices] = useState<Array<string>>([]);

	const addDog = (name: string) => {
		setDogs((dogs) => [...dogs, name]);
	};

	const addCat = useCallback((name: string) => {
		setCats((cats) => [...cats, name]);
	}, []);

	const addSnake = (name: string) => {
		setSnakes((cats) => [...cats, name]);
	};

	const addMice = useCallback((name: string) => {
		setMices((cats) => [...cats, name]);
	}, []);

	return (
		<section className="border">
			<h3>Provider (rendered {renderer.render(Provider.name)} times)</h3>
			<ctx.Provider value={{ dogs, cats, snakes, addDog, addCat, addSnake, mices, addMice }}>
				<SnakeProvider>
					<MiceProvider addMice={addMice} mices={mices}>
						{children}
					</MiceProvider>
				</SnakeProvider>
			</ctx.Provider>
		</section>
	);
};

const snakeContext = createContext<{ snakes: string[]; addSnake: (name: string) => void }>({} as any);

function useSnakeContext() {
	return useContext(snakeContext);
}

function SnakeProvider({ children }: { children: ReactNode }) {
	const { addSnake, snakes } = useContext(ctx);
	const value = useMemo(() => ({ snakes, addSnake }), [snakes, addSnake]);
	return (
		<div className="border grid">
			<h4>SnakeProvider (rendered {renderer.render("SnakeProvider")} times)</h4>
			<snakeContext.Provider value={value}>{children}</snakeContext.Provider>
		</div>
	);
}

const miceContext = createContext<{ mices: string[]; addMice: (name: string) => void }>({} as any);

function useMiceContext() {
	return useContext(miceContext);
}

const MiceProvider = memo(
	({ children, mices, addMice }: { children: ReactNode; mices: string[]; addMice: (name: string) => void }) => {
		return (
			<div className="border grid">
				<h4>MiceProvider (rendered {renderer.render("MiceProvider")} times)</h4>
				<miceContext.Provider value={{ mices, addMice }}>{children}</miceContext.Provider>
			</div>
		);
	}
);

function Dogs() {
	const [value, setValue] = useState("Dog");
	const { addDog, dogs } = useContext(ctx);

	return (
		<section className="border grid rg-2">
			<h4>
				<Rendered name="Dogs" />
			</h4>
			<List items={dogs} />
			<Input label="Name" onChange={setValue} value={value} />
			<button onClick={() => addDog(value)}>Add</button>
		</section>
	);
}

function withCatContext(Fn: FC<{ cats: string[]; addCat: (name: string) => void }>) {
	const C = memo(Fn);

	return () => {
		const { cats, addCat } = useContext(ctx);

		return (
			<section className="border grid">
				<h4>withCatContext (rendered {renderer.render("WithCatContext")} times)</h4>
				<C cats={cats} addCat={addCat} />
			</section>
		);
	};
}

const Cats = withCatContext(({ addCat, cats }) => {
	const [value, setValue] = useState("Cat");

	return (
		<section className="border grid rg-2">
			<h4>
				<Rendered name="Cats" />
			</h4>
			<List items={cats} />
			<Input label="Name" onChange={setValue} value={value} />
			<button onClick={() => addCat(value)}>Add</button>
		</section>
	);
});

function Snakes() {
	const [value, setValue] = useState("Snake");
	const { addSnake, snakes } = useSnakeContext();

	return (
		<section className="border grid rg-2">
			<h4>
				<Rendered name="Snakes" />
			</h4>
			<List items={snakes} />
			<Input label="Name" onChange={setValue} value={value} />
			<button onClick={() => addSnake(value)}>Add</button>
		</section>
	);
}

function Mices() {
	const [value, setValue] = useState("Mice");
	const { addMice, mices } = useMiceContext();

	return (
		<section className="border grid rg-2">
			<h4>Mices (rendered {renderer.render(Mices.name)} times)</h4>
			<ul>
				{mices.map((mice, i) => (
					<li key={i}>{mice}</li>
				))}
			</ul>
			<label>
				Name
				<input type="text" value={value} onChange={({ target }) => setValue(target.value)} />
			</label>
			<button onClick={() => addMice(value)}>Add</button>
		</section>
	);
}
