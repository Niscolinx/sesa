import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

function BreadCrumb() {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className='flex gap-4'>
            {breadcrumbs.map(({ match, breadcrumb, location }, i) => {
                console.log({ match, breadcrumb })
                console.log(
                    'bread length, i',
                    i,
                    breadcrumbs.length,
                    i,
                    match.params
                )
                if (i > 1 && Object.keys(match.params).length < 1)
                    return (
                        <NavLink key={match.pathname} to={match.pathname}>
                            {breadcrumb}
                        </NavLink>
                    )
            })}
        </div>
    )
}

export default BreadCrumb
