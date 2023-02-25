import React from "react"
import { useState } from "react"

export function Total({ r }: { r: Record<string, number> }) {
    const [t, s] = useState(0)

    setInterval(() => {
        s(Object.keys(r).reduce((p, i) => p + r[i], 0))
    }, 100)

    return <p style={{ position: "absolute", bottom: 0 }}>
        Total: {t}
    </p>
}
