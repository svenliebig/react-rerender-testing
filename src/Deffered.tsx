import React, { useEffect, useRef, useState } from 'react';
import "./App.css"

export function Deffered() {
	const [show, setShow] = useState(false)
	const ref = React.useRef<HTMLDivElement>(null);
	const firstrender = React.useRef<boolean>(true);

	const onTransitionEnd = () => {
		ref.current.style.height = ""
		if (show) {
			ref.current.className = "collapsable show"
		} else {
			ref.current.className = "collapsable"
		}
		console.log("on transition end")
	}

	useEffect(() => {
		console.log("render")
		if (firstrender.current) {
			console.log("render first")
			firstrender.current = false

			if (show) {
				ref.current.className = "collapsable show"
			} else {
				ref.current.className = "collapsable"
			}

			return
		}

		if (show) {
			ref.current.style.height = `0px`
			ref.current.className = `collapsable collapsing show`
			setTimeout(() => ref.current.style.height = `${ref.current.scrollHeight}px`, 0)
		} else {
			ref.current.style.height = `${ref.current.scrollHeight}px`
			ref.current.className = `collapsable collapsing show`
			setTimeout(() => ref.current.style.height = `0px`, 0)
		}
	}, [show])

	return <>
		<div style={{ marginTop: 20 }}>
		<button onClick={() => setShow((v) => !v)}>trigger show: {String(show)}</button>
		<div
			ref={ref}
			onTransitionEnd={() => onTransitionEnd()}
			onTransitionEndCapture={() => console.log("on transition end capture")} 
			className='border collapsable'
		>
				Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</div>
	</div>
	</>
}

