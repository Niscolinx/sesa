import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function PrevLocation() {
    const location = useLocation()
     localStorage.setItem('prevPath', location.pathname)
     const prevPath = localStorage.getItem('prevPath')

     const [prevLocation, setPrevLocation] = useState()
     
    if(prevPath !== location.pathname){

    }

    
}

export default PrevLocation