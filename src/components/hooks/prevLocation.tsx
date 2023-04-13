import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function PrevLocation() {
    const location = useLocation()
     localStorage.setItem('prevPath', location.pathname)
     const prevPathRef = localStorage.getItem('prevPath')
     
    

    
}

export default PrevLocation