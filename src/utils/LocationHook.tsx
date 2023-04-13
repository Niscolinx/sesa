import React from 'react'
import { useLocation } from 'react-router'

function LocationHook() {
  const location = useLocation()
  

  return {location}
}

export default LocationHook