import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { BiChevronRight } from 'react-icons/bi'
import { useState } from 'react'

function BreadCrumb() {
    const breadcrumbs = useBreadcrumbs()

    const getIndex = (index: number) => {
       const id =  setTimeout(() => {
            console.log({ index })
        }, 0)

        return () => clearTimeout(id)
    }

    return (
        <div className='flex gap-4 mb-[2rem]'>
            {breadcrumbs.map(({ match, breadcrumb }, i) => {
                const isParams = Object.keys(match.params)
                const showBreadCrumb = i > 1 && isParams.length < 1
                const showArrow =
                    isParams.length < 1
                        ? i < breadcrumbs.length - 2
                        : i < breadcrumbs.length - 1

                const isActive = i === breadcrumbs.length - 1
                // console.log(
                //     '=====',
                //     i,
                //     breadcrumbs.length - 1,
                //     { isActive },
                //     { breadcrumb },
                //     'parmas--->',
                //     isParams.length < 1
                // )

                if (showBreadCrumb) {
                    console.log({ i }, '======', breadcrumb)
                    getIndex(i)
                    return (
                        <p
                            className='flex items-center gap-2'
                            key={match.pathname}
                        >
                            <NavLink to={match.pathname}>{breadcrumb}</NavLink>

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
