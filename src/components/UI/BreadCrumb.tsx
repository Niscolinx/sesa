import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { BiChevronRight } from 'react-icons/bi'

function BreadCrumb() {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className='flex gap-4 mb-[2rem]'>
            {breadcrumbs.map(({ match, breadcrumb, location }, i) => {
                if (i > 1 && Object.keys(match.params).length < 1)
                    return (
                        <p className='flex items-center gap-2'>
                            <NavLink key={match.pathname} to={match.pathname}>
                                {breadcrumb}
                            </NavLink>
                            <span>
                                <BiChevronRight />
                            </span>
                        </p>
                    )
            })}
        </div>
    )
}

export default BreadCrumb
