import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function PrevLocation() {
    const location = useLocation()
    const storePath = localStorage.getItem('prevPath')
    const prevPath =
        storePath ?? localStorage.setItem('prevPath', location.pathname)

    const [prevLocation, setPrevLocation] = useState<string | void>('')

    useEffect(() => {
        if (prevPath !== location.pathname) {
            setPrevLocation(prevPath)
            localStorage.setItem('prevPath', location.pathname)
        }
    }, [location])

    return { prevLocation }
}

export default PrevLocation
