import { BsBellFill } from 'react-icons/bs'
import { GrDown, GrUp } from 'react-icons/gr'

type THeader = {
    fullName: string
    role: string
    imgUrl: string
}

function Header({ fullName, role, imgUrl }: THeader) {
    const getDate = () => {
        const newDate = new Date()

        const date = newDate.toLocaleString('en-GB', { dateStyle: 'full' })

        return date
    }

    const dateString = getDate()

    getDate()

    const handleDropdown = () => {
        
    }
    return (
        <div className='header shadow'>
            <div className='header__left'>{dateString}</div>
            <div className='header__right'>
                <div className='header__right--icon'>
                    <span>&nbsp;</span>
                    <BsBellFill />
                </div>

                <figure className='header__profile'>
                    <img src={imgUrl} alt='' />
                    <div className='header__profile--details'>
                        <div>
                            <h2>{fullName}</h2>
                            <p>{role}</p>
                        </div>

                        <GrUp onClick={handleDropdown}/>
                    </div>
                </figure>
            </div>
        </div>
    )
}

export default Header
