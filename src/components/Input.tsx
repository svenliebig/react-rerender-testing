export function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
	return (
		<label>
			{label}
			<input
				style={{ marginLeft: ".2rem" }}
				type="text"
				value={value}
				onChange={({ target }) => onChange(target.value)}
			/>
		</label>
	);
}
