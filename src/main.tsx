import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { WithProvider } from './WithProvider'
import { WithUseState } from './WithUseState'
import { WithUseStateSolution } from './WithUseStateSolution'


// I removed strict mode
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <WithUseStateSolution />
)
