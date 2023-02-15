import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderSecurityCompanies from '../../../components/SuperAdmin/securityCompany/RenderedSecurityCompanies'
import { useNavigate } from 'react-router'

function SecurityCompany() {
    const navigate = useNavigate()

    const [securityCompanies, setSecurityCompanies] = useState(false)

    const addSecurityCompanyHandler = () => {
        setSecurityCompanies(true)

        navigate('/superAdmin/security-company/add')
    }

    return (
        <div>
            <h1 className='heading2'>Security Company</h1>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {!securityCompanies ? (
                    <section>
                        <RenderSecurityCompanies />
                    </section>
                ) : (
                    <section className='estates__wrapper bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any security Company yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
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
