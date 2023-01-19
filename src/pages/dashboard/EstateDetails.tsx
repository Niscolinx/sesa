import { Link } from 'react-router-dom'
import OverviewCard from '../../components/overview/OverviewCard'

function Estates() {
    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Estate Details</h1>
            <div className='estateDetail__container'>
                <section>
                    <div className='flex'>
                        <p>Iba Housing Estate</p>
                        <p>
                            Joined: <span>08 May, 2022</span>
                        </p>
                    </div>
                    <div className='overview flex'>
                        <OverviewCard
                            title='Residents'
                            number={18_000}
                            iconUrl='/icons/overview/residents.svg'
                            bgColor='bg-[#DDFCDC]'
                            textColor='text-[#1A8F56]'
                        />
                        <OverviewCard
                            title='Property'
                            number={4}
                            iconUrl='/icons/overview/property.svg'
                            bgColor='bg-[#F5F9FA]'
                            textColor='text-[#00C2FF]'
                        />
                        <OverviewCard
                            title='Household'
                            number={40}
                            iconUrl='/icons/overview/household2.svg'
                            bgColor='bg-[#FCF3FA]'
                            textColor='text-[#B6008E]'
                        />
                    </div>
                    <div>
                        <Link to='/' className='text-[#0660FE]'>
                            View Estate Report
                        </Link>
                    </div>
                </section>
                <section></section>
            </div>
        </div>
    )
}

export default Estates
