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
              <Link to='/estateManager'>
                  <OverviewSvg />
                  <span>Overview</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/wallet'>
                  {' '}
                  <WalletSvg />
                  <span>Wallet</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/residents' className='fillIcon'>
                  <EstatesSvg />
                  <span>Residents</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/estateManagers' className='fillIcon'>
                  {' '}
                  <EstateManagerSvg />
                  <span>Estate Manager</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/rolesAndPerm'>
                  <RolesAndPermSvg />
                  <span>Roles & Permissions</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/additional-resident'>
                  {' '}
                  <AdditionalResidentSvg />
                  <span>Additional Resident</span>{' '}
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/security-company' className='fillIcon'>
                  {' '}
                  <SecurityCompSvg />
                  <span>Security Company</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/wallet' className='fillIcon'>
                  <WalletSvg />
                  <span>Wallet</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/artisan' className='fillIcon'>
                  {' '}
                  <ArtisanSvg />
                  <span>Artisan</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/advert'>
                  <AdvertSvg />
                  <span>Advert</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/platformSettings' className='fillIcon'>
                  <SettingsSvg />
                  <span>Settings</span>
              </Link>
          </li>
      </ul>
  )
}

export default IconsBox;
