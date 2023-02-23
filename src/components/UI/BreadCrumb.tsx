import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { BiChevronRight } from 'react-icons/bi'

function BreadCrumb() {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className='flex gap-4 mb-[2rem]'>
            {breadcrumbs.map(({ match, breadcrumb }, i) => {
                console.log({ i }, breadcrumbs.length - 2)
                const isParams = Object.keys(match.params)
                const showBreadCrumb = i > 1 && isParams.length < 1
                const showArrow = isParams.length
                    ? i < breadcrumbs.length - 2
                    : i < breadcrumbs.length - 1

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
