import { memo, ReactNpnpx create vite@latest ode, useCallback, useState } from 'react'
import './App.css'
import { Total } from './utils/total';

// All children get rerendered because the parent state changed

const renders = {
    container: 0,
    top: 0,
    middle: 0,
    bottom: 0,
}

export function WithUseState() {
    renders.container++;

    const [count, setCount] = useState(0)
    const onClick = useCallback(() => setCount((count) => {
        return count + 1
    }), [])

    return <>
        <button onClick={onClick}>count {count}</button>
        <p>Container {renders.container}</p>
        <Top>
            <Middle />
        </Top>

        <Total r={renders} />
    </>
}

function Top({ children }: { children: ReactNode }) {
    renders.top++

    return (
        <>
            <p>Top {renders.top}</p>
            {children}
        </>
    )
}

// we can remove the rerenders with React.memo
// but we will add the calculation that the momoize function gives
const Middle = () => {
    renders.middle++;

    return <>
        <p>Middle {renders.middle}</p>
        <Bottom />
    </>
}

const Bottom = () => {
    renders.bottom++
    return <p>Bottom {renders.bottom}</p>
}

