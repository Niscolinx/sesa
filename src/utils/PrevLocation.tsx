import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

function PrevLocation() {

  const location = useLocation()
  const prevPathRef = useRef(location.pathname)
  const [previousPath, setPreviousPath] = useState(prevPathRef.current)

  useEffect(() => {
      if (location.pathname !== prevPathRef.current) {
        console.log({location, prevPathRef})
          setPreviousPath(prevPathRef.current)
          prevPathRef.current = location.pathname
      }
  }, [location.pathname])

  return {previousPath}
}

export default PrevLocation