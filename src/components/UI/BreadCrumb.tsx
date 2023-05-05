import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { BiChevronRight } from 'react-icons/bi'
import { useLocation, useParams } from 'react-router'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

function BreadCrumb() {
    const location = useLocation()
    const params = useParams()
    const breadcrumbs = useBreadcrumbs()

    const isParams = Object.keys(params)

    const getIndex = () => {
        const path = location.pathname.split('/')
        if (isParams.length < 1) {
            return path.length - 1
        } else {
            return path.length - 2
        }
    }

    const index = getIndex()

    return (
        <div className='flex gap-4 mb-[2rem]'>
            <MdOutlineKeyboardBackspace className='w-[5rem]' />

            {/* {breadcrumbs.map(({ match, breadcrumb }, i) => {

                const eachParam = Object.keys(match.params)

                const showBreadCrumb = i > 1 && eachParam.length < 1

                if (showBreadCrumb) {

                    

                    return (
                        <p
                            className='flex items-center gap-2'
                            key={match.pathname}
                           
                        >
                            <NavLink
                                to={isParams.length > 0 && index === i ? '#': match.pathname}
                                className={
                                    index === i
                                        ? 'text-color-blue-1'
                                        : 'text-color-gray-1'
                                }
                            >
                                <span>
                                    { breadcrumb}
                                </span> 
                            </NavLink>
                            {i !== index && eachParam.length < 1 && (
                                <span>
                                    <BiChevronRight />
                                </span>
                            )}
                        </p>
                    )

                   
                }
            })} */}
        </div>
    )
}

export default BreadCrumb
