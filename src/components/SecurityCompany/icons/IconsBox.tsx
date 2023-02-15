import { Link } from 'react-router-dom';

import AdditionalResidentSvg from './sidebar/AdditionalResidentSvg';
import AdminsSvg from './sidebar/AdminsSvg';
import AdvertSvg from './sidebar/AdvertSvg';
import ArtisanSvg from './sidebar/ArtisanSvg';
import EstateManagerSvg from './sidebar/EstateManagerSvg';
import EstatesSvg from './sidebar/EstatesSvg';
import OverviewSvg from './sidebar/overviewSvg';
import RolesAndPermSvg from './sidebar/RolesAndPermSvg';
import SecurityCompSvg from './sidebar/SecurityCompSvg';
import SettingsSvg from './sidebar/SettingsSvg';
import WalletSvg from './sidebar/WalletSvg';

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
              <Link to='/securityCompany/security-company' className='fillIcon'>
                  {' '}
                  <SecurityCompSvg />
                  <span>Security Company</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/securityCompany/messages' className='fillIcon'>
                  {' '}
                  <SecurityCompSvg />
                  <span>Messages</span>
              </Link>
          </li>
          
          <li className='iconsBox__list'>
              <Link to='/securityCompany/platformSettings' className='fillIcon'>
                  <SettingsSvg />
                  <span>Platform Settings</span>
              </Link>
          </li>
      </ul>
  )
}

export default IconsBox;
