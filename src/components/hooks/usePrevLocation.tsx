import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function PrevLocation() {
    console.log('sd')
    const location = useLocation()
    const storePath = localStorage.getItem('prevPath')
    const prevPath =
        storePath ?? localStorage.setItem('prevPath', location.pathname)

    const [prevLocation, setPrevLocation] = useState<string>('')

    useEffect(() => {
        if (prevPath && prevPath !== location.pathname) {
            setPrevLocation(prevPath)
            localStorage.setItem('prevPath', location.pathname)
        }
    }, [location])

    return { prevLocation }
}

export default PrevLocation
