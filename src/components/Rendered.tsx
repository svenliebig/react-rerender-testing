import { renderer } from "../utils/renderer";

export function Rendered({ name }: { name: string }) {
	return (
		<>
			{name} (rendered {renderer.render(name)} times)
		</>
	);
}
