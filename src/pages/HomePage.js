import React, { Suspense } from 'react'
import { Boubles } from '../components/THREE/Boubles'

export const HomePage = () => {
    return (
        <div className="Home bg-1">
            <h1 className="Home__title">Welcome</h1>
            <Suspense fallback={null}>
                <Boubles />
            </Suspense>
        </div>
    )
}
