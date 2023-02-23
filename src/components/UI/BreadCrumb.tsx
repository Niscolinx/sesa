import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { BiChevronRight } from 'react-icons/bi'

function BreadCrumb() {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className='flex gap-4 mb-[2rem]'>
            {breadcrumbs.map(({ match, breadcrumb }, i) => {
                console.log({i},  breadcrumbs.length - 2)

                const showBreadCrumb = i > 1 && Object.keys(match.params).length < 1
                const showArrow = i < breadcrumbs.length - 2

                if (showBreadCrumb)
                    return (
                        <p
                            className='flex items-center gap-2'
                            key={match.pathname}
                        >
                            <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                            {showArrow && (
                                <span>
                                    <BiChevronRight />
                                </span>
                            )}
                        </p>
                    )
            })}
        </div>
    )
}

export default BreadCrumb
