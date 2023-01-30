import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddSecurityCompany from '../../components/securityCompany/AddSecurityCompany'
import RenderSecurityCompanies from '../../components/securityCompany/RenderedsecurityCompanies'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { routeChangeSelector, setEstatePath } from '../../store/features/routeChange'


function SecurityCompany() {
    const dispatch = useAppDispatch()
    const { securityCompanyPath } = useAppSelector(routeChangeSelector)

    const [securityCompanies, setSecurityCompanies] = useState(false)

   

    const switchRoute = {
        renderedSecurityCompanies: <RenderSecurityCompanies />,
        addSecurityCompany: <AddSecurityCompany />,
    }

    const addSecurityCompanyHandler = () => {
        setSecurityCompanies(true)
        dispatch(setEstatePath('renderedEstates'))
    }

    return (
        <div className='estates'>
            <h1 className='heading2'>Security Company</h1>
            <div className='estates__container'>
                {securityCompanies ? (
                    <section>{switchRoute[securityCompanyPath]}</section>
                ) : (
                    <section className='estates__wrapper bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any security Company yet
                        </p>
                        <button
                            className='btn addEstate__btn'
                            onClick={addSecurityCompanyHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Company
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default SecurityCompany
