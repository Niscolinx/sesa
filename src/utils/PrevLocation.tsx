import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

function PrevLocation() {
    // const location = useLocation()
    // const prevPathRef = useRef(location.pathname)
    // const [previousPath, setPreviousPath] = useState(prevPathRef.current)

    // useEffect(() => {
    //     if (location.pathname !== prevPathRef.current) {
    //       console.log({location, prevPathRef})
    //         setPreviousPath(prevPathRef.current)
    //         prevPathRef.current = location.pathname
    //     }
    // }, [location.pathname])

    // return {previousPath}

    const breadcrumbs = useBreadcrumbs()

    breadcrumbs.map(({ match, breadcrumb, ...others }, i) => {
        console.log({ match, breadcrumb, others })
        const eachParam = Object.keys(match.params)

        console.log({ eachParam })
    })
}

export default PrevLocation
