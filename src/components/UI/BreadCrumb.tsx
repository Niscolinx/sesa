import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { BiChevronRight } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'

function BreadCrumb() {
    const breadcrumbs = useBreadcrumbs()
    const crumbRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {
        const crumb = crumbRef.current
        if (crumb) {
            console.log({crumb})
            const crumbText = crumb.textContent
            console.log({crumbText})
            let showCrumb = crumbText?.replace(/\/\w+/, '')

            console.log({showCrumb})
        }
    }, [crumbRef.current])

    return (
        <div className='flex gap-4 mb-[2rem]'>
            {breadcrumbs.map(({ match, breadcrumb }, i) => {
                const isParams = Object.keys(match.params)
                const showBreadCrumb = i > 1 && isParams.length < 1

           
                if (showBreadCrumb) {

                    return (
                        <p
                            className='flex items-center gap-2'
                            key={match.pathname}
                            ref={crumbRef}
                        >
                            <NavLink to={match.pathname} >{breadcrumb}</NavLink>

                            <span>
                                <BiChevronRight />
                            </span>
                        </p>
                    )
                }
            })}
        </div>
    )
}

export default BreadCrumb
