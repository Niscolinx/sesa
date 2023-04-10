import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderSecurityCompanies from './RenderedSecurityCompanies'
import { useNavigate } from 'react-router'

function SecurityCompany() {
    const navigate = useNavigate()

    const [securityCompanies, setSecurityCompanies] = useState(false)

    const addSecurityCompanyHandler = () => {
        setSecurityCompanies(true)

        navigate('/superAdmin/security-company/add')
    }

    return (
       
        </div>
    )
}

export default SecurityCompany
