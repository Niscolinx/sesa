import { Link } from 'react-router-dom'
import EstatesSvg from './sidebar/EstatesSvg'
import MessagesSvg from './sidebar/MessagesSvg'
import OverviewSvg from './sidebar/overviewSvg'
import SecurityCompSvg from './sidebar/SecurityCompSvg'
import SettingsSvg from './sidebar/SettingsSvg'
import WalletSvg from './sidebar/WalletSvg'

function IconsBox() {
    return (
        <ul className='iconsBox'>
            <li className='iconsBox__list'>
                <Link to='/securityCompany'>
                    <OverviewSvg />
                    <span>Overview</span>
                </Link>
            </li>

            <li className='iconsBox__list'>
                <Link to='/securityCompany/estates' className='fillIcon'>
                    <EstatesSvg />
                    <span>Estates</span>
                </Link>
            </li>

            <li className='iconsBox__list'>
                <Link to='/securityCompany/security-guard' className='fillIcon'>
                    {' '}
                    <SecurityCompSvg />
                    <span>Security Guard</span>
                </Link>
            </li>
            <li className='iconsBox__list'>
                <Link to='/securityCompany/wallet' className='fillIcon'>
                    {' '}
                    <WalletSvg />
                    <span>Wallet</span>
                </Link>
            </li>
            <li className='iconsBox__list'>
                <Link to='/securityCompany/messages' className=''>
                    {' '}
                    <MessagesSvg />
                    <span>Messages</span>
                </Link>
            </li>

            <li className='iconsBox__list'>
                <Link to='/securityCompany/settings' className='fillIcon'>
                    <SettingsSvg />
                    <span>Platform Settings</span>
                </Link>
            </li>
        </ul>
    )
}

export default IconsBox
