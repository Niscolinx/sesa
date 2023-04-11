import React from 'react'
import OverviewCard from './OverviewCard'

const OverviewCards = () => {
    return (
        <div className='overviewCards'>
            <OverviewCard
                title='Residents'
                number={18_000}
                iconUrl='icons/overview/residents.svg'
                bgColor='bg-[#DDFCDC]'
                textColor='text-[#1A8F56]'
            />
            <OverviewCard
                title='Security Guards'
                number={25}
                iconUrl='icons/overview/securityGuards.svg'
                bgColor='bg-[#F6FAFD]'
                textColor='text-[#3297EF]'
            />
            <OverviewCard
                title='Artisans'
                number={5_000}
                iconUrl='icons/overview/artisans.svg'
                bgColor='bg-[#FDF7F2]'
                textColor='text-[#B65800]'
            />
            <OverviewCard
                title='Site Workers'
                number={44}
                iconUrl='icons/overview/siteWorkers.svg'
                bgColor='bg-[#F8F5FC]'
                textColor='text-[#9545F8]'
            />
            <OverviewCard
                title='Adverts'
                number={4}
                iconUrl='/icons/overview/advert.svg'
                bgColor='bg-[#EFFFEC]'
                textColor='text-[#33F110]'
            />
            <OverviewCard
                title='Estate Workers'
                number={40}
                iconUrl='icons/overview/estateWorkers.svg'
                bgColor='bg-[#F8F9FD]'
                textColor='text-[#0012B6]'
            />
            <OverviewCard
                title='Household'
                number={4}
                iconUrl='icons/overview/household.svg'
                bgColor='bg-[#F8FBFC]'
                textColor='text-[#00C2FF]'
            />
            <OverviewCard
                title='Security Company'
                number={40}
                iconUrl='icons/overview/securityCompany.svg'
                bgColor='bg-[#FCF3FA]'
                textColor='text-[#B6008E]'
            />
            <OverviewCard
                title='Accounts Opened'
                number={15}
                iconUrl='icons/overview/accountsOpened.svg'
                bgColor='bg-[#F2F2FD]'
                textColor='text-[#4E4DA4]'
            />
            <OverviewCard
                title='No. of Messages Sent'
                number={40}
                iconUrl='icons/overview/sentMessages.svg'
                bgColor='bg-[#F6FCF9]'
                textColor='text-[#4FE3A5]'
            />
            <OverviewCard
                title='No. of Panic Alerts'
                number={40}
                iconUrl='icons/overview/panicAlerts.svg'
                bgColor='bg-[#FFF4F4]'
                textColor='text-[#FF2B2B]'
            />
        </div>
    )
}

export default OverviewCards
