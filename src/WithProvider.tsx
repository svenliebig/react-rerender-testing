
import React, { createContext, memo, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import './App.css'


// All children get rerendered because the parent state changed
//
const c = createContext<{ count: number, set: React.Dispatch<React.SetStateAction<number>> }>({ count: 0, set: () => void 0 })

let topRenders = 0
export function WithProvider() {
    topRenders++

    return (
        <Provider>
            <Counter />
            <div>
                <p>Top {topRenders}</p>
            </div>
            <Middle />

            <Total />
        </Provider>
    )
}

let innerProviderRender = 0
function InnerProvider() {
    innerProviderRender++
    return <p>Inner Provider {innerProviderRender}</p>
}

let providerRenders = 0
function Provider({ children }: { children: ReactNode }) {
    providerRenders++
    const [count, setCount] = useState(0)

    return <c.Provider value={{ count, set: setCount }}>
        <p>Provider {providerRenders}</p>
        <InnerProvider />
        {children}
    </c.Provider>
}

function Total() {
    const [total, setTotal] = useState(0)

    setInterval(() => {
        setTotal(topRenders + middleRenders + bottomRenders + counterRenders + providerRenders)
    }, 50)

    return <p>
        Total: {total}
    </p>
}

let counterRenders = 0
function Counter() {
    counterRenders++
    const { set, count } = useContext(c)
    const onClick = useCallback(() => set((count) => {
        return count + 1
    }), [set])

    return <div>
        <button onClick={onClick}>count {count}</button>
        <p>Counter {counterRenders}</p>
    </div>
}

// we can remove the rerenders with React.memo
// but we will add the calculation that the momoize function gives
let middleRenders = 0
const Middle = () => {
    middleRenders++;
    return <>
        <div>
            <p>Middle {middleRenders}</p>
        </div>
        <Bottom />
    </>
}

let bottomRenders = 0
const Bottom = () => {
    const { count } = useContext(c)
    bottomRenders++;
    return <div>
        <p>Bottom {bottomRenders}</p>
    </div>
}

