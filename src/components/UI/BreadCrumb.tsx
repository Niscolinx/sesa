import { NavLink, useNavigate } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { BiChevronRight } from 'react-icons/bi'
import { useLocation, useParams } from 'react-router'

function BreadCrumb() {
    const navigate = useNavigate()
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
            {breadcrumbs.map(({ match, breadcrumb }, i) => {
                //  const isParams = Object.keys(match.params)

                const eachParam = Object.keys(match.params)

                // console.log({ eachParam }, 'lower', eachParam.length, params.id)


                const showBreadCrumb = i > 1 && eachParam.length < 1

                if (showBreadCrumb) {
                    const isParams = Object.keys(params)


                    const showPath = isParams.length > 0 ? location.pathname : null

                    console.log(isParams.length)


                    //To do not anything when the particular id is being clicked
                    

                    return (
                        <p
                            className='flex items-center gap-2'
                            key={match.pathname}
                           
                        >
                            {/* {isParams.length > 0} */}
                            <NavLink
                                to={isParams.length > 0 ? '#': match.pathname}
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
                         {/* <span>{breadcrumb}</span> */}
                            {i !== index && eachParam.length < 1 && (
                                <span>
                                    <BiChevronRight />
                                </span>
                            )}
                        </p>
                    )
                }
            })}
        </div>
    )
}

export default BreadCrumb
